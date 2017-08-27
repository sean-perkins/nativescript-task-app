import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from '@angular/core';
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { AppStoreModule } from './store/store.module';
import { AppReducer } from './store/app.state';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from 'nativescript-angular/http';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        AppStoreModule,
        StoreModule.provideStore(AppReducer),
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
