import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { DishService } from '../services/dish.service'

@Component({
    selector: 'app-dish-details',
    templateUrl: './dish-details.component.html',
    styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

    selection: Dish;

    constructor(private dishService: DishService, private location: Location,
        private route: ActivatedRoute) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.dishService.getDish(id)
        .then(dish => this.selection = dish);
    }
    goBack(): void {
        this.location.back()
    }
}
