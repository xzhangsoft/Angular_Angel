import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { LiveComponent } from './live/live.component';
import { FactoryComponent } from './factory/factory.component';

const routes: Routes = [
  { path: 'ody-tools', component: PageComponent },
  { path: 'factory', component: FactoryComponent },
  { path: 'live', component: LiveComponent },
  { path: '', redirectTo: '/ody-tools', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
