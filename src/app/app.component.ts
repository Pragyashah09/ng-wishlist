import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/models/wishItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items: WishItem[] = [
    new WishItem('Learn Angular'),
    new WishItem('Have some coffee', true),
    new WishItem('Find grass that cuts itself', false),
    new WishItem('Buy a new car', true),
    new WishItem('Movie night with friends', false),
    new WishItem('Try a new restaurant', false),
  ];

  listFilter: any = '0';

  newWishText = '';

  title = 'wishlish';

  get visibleItems(): WishItem[] {
    return this.items.filter(filters[this.listFilter]);
  }

  // add wish and can't add empty wish
  addNewWish() {
    if (!this.newWishText.trim()) return;
    this.items.push(new WishItem(this.newWishText.trim()));
    this.newWishText = '';
  }

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }

  deleteWish(index: number) {
    if (confirm('Are you sure you want to delete this wish?')) {
      this.items.splice(index, 1);
    }
  }
}
