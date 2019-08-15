import { Component, OnInit, Input } from '@angular/core';
import { copyToClipBoard } from '../update-validators';

@Component({
    selector: 'sitereg-update-json-view',
    templateUrl: './json-update-view.component.html',
    styleUrls: ['./json-update-view.component.scss'],
})
export class JsonUpdateViewComponent implements OnInit {
    show = true;

    @Input() showRaw: boolean = true;
    @Input() showJson: boolean = true;

    @Input() raw: any;
    @Input() json: any;

    constructor() {}

    ngOnInit() {}

    copy() {
        copyToClipBoard(this.json);
    }
}
