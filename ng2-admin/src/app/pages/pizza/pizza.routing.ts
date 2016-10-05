import { Routes, RouterModule }  from '@angular/router';

import { PizzaComponent } from './pizza.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PizzaComponent
  }
];

export const routing = RouterModule.forChild(routes);
