import { NgModule } from '@angular/core';
import { URLS } from './shared/urls';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { NotFoundComponent } from './components/master/not-found/not-found.component';

// const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/home/home.module').then((m) => m.HomePageModule),
//   },
//   {
//     path: 'home.html',
//     loadChildren: () =>
//     import('./pages/home/home.module').then((m) => m.HomePageModule),
//   },

//   {
//     path: 'heating_oil.html',
//     loadChildren: () =>
//       import('./pages/heating_oil/heating_oil.module').then(
//         (m) => m.HeatingOilPageModule
//       ),
//   },
//   {
//     path: 'oil_delivery.html',
//     loadChildren: () =>
//       import('./pages/oil_delivery/oil_delivery.module').then(
//         (m) => m.OilDeliveryPageModule
//       ),
//   },
//   {
//     path: URLS.FORGET_PWD,
//     loadChildren: () =>
//       import('./pages/forgot-pw/forgot-pw.module').then(
//         (m) => m.ForgotPwPageModule
//       ),
//   },

//   {
//     path: 'heating_oil_prices.html',
//     loadChildren: () =>
//       import('./pages/heating_oil_prices/heating_oil_prices.module').then(
//         (m) => m.HeatingOilPricesPageModule
//       ),
//   },
//   {
//     path: 'oil_companies.html',
//     loadChildren: () =>
//       import('./pages/oil-companies-page/oil-companies-page.module').then(
//         (m) => m.OilCompaniesPageModule
//       ),
//   },
//   {
//     path: `${URLS.PAGE_FAQS}`,
//     loadChildren: () =>
//       import('./pages/faqs/faqs.module').then((m) => m.FaqsPageModule),
//   },
//   {
//     path: `${URLS.TERMS_CONDITIONS}`,
//     loadChildren: () =>
//       import('./pages/terms-conditions/terms-conditions.module').then(
//         (m) => m.TermsConditionsPageModule
//       ),
//   },
//   {
//     path: `${URLS.PRIVACY_POLICY}`,
//     loadChildren: () =>
//       import('./pages/privacy-policy/privacy-policy.module').then(
//         (m) => m.PrivacyPolicyPageModule
//       ),
//   },
//   {
//     path: `${URLS.PAGE_ABOUT_US}`,
//     loadChildren: () =>
//       import('./pages/about-us/about-us.module').then(
//         (m) => m.AboutUsPageModule
//       ),
//   },
//   {
//     path: URLS.LOGIN,
//     loadChildren: () =>
//       import('./pages/login-client/login-client.module').then(
//         (m) => m.LoginClientModule
//       ),
//   },

//   {
//     path: `${URLS.PAGE_CONTACT}`,
//     loadChildren: () =>
//       import('./pages/contact/contact.module').then((m) => m.ContactPageModule),
//   },
//   {
//     path: `blog`,
//     loadChildren: () =>
//       import('./pages/blog/blog.module').then((m) => m.BlogPageModule),
//   },
//   {
//     matcher: (url) => {
//       if (!url) return null;

//       let urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');

//       if (url.length === 2 && urlToMatch.match(/^states.html$/gm)) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {},
//         };
//       } else if (url.length === 2 && urlToMatch.match(/^regions.html$/gm)) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {},
//         };
//       }

//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/state-selection/state-selection.module').then(
//         (m) => m.StateSelectionPageModule
//       ),
//   },

//   {
//     matcher: (url) => {
//       if (!url) return null;

//       let urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');

//       if (url.length === 2 && urlToMatch.match(/^[\w]{2}-[\w]+.html$/gm)) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {
//             state: new UrlSegment(params[1].replace('.html', ''), {}),
//             statehash: new UrlSegment(params[0], {}),
//           },
//         };
//       }

//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/state-profile/state-profile.module').then(
//         (m) => m.StateProfilePageModule
//       ),
//   },

//   {
//     matcher: (url) => {
//       if (!url) return null;

//       let urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');

//       if (
//         url.length === 2 &&
//         urlToMatch.match(/^[\w]{3}-[\w]+-[\w]{2}.html$/gm)
//       ) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {
//             town: new UrlSegment(params[1].replace('_', ' '), {}),
//             townHash: new UrlSegment(params[0], {}),
//             statehash: new UrlSegment(params[2].replace('.html', ''), {}),
//           },
//         };
//       } else if (
//         url.length === 2 &&
//         urlToMatch.match(/^[\w]{3}-[\w]+-[\w]+-[\w]{2}.html$/gm)
//       ) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {
//             town: new UrlSegment(params[1].replace('_', ' '), {}),
//             townHash: new UrlSegment(params[0], {}),
//             region: new UrlSegment(params[2].replace('_', ' '), {}),
//             statehash: new UrlSegment(params[3].replace('.html', ''), {}),
//           },
//         };
//       }
//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/town-profile/town-profile.module').then(
//         (m) => m.TownProfilePageModule
//       ),
//   },

//   {
//     matcher: (url) => {
//       if (!url) return null;

//       if (url[1]) {
//         var urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');
//       }

//       let urlToMatch2 = url[0].path.toLocaleLowerCase();

//       if (
//         url.length === 2 &&
//         urlToMatch.match(/^[\w]{3}-[\w]{3}-[\w]+-[\w]+-[\w]{2}.html$/gm)
//       ) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {
//             town: new UrlSegment(params[3], {}),
//             townHash: new UrlSegment(params[0], {}),

//             state: new UrlSegment(params[4], {}),
//             statehash: new UrlSegment(params[4], {}),

//             company: new UrlSegment(params[2], {}),
//             companyHash: new UrlSegment(params[1], {}),
//           },
//         };
//       }

//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/company-profile/company-profile.module').then(
//         (m) => m.CompanyProfilePageModule
//       ),
//   },
//   {
//     matcher: (url) => {
//       if (!url) return null;

//       let urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');

//       if (url.length === 2 && urlToMatch.match(/^counties.html$/gm)) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {},
//         };
//       }

//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/counties-selection/counties-selection.module').then(
//         (m) => m.CountiesSelectionPageModule
//       ),
//   },

//   {
//     matcher: (url) => {
//       if (!url) return null;

//       let urlToMatch = url[1].path.toLocaleLowerCase().replace(' ', '_');

//       if (
//         url.length === 2 &&
//         urlToMatch.match(/^[\w]{2}-[\w]+-cities.html$/gm)
//       ) {
//         let params = urlToMatch.split('-');
//         return {
//           consumed: url,
//         };
//       } else if (url.length === 2 && urlToMatch.match(/^cities.html$/gm)) {
//         return {
//           consumed: url,
//           posParams: {},
//         };
//       } else if (
//         url.length === 2 &&
//         urlToMatch.match(/^[\w]{2}-[\w]+-[\w]+-cities.html$/gm)
//       ) {
//         let params = urlToMatch.split('-');

//         return {
//           consumed: url,
//           posParams: {
//             statehash: new UrlSegment(params[0], {}),
//             countyhash: new UrlSegment(params[2], {}),
//             // countyname: new UrlSegment(params[3], {}),
//           },
//         };
//       }

//       return null;
//     },
//     pathMatch: 'full',
//     loadChildren: () =>
//       import('./pages/town-selection/town-selection.module').then(
//         (m) => m.TownSelectionPageModule
//       ),
//   },
// ];

const routes: Routes = [
  {
    path: '', component: MasterComponent,
    loadChildren: () => import('./components/master/master.module').then(m => m.MasterModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  }),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
