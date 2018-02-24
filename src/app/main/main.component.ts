import { Component } from '@angular/core';

@Component({
    selector: 'main-content',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {

    constructor(){
        //allows calls in browser console
        window["homeConsole"] = this;

    }

}