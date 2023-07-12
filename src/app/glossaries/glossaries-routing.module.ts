import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageGlossaryComponent } from './manage-glossary/manageGlossary.component';

const routes: Routes = [
  {
    path: 'glossaries/home',
    component: HomeComponent,
  },
  {
    path: 'glossaries',
    component: ManageGlossaryComponent,
  },
  {
    path: 'glossaries/:id',
    component: ManageGlossaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossariesRoutingModule {
  constructor() {}
}
