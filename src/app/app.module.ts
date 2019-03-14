import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './middleware/jwt.interceptor';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {AuthGuard} from './guards/auth.guard';
import {ListGunComponent} from './controllers/gun-controller/list-gun/list-gun.component';
import {AddGunComponent} from './controllers/gun-controller/add-gun/add-gun.component';
import {EditGunComponent} from './controllers/gun-controller/edit-gun/edit-gun.component';
import {ListUserComponent} from './controllers/user-controller/list-user/list-user.component';
import {AddUserComponent} from './controllers/user-controller/add-user/add-user.component';
import {EditUserComponent} from './controllers/user-controller/edit-user/edit-user.component';
import {NgxMaskModule} from 'ngx-mask';
import {LoadingComponent} from './components/loading/loading.component';
import {ListPersonComponent} from './controllers/person-controller/list-person/list-person.component';
import {EditPersonComponent} from './controllers/person-controller/edit-person/edit-person.component';
import {AddPersonComponent} from './controllers/person-controller/add-person/add-person.component';
import {ListCameraComponent} from './controllers/camera-controller/list-camera/list-camera.component';
import {ListSouvenirComponent} from './controllers/souvenir-controller/list-souvenir/list-souvenir.component';
import {AddSouvenirComponent} from './controllers/souvenir-controller/add-souvenir/add-souvenir.component';
import {EditSouvenirComponent} from './controllers/souvenir-controller/edit-souvenir/edit-souvenir.component';
import {ListReleComponent} from './controllers/rele-controller/list-rele/list-rele.component';
import {ListGameTirComponent} from './controllers/game-tir-controller/list-game-tir/list-game-tir.component';
import {EditGameTirComponent} from './controllers/game-tir-controller/edit-game-tir/edit-game-tir.component';
import {AddGameTirComponent} from './controllers/game-tir-controller/add-game-tir/add-game-tir.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RoleDirective} from './guards/role.directive';
import {ListGameArcadeComponent} from './controllers/game-arcade-controller/list-game-arcade/list-game-arcade.component';
import {AddGameArcadeComponent} from './controllers/game-arcade-controller/add-game-arcade/add-game-arcade.component';
import {EditGameArcadeComponent} from './controllers/game-arcade-controller/edit-game-arcade/edit-game-arcade.component';
import {ListGamePrizeComponent} from './controllers/game-prize-controller/list-game-prize/list-game-prize.component';
import {AddGamePrizeComponent} from './controllers/game-prize-controller/add-game-prize/add-game-prize.component';
import {EditGamePrizeComponent} from './controllers/game-prize-controller/edit-game-prize/edit-game-prize.component';
import {ListPositionComponent} from './controllers/position-controller/list-position/list-position.component';
import {AddPositionComponent} from './controllers/position-controller/add-position/add-position.component';
import {EditPositionComponent} from './controllers/position-controller/edit-position/edit-position.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReportGameComponent} from './controllers/report-controller/report-game/report-game.component';
import {ReportEventComponent} from './controllers/report-controller/report-event/report-event.component';
import {ReportPersonComponent} from './controllers/report-controller/report-person/report-person.component';
// import {OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
// import {DefaultIntl} from './locale/locale';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  behaviour: {
    autoHide: 4000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 1
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ListGunComponent,
    AddGunComponent,
    EditGunComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    LoadingComponent,
    ListPersonComponent,
    AddPersonComponent,
    EditPersonComponent,
    ListCameraComponent,
    ListSouvenirComponent,
    AddSouvenirComponent,
    EditSouvenirComponent,
    ListReleComponent,
    ListGameTirComponent,
    EditGameTirComponent,
    AddGameTirComponent,
    RoleDirective,
    ListGameArcadeComponent,
    AddGameArcadeComponent,
    EditGameArcadeComponent,
    ListGamePrizeComponent,
    AddGamePrizeComponent,
    EditGamePrizeComponent,
    ListPositionComponent,
    AddPositionComponent,
    EditPositionComponent,
    ReportGameComponent,
    ReportEventComponent,
    ReportPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // {provide: OwlDateTimeIntl,
    //   useClass: DefaultIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
