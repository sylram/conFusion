import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((prom) => (prom.id === id))[0]).pipe(delay(2000));
  }

  getFeaturePromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((prom) => prom.featured)[0]).pipe(delay(2000));
  }
}
