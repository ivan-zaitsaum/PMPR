// crypto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private http: HttpClient) {}

  getCryptoPrices(): Observable<any> {
    // Запрашиваем цены для нескольких криптовалют
    const ids = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano', 'polkadot', 'binancecoin', 'solana', 'dogecoin', 'shiba-inu', 'avalanche-2'];
    const url = `${this.apiUrl}?ids=${ids.join(',')}&vs_currencies=usd`;
    return this.http.get(url);
  }
}
