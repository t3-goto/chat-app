import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Guard
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
  },
  {
    path: '**',
    redirectTo: 'chat/room',
    // loadChildren: () =>
    //   import('./error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
