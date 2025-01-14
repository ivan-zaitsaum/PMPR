import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoPrices } from '../models/crypto.models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {
  cryptoPrices: CryptoPrices = {};  // Храним все данные о криптовалютах
  filteredCryptoPrices: any[] = [];  // Массив для отфильтрованных криптовалют
  favorites: Set<string> = new Set<string>();  // Список избранных валют

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchCryptoPrices();
    setInterval(() => this.fetchCryptoPrices(), 30000); // Обновление каждые 30 секунд

    // Загружаем данные об избранных валют из localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = new Set(JSON.parse(savedFavorites));
    }
  }

  // Метод для получения данных
  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe(
      (data: CryptoPrices) => {
        this.cryptoPrices = data;
        this.filteredCryptoPrices = this.transformData(data).filter(crypto =>
          this.favorites.has(crypto.name)  // Фильтруем только избранные валюты
        );
        console.log(this.filteredCryptoPrices);  // Для отладки
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );
  }

  // Преобразуем объект в массив
  transformData(data: CryptoPrices): any[] {
    return Object.keys(data).map(key => ({
      name: key,
      price: data[key].usd
    }));
  }
}
