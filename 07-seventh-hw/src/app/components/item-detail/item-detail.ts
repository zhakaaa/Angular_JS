import { Component , OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Item} from '../../item-list/models/item.model';
import {ItemsService} from '../../services/items';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {
  item: Item | null = null;
  loading = false;
  error: string | null = null;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      const id = params.get('id');

      if(!id){
        this.error = 'Invalid item id';
        return;
      }

      this.fetchItem(id);
    });
  }
  fetchItem(id:string){
    this.loading = true;
    this.error = null;
    this.notFound = false;

    this.itemService.getItemById(id).subscribe({
      next: (item) =>{
        this.item = item;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);

        if(error.status == 404){
          this.notFound = true;
        }else{
          this.error = "Failed to fetch item";
        }
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.location.back();

    // Альтернатива:
    // this.router.navigateByUrl('/items');
  }
}
