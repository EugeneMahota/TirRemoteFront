import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {ListGunComponent} from './controllers/gun-controller/list-gun/list-gun.component';
import {AddGunComponent} from './controllers/gun-controller/add-gun/add-gun.component';
import {EditGunComponent} from './controllers/gun-controller/edit-gun/edit-gun.component';
import {ListUserComponent} from './controllers/user-controller/list-user/list-user.component';
import {AddUserComponent} from './controllers/user-controller/add-user/add-user.component';
import {EditUserComponent} from './controllers/user-controller/edit-user/edit-user.component';
import {ListPersonComponent} from './controllers/person-controller/list-person/list-person.component';
import {AddPersonComponent} from './controllers/person-controller/add-person/add-person.component';
import {EditPersonComponent} from './controllers/person-controller/edit-person/edit-person.component';
import {ListCameraComponent} from './controllers/camera-controller/list-camera/list-camera.component';
import {EditSouvenirComponent} from './controllers/souvenir-controller/edit-souvenir/edit-souvenir.component';
import {AddSouvenirComponent} from './controllers/souvenir-controller/add-souvenir/add-souvenir.component';
import {ListSouvenirComponent} from './controllers/souvenir-controller/list-souvenir/list-souvenir.component';
import {ListReleComponent} from './controllers/rele-controller/list-rele/list-rele.component';
import {EditGameTirComponent} from './controllers/game-tir-controller/edit-game-tir/edit-game-tir.component';
import {AddGameTirComponent} from './controllers/game-tir-controller/add-game-tir/add-game-tir.component';
import {ListGameTirComponent} from './controllers/game-tir-controller/list-game-tir/list-game-tir.component';
import {RoleGuard} from './guards/role.guard';
import {ListGameArcadeComponent} from './controllers/game-arcade-controller/list-game-arcade/list-game-arcade.component';
import {AddGameArcadeComponent} from './controllers/game-arcade-controller/add-game-arcade/add-game-arcade.component';
import {EditGameArcadeComponent} from './controllers/game-arcade-controller/edit-game-arcade/edit-game-arcade.component';
import {ListGamePrizeComponent} from './controllers/game-prize-controller/list-game-prize/list-game-prize.component';
import {AddGamePrizeComponent} from './controllers/game-prize-controller/add-game-prize/add-game-prize.component';
import {EditGamePrizeComponent} from './controllers/game-prize-controller/edit-game-prize/edit-game-prize.component';
import {ListPositionComponent} from './controllers/position-controller/list-position/list-position.component';
import {AddPositionComponent} from './controllers/position-controller/add-position/add-position.component';
import {EditPositionComponent} from './controllers/position-controller/edit-position/edit-position.component';
import {ReportGameComponent} from './controllers/report-controller/report-game/report-game.component';
import {ReportEventComponent} from './controllers/report-controller/report-event/report-event.component';
import {ReportPersonComponent} from './controllers/report-controller/report-person/report-person.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},

      {path: 'rele', component: ListReleComponent, data: {roles: [{code: 'rele'}]}, canActivate: [RoleGuard]},

      {path: 'camera', component: ListCameraComponent, data: {roles: [{code: 'camera'}]}, canActivate: [RoleGuard]},

      {path: 'souvenir', component: ListSouvenirComponent, data: {roles: [{code: 'souvenir'}]}, canActivate: [RoleGuard]},
      {path: 'souvenir/add', component: AddSouvenirComponent, data: {roles: [{code: 'souvenir'}]}, canActivate: [RoleGuard]},
      {path: 'souvenir/:id', component: EditSouvenirComponent, data: {roles: [{code: 'souvenir'}]}, canActivate: [RoleGuard]},

      {path: 'gun', component: ListGunComponent, data: {roles: [{code: 'gun'}]}, canActivate: [RoleGuard]},
      {path: 'gun/add', component: AddGunComponent, data: {roles: [{code: 'gun'}]}, canActivate: [RoleGuard]},
      {path: 'gun/:id', component: EditGunComponent, data: {roles: [{code: 'gun'}]}, canActivate: [RoleGuard]},

      {path: 'user', component: ListUserComponent, data: {roles: [{code: 'user'}]}, canActivate: [RoleGuard]},
      {path: 'user/add', component: AddUserComponent, data: {roles: [{code: 'user'}]}, canActivate: [RoleGuard]},
      {path: 'user/:id', component: EditUserComponent, data: {roles: [{code: 'user'}]}, canActivate: [RoleGuard]},

      {path: 'person', component: ListPersonComponent, data: {roles: [{code: 'person'}]}, canActivate: [RoleGuard]},
      {path: 'person/add', component: AddPersonComponent, data: {roles: [{code: 'person'}]}, canActivate: [RoleGuard]},
      {path: 'person/:id', component: EditPersonComponent, data: {roles: [{code: 'person'}]}, canActivate: [RoleGuard]},

      {path: 'game-tir', component: ListGameTirComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-tir/add', component: AddGameTirComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-tir/:id', component: EditGameTirComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},

      {path: 'game-arcade', component: ListGameArcadeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-arcade/add', component: AddGameArcadeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-arcade/:id', component: EditGameArcadeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},

      {path: 'game-prize', component: ListGamePrizeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-prize/add', component: AddGamePrizeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},
      {path: 'game-prize/:id', component: EditGamePrizeComponent, data: {roles: [{code: 'game'}]}, canActivate: [RoleGuard]},

      {path: 'position', component: ListPositionComponent, data: {roles: [{code: 'position'}]}, canActivate: [RoleGuard]},
      {path: 'position/add', component: AddPositionComponent, data: {roles: [{code: 'position'}]}, canActivate: [RoleGuard]},
      {path: 'position/:id', component: EditPositionComponent, data: {roles: [{code: 'position'}]}, canActivate: [RoleGuard]},

      {path: 'report-game', component: ReportGameComponent, data: {roles: [{code: 'reportGame'}]}, canActivate: [RoleGuard]},
      {path: 'report-event', component: ReportEventComponent, data: {roles: [{code: 'reportEvent'}]}, canActivate: [RoleGuard]},
      {path: 'report-person', component: ReportPersonComponent, data: {roles: [{code: 'reportUser'}]}, canActivate: [RoleGuard]},

      {path: '**', component: HomeComponent}
    ]
  },
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
