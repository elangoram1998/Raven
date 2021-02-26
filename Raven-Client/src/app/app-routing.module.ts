import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './auth/auth.gaurd';
import { ChatComponent } from './chat/components/chat/chat.component';
import { MessageComponent } from './chat/components/message/message.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChatResolver } from './main-layout/chat.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'SignIn', pathMatch: 'full' },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  {
    path: 'home',
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'myFriends',
    component: ChatComponent,
    resolve: {
      chat: ChatResolver
    }
  },
  { path: ':id', component: MessageComponent, canActivate: [AuthGaurd] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
