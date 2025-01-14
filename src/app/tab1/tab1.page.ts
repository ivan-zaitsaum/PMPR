import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для ngIf

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]  // Указываем все необходимые модули
})
export class Tab1Page implements OnInit {
  cryptoPrices: any = {}; // Объект для хранения данных о криптовалютах

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    // Получаем данные при инициализации компонента
    this.fetchCryptoPrices();
    setInterval(() => this.fetchCryptoPrices(), 30000); // Обновление каждые 30 секунд
  }
  
  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe((data) => {
      this.cryptoPrices = data;
      console.log(this.cryptoPrices); // Выводим полученные данные в консоль для проверки
    });
  }
  
}
