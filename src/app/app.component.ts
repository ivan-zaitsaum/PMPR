import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    // Загрузка текущей темы при старте приложения
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.toggle('dark', true);
    }
  }
}
