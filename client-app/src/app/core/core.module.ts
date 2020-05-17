import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { HeaderComponent } from './component/header/header.component';

// Router
import { RouterModule } from '@angular/router';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

// Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth-interceptor';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    // Router
    RouterModule,
    // HttpClient
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in AppModule Only.'
      );
    }
  }
}
