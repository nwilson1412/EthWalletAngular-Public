import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'pk-reveal-modal',
    templateUrl: './pkRevealModal.component.html',
    styleUrls: ['./pkRevealModal.component.css']
})

export class PkRevealModal implements OnInit{

    ngOnInit(): void{}

    @Input() privateKey: string;
}

