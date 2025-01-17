import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';  // Импортируем сервис для получения цен
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  purchases: any[] = [];  // Список покупок, которые будут отображаться
  cryptoPrices: any = {};  // Для хранения актуальных цен

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    // Загружаем данные из localStorage, если они есть
    const savedPurchases = localStorage.getItem('purchases');
    if (savedPurchases) {
      this.purchases = JSON.parse(savedPurchases);
    }

    // Получаем актуальные цены криптовалют
    this.fetchCryptoPrices();
  }

  // Метод для получения актуальных цен
  fetchCryptoPrices() {
    this.cryptoService.getCryptoPrices().subscribe(
      (data: any) => {
        this.cryptoPrices = data;
      },
      (error) => {
        console.error('Error when getting current prices:', error);
      }
    );
  }

  // Метод для продажи криптовалюты
  sellCrypto(purchase: any) {
    const amountToSell = purchase.amountToSell;

    if (amountToSell > 0 && amountToSell <= purchase.amount) {
      // Уменьшаем количество криптовалюты
      purchase.amount -= amountToSell;
      purchase.totalCost -= purchase.price * amountToSell;

      // Если количество криптовалюты стало равно нулю, удаляем запись
      if (purchase.amount === 0) {
        this.purchases = this.purchases.filter(p => p.crypto !== purchase.crypto);
      }

      // Сохраняем обновленный список покупок в localStorage
      localStorage.setItem('purchases', JSON.stringify(this.purchases));

      // Очищаем поле ввода
      purchase.amountToSell = 0;

      alert(`You sold ${amountToSell} ${purchase.crypto}.`);
    } else {
      alert('Invaild quantity for sale');
    }
  }

  // Метод для очистки покупок
  clearPurchases() {
    localStorage.removeItem('purchases');
    this.purchases = [];
  }

   // Полная перезагрузка страницы при свайпе вниз
   reloadPage(event: any) {
    window.location.reload();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
