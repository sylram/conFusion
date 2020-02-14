import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((prom) => (prom.id === id))[0]);
  }

  getFeaturePromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((prom) => prom.featured)[0]);
  }
}
