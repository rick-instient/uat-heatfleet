import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [
    ],
    providers: [
        HttpClient
    ]
})
export class ApiModule { }
