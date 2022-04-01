import { Routes } from '@angular/router';
import { InsightsComponent } from './insights/insights.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'insights', component: InsightsComponent },
  { path: '**', redirectTo: '/list' },
];
