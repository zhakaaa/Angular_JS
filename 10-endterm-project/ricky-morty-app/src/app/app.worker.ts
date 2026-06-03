addEventListener('message', async ({ data }) => {
  console.log('🔧 Worker received file');

  try {
    // Создаем ImageBitmap из файла (работает в Worker!)
    const imageBitmap = await createImageBitmap(data);
    console.log('🖼️ Original size:', imageBitmap.width, 'x', imageBitmap.height);

    // Максимальные размеры
    const MAX_WIDTH = 400;
    const MAX_HEIGHT = 400;

    let width = imageBitmap.width;
    let height = imageBitmap.height;

    // Пропорциональное изменение размера
    if (width > height) {
      if (width > MAX_WIDTH) {
        height = Math.floor(height * (MAX_WIDTH / width));
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width = Math.floor(width * (MAX_HEIGHT / height));
        height = MAX_HEIGHT;
      }
    }

    console.log('✅ Resizing to:', width, 'x', height);

    // Создаем OffscreenCanvas (работает в Worker!)
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Рисуем изображение
    ctx.drawImage(imageBitmap, 0, 0, width, height);

    // Конвертируем в Blob
    const blob = await canvas.convertToBlob({
      type: 'image/jpeg',
      quality: 0.7
    });

    console.log('✅ Compressed blob created, size:', blob.size, 'bytes');
    console.log('📉 Compression ratio:', ((1 - blob.size / data.size) * 100).toFixed(1) + '%');

    postMessage(blob);
  } catch (error: any) {
    console.error('❌ Worker error:', error);
    postMessage({ error: error.message || 'Failed to process image' });
  }
});
