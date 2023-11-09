import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy }, provideClientHydration()],
})
// { provide: LocationStrategy, useClass: HashLocationStrategy },
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId)
      ? 'in the browser'
      : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
