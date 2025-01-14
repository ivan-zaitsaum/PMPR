import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCryptoService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  // Инициализация хранилища
  private async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  // Сохранение избранных монет в хранилище
  async addToFavorites(coin: string): Promise<void> {
    const currentFavorites = await this.getFavorites();
    if (!currentFavorites.includes(coin)) {
      currentFavorites.push(coin);
      await this.storage?.set('favorites', currentFavorites);
    }
  }

  // Удаление монеты из избранных
  async removeFromFavorites(coin: string): Promise<void> {
    let currentFavorites = await this.getFavorites();
    currentFavorites = currentFavorites.filter(fav => fav !== coin);
    await this.storage?.set('favorites', currentFavorites);
  }

  // Получение списка избранных монет
  async getFavorites(): Promise<string[]> {
    const favorites = await this.storage?.get('favorites');
    return favorites || [];
  }

  // Проверка, является ли монета избранной
  async isFavorite(coin: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.includes(coin);
  }
}
