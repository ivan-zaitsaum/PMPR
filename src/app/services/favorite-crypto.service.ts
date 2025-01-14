import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  // BehaviorSubject для хранения избранных криптовалют
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  // Метод для добавления криптовалюты в избранное
  addToFavorites(cryptoName: string) {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.includes(cryptoName)) {
      this.favoritesSubject.next([...currentFavorites, cryptoName]);
    }
  }

  // Метод для удаления криптовалюты из избранного
  removeFromFavorites(cryptoName: string) {
    const currentFavorites = this.favoritesSubject.value;
    this.favoritesSubject.next(currentFavorites.filter(name => name !== cryptoName));
  }
}
