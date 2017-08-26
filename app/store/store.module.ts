import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TaskService } from './services/task.service';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './effects/task.effects';

@NgModule({
    imports: [
        HttpModule,
        EffectsModule.run(TaskEffects)
    ],
    providers: [
        TaskService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppStoreModule { }
