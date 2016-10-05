import { Routes, RouterModule }  from '@angular/router';

import { ScoresComponent } from './scores.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  }
];

export const routing = RouterModule.forChild(routes);
