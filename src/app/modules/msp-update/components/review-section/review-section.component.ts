import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ReviewItemInterface {
    label: string;
    value: string;
}

@Component({
    selector: 'sitereg-msp-review-section',
    templateUrl: './review-section.component.html',
    styleUrls: ['./review-section.component.scss'],
})
export class ReviewSectionComponent {
    // tslint:disable-next-line:no-inferrable-types
    @Input() sectionTitle: string = '';
    @Input() reviewItems: ReviewItemInterface[] = [];

    @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    onClick() {
        this.clickEvent.emit();
    }
}
