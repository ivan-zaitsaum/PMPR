import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoPrices } from '../models/crypto.models';  // Интерфейс для криптовалют

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {
  cryptoPrices: CryptoPrices = {};
  filteredCryptoPrices: any[] = [];
  searchTerm: string = '';
  sortAscending: boolean = true;
  favorites: Set<string> = new Set<string>();
  amountToBuy: { [key: string]: number } = {}; // Объект для хранения количества покупаемой криптовалюты

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.fetchCryptoPrices();
    setInterval(() => this.fetchCryptoPrices(), 1000000); // Обновление раз в 3000 секунд

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = new Set(JSON.parse(savedFavorites));
    }
  }

  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe(
      (data: CryptoPrices) => {
        this.cryptoPrices = data;
        this.filteredCryptoPrices = this.transformData(data); 
        this.sortCryptoPrices();  // Сортируем криптовалюты по цене при получении данных
        console.log(this.cryptoPrices);  // Для отладки
      },
      (error) => {
        console.error('Error while receiving data:', error);
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

  // Метод для добавления или удаления из избранного
  toggleFavorite(cryptoName: string) {
    if (this.favorites.has(cryptoName)) {
      this.favorites.delete(cryptoName);
    } else {
      this.favorites.add(cryptoName);
    }

    // Сохраняем обновленные избранные валюты в localStorage
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  // Проверяем, добавлена ли валюта в избранное
  isFavorite(cryptoName: string): boolean {
    return this.favorites.has(cryptoName);
  }

  purchaseCrypto(cryptoName: string) {
    const amount = this.amountToBuy[cryptoName];
    if (amount > 0) {
      const price = this.cryptoPrices[cryptoName]?.usd;
      if (price) {
        const totalCost = price * amount;
        console.log(`Purchase ${amount} ${cryptoName}  ${totalCost} USD`);
        alert(`You bought ${amount} ${cryptoName} fot the amount ${totalCost} USD`);
  
        // Загружаем список покупок из localStorage
        const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  
        // Ищем покупку для этой криптовалюты
        const existingPurchase = purchases.find((purchase: any) => purchase.crypto === cryptoName);
  
        if (existingPurchase) {
          // Если покупка уже существует, обновляем количество и общую стоимость
          existingPurchase.amount += amount;
          existingPurchase.totalCost += totalCost;
        } else {
          // Если покупки нет, добавляем новую запись
          purchases.push({
            crypto: cryptoName,
            amount: amount,
            price: price,
            totalCost: totalCost
          });
        }
  
        // Сохраняем обновленный список покупок в localStorage
        localStorage.setItem('purchases', JSON.stringify(purchases));
  
        // Сбрасываем количество после покупки
        this.amountToBuy[cryptoName] = 0;
      }
    } else {
      alert('Please indicate the quantity to purchase.');
    }

  }
   // Полная перезагрузка страницы при свайпе вниз
   reloadPage(event: any) {
    window.location.reload();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
