import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';

import { AuthService } from '../services/auth.service';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'competition',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') , canActivate: [ AuthService ] },
      { path: 'settings', loadChildren: () => System.import('./settings/settings.module') , canActivate: [ AuthService ]},
      { path: 'pizza', loadChildren: () => System.import('./pizza/pizza.module') , canActivate: [ AuthService ]},
      { path: 'scores', loadChildren: () => System.import('./scores/scores.module') , canActivate: [ AuthService ]}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
