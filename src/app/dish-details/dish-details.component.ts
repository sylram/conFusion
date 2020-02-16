import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    commentForm: FormGroup;
    comment: Comment;
    comments: Comment[];
    @ViewChild('commForm') commentFormDirective;

    formErrors = {
        'author': '',
        'rating': '',
        'comment': '',
        'date': ''
    };

    validationMessages = {
        'author': {
          'required': 'Name is required.',
          'minlength': 'Name must be at least 2 characters long',
          'maxlength': 'Name cannot be more than 25 characters long',
        },
        'comment': {
          'required': 'Comment is required.',
          'minlength': 'Comment must contain at least 50 characters',
          'maxlength': 'Comment cannot be more than 500 characters',
        }
    }
    constructor(private dishService: DishService, private location: Location,
        private route: ActivatedRoute, private comF: FormBuilder) { 
            this.createForm();
        }

    ngOnInit() {
        this.dishService.getDishIds()
            .subscribe((dishIds) => this.dishIds = dishIds)
        this.route.params
            .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
            .subscribe(dish => {
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

    createForm() {
        this.commentForm = this.comF.group({
            author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: '',
            comment: ['',[Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
            date: ''
        });
        this.commentForm.valueChanges
      .subscribe(data => this.onValueChange(data));
    }

    onValueChange(data?: any){
        if(!this.commentForm) {
            return;
          }
          for(const field in this.formErrors){
            if(this.formErrors[field] !== '') {
                this.formErrors[field] = '';
            } 
            const control = this.commentForm.get(field);
            if(control && control.dirty && control.invalid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    if(control.errors.hasOwnProperty(key)){
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        const submitTime= new Date();
        this.comment.date = submitTime.toISOString();
        this.selection.comments.push(this.comment);	        
        this.commentFormDirective.resetForm();
    }

}
