import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private http: HttpClient) { }

  getCryptoPrices(): Observable<any> {
    // Запрос данных о криптовалютах (биткойн и эфириум)
    return this.http.get(this.apiUrl, {
      params: {
        ids: 'bitcoin,ethereum', // криптовалюты
        vs_currencies: 'usd'     // валюта
      }
    });
  }
}
