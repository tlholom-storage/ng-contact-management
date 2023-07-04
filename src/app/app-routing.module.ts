import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

const routes: Routes = [
  {path: '', redirectTo: 'contacts/admin', pathMatch: 'full'},
  {path: 'contacts/admin', component: ContactManagerComponent},
  {path: 'contacts/view/:contactId', component: ViewContactComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
