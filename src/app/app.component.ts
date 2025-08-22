import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  items: WishItem[] = [];
  listFilter: any = '0';

  newWishText = '';

  title = 'wishlist';

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }

  ngOnInit() {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.items = JSON.parse(stored).map(
        (x: any) => new WishItem(x.wishText, x.isComplete)
      );
    }
  }

  darkStored = localStorage.getItem('darkMode');
  if(darkStored: string) {
    this.isDarkMode = JSON.parse(darkStored);
  }

  get visibleItems(): WishItem[] {
    return this.items.filter(filters[this.listFilter]);
  }

  saveToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }

  addNewWish() {
    if (!this.newWishText.trim()) return;
    this.items.push(new WishItem(this.newWishText.trim()));
    this.newWishText = '';
    this.saveToStorage();
  }

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    this.saveToStorage();
  }

  deleteWish(index: number) {
    if (confirm('Are you sure you want to delete this wish?')) {
      this.items.splice(index, 1);
      this.saveToStorage();
    }
  }
}
