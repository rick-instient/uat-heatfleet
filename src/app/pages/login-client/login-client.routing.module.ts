import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiModule } from 'src/app/shared/api/api.module'; 

import { LoginClientPage } from './login-client.page';

const routes: Routes = [
    {
        path: '',
        component: LoginClientPage
    }
];

@NgModule({
    imports: [
        ApiModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class LoginPageClientRoutingModule { }