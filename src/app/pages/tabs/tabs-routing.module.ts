import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

 
const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedUserInToHome = () => redirectLoggedInTo(['home']);


import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule),
        ...canActivate(redirectUnauthorizedToSignin),
      },
      {
        path: 'chat',
        loadChildren: () => import('../../pages/chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'quizzes',
        loadChildren: () => import('../../pages/quizzes/quizzes.module').then( m => m.QuizzesPageModule)
      },
      {
        path: 'spotlight',
        loadChildren: () => import('../../pages/spotlight/spotlight.module').then( m => m.SpotlightPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
