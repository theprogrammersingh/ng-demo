import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './pages/nav/nav.component';
import { UserRoutingModule } from './user-routing.module';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UsersComponent } from './pages/users/users.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

@NgModule({
  declarations: [
    NavComponent,
    UsersComponent,
    UserInfoComponent,
    UserItemComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UsersModule {}
