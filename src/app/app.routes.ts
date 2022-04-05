import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'list/:id', component: ItemComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/list' },
];
