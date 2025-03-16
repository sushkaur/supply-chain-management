import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewManageStocksComponent } from './view-manage-stocks/view-manage-stocks.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'view-manage-stocks', component: ViewManageStocksComponent },
    { path: 'order-tracking', component: OrderTrackingComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'about', component: AboutComponent },

   
];
    

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }