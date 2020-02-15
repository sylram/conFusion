import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dish-details',
    templateUrl: './dish-details.component.html',
    styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

    selection: Dish;
    dishIds: String[];
    prev: String;
    next: String;

    constructor(private dishService: DishService, private location: Location,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.dishService.getDishIds()
            .subscribe((dishIds) => this.dishIds = dishIds)
        this.route.params
            .pipe(switchMap((params: Params) => this.dishService.getDish(params['id']))).subscribe(dish => {
                this.selection = dish; this.setPrevNext(dish.id);
            });
    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId)
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    goBack(): void {
        this.location.back()
    }
}
