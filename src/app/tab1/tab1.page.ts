import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule для ngModel
import { CryptoPrices } from '../models/crypto.models';  // Импортируем интерфейс

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]  // Указываем FormsModule
})
export class Tab1Page implements OnInit {
  cryptoPrices: CryptoPrices = {};  // Теперь используем тип CryptoPrices
  filteredCryptoPrices: CryptoPrices = {};  // Для хранения отфильтрованных данных
  searchTerm: string = '';  // Переменная для хранения поискового запроса

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchCryptoPrices();
    setInterval(() => this.fetchCryptoPrices(), 30000); // Обновление каждые 30 секунд
  }

  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe(
      (data: CryptoPrices) => {
        this.cryptoPrices = data;
        this.filteredCryptoPrices = data; // Изначально показываем все данные
        console.log(this.cryptoPrices); // Выводим полученные данные в консоль для проверки
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );
  }

  // Метод для фильтрации криптовалют по названию
  filterCryptoPrices() {
    if (this.searchTerm.trim() === '') {
      this.filteredCryptoPrices = this.cryptoPrices; // Если ничего не введено, показываем все
    } else {
      this.filteredCryptoPrices = Object.keys(this.cryptoPrices)
        .filter(key => key.toLowerCase().includes(this.searchTerm.toLowerCase()))
        .reduce((obj, key) => {
          obj[key] = this.cryptoPrices[key];
          return obj;
        }, {} as CryptoPrices); // Создаем новый объект с отфильтрованными значениями
    }
  }
}
