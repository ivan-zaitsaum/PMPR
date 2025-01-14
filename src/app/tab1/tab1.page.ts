import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Для ngModel
import { CryptoPrices } from '../models/crypto.models';  // Интерфейс для криптовалют

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {
  cryptoPrices: CryptoPrices = {};  // Храним все данные о криптовалютах
  filteredCryptoPrices: any[] = [];  // Массив для отфильтрованных криптовалют
  searchTerm: string = '';  // Поисковый запрос
  sortAscending: boolean = true;  // Флаг для сортировки по возрастанию

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchCryptoPrices();
    setInterval(() => this.fetchCryptoPrices(), 30000); // Обновление каждые 30 секунд
  }

  // Метод для получения данных
  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe(
      (data: CryptoPrices) => {
        this.cryptoPrices = data;
        this.filteredCryptoPrices = this.transformData(data);  // Преобразуем данные в массив
        this.sortCryptoPrices();  // Сортируем криптовалюты по цене при получении данных
        console.log(this.cryptoPrices);  // Для отладки
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

  // Метод для фильтрации криптовалют
  filterCryptoPrices() {
    if (this.searchTerm.trim() === '') {
      this.filteredCryptoPrices = this.transformData(this.cryptoPrices); // Если нет запроса, показываем все
    } else {
      this.filteredCryptoPrices = this.transformData(this.cryptoPrices)
        .filter(crypto => crypto.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    this.sortCryptoPrices();  // Сортируем после фильтрации
  }

  // Метод для сортировки криптовалют по цене
  sortCryptoPrices() {
    this.filteredCryptoPrices = this.filteredCryptoPrices.sort((a, b) => {
      return this.sortAscending ? a.price - b.price : b.price - a.price;
    });
  }

  // Переключаем порядок сортировки
  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortCryptoPrices();  // Применяем сортировку
  }
}
