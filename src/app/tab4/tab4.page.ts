import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]  // Убедитесь, что добавлены необходимые модули
})
export class Tab4Page implements OnInit {
  purchases: any[] = [];  // Список покупок, которые будут отображаться

  constructor() {}

  ngOnInit() {
    // Загружаем данные из localStorage, если они есть
    const savedPurchases = localStorage.getItem('purchases');
    if (savedPurchases) {
      this.purchases = JSON.parse(savedPurchases);
    }
  }

  // Метод для переключения темы
  toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  clearPurchases() {
    // Удаляем данные о покупках из localStorage
    localStorage.removeItem('purchases');
    
    // Обновляем массив покупок, чтобы интерфейс отобразил пустой список
    this.purchases = [];
  }
}
