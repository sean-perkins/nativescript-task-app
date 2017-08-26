import { Component, ViewEncapsulation } from '@angular/core';
import './operators';
import * as app from 'tns-core-modules/application';
import { NSDate } from './utils/Date';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.Native
})

export class AppComponent {

    constructor() {
        app.addCss(this.getStyles(NSDate.isDayTime() ? '#ff9d6e' : '#0061ef'));
    }

    private getStyles(accentColor: string): any {
        return `
            .count, .input, .textarea {
                color: ${accentColor};
            }
            .banner {
                background-image: url('res://app/images/app-bg-${NSDate.isDayTime() ? 'day' : 'night'}.jpg');
            }
            .action-bar, .btn-delete {
                background-color: ${accentColor}
            }
            .fab  {
                background-color: ${NSDate.isDayTime() ? '#FF482F' : '#0061ef'};
                border-color: ${NSDate.isDayTime() ? '#ef432c' : '#035bdd'};
            }
        `;
    }
}
