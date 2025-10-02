import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.user$ = user(this.auth);
  }

  // 1. Вход
  login(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  // 2. Регистрация + создание профиля в БД
  async signup(email: string, pass: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, pass);
    const userRef = doc(this.firestore, `users/${cred.user.uid}`);
    // Создаем пустой профиль в базе
    await setDoc(userRef, {
      email: email,
      favorites: []
    });
    console.log('✅ User document created with empty favorites array');
    return cred;
  }

  // 3. Выход
  logout() {
    return signOut(this.auth);
  }


  async getUserProfile(uid: string): Promise<any> {
    try {
      const userRef = doc(this.firestore, `users/${uid}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('❌ Error getting user profile:', error);
      return null;
    }
  }

  async uploadAvatar(blob: Blob, uid: string): Promise<string> {
    try {
      console.log('📤 Starting upload for user:', uid);
      console.log('📦 Blob size:', blob.size, 'bytes');

      // Создаем уникальное имя файла с timestamp
      const timestamp = Date.now();
      const fileName = `avatars/${uid}_${timestamp}.jpg`;
      console.log('📁 File path:', fileName);

      const storageRef = ref(this.storage, fileName);

      // Metadata для файла
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          uploadedBy: uid,
          uploadedAt: new Date().toISOString()
        }
      };

      // Загружаем
      console.log('⬆️ Uploading to Firebase Storage...');
      const snapshot = await uploadBytes(storageRef, blob, metadata);
      console.log('✅ Upload complete:', snapshot.ref.fullPath);

      // Получаем URL
      console.log('🔗 Getting download URL...');
      const url = await getDownloadURL(storageRef);
      console.log('✅ Download URL:', url);

      // Сохраняем в Firestore
      console.log('💾 Saving URL to Firestore...');
      const userRef = doc(this.firestore, `users/${uid}`);

      // Проверяем существует ли документ
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // Документ существует - обновляем
        await updateDoc(userRef, { photoURL: url });
      } else {
        // Документа нет - создаем
        await setDoc(userRef, {
          photoURL: url,
          favorites: [],
          createdAt: new Date()
        });
      }

      console.log('✅ All done! URL saved to Firestore');
      return url;

    } catch (error: any) {
      console.error('❌ Upload error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);

      if (error.code === 'storage/unauthorized') {
        throw new Error('Permission denied. Check Firebase Storage rules.');
      } else if (error.code === 'storage/canceled') {
        throw new Error('Upload was canceled.');
      }

      throw error;
    }
  }
}
