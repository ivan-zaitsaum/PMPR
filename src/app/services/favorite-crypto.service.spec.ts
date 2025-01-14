import { TestBed } from '@angular/core/testing';

import { FavoriteCryptoService } from './favorite-crypto.service';

describe('FavoriteCryptoService', () => {
  let service: FavoriteCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
