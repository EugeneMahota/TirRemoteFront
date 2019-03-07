import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../models/position';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Router} from '@angular/router';
import {SouvenirService} from '../../../services/souvenir.service';
import {Souvenir} from '../../../models/souvenir';
import {GamePrizeService} from '../../../services/game-prize.service';
import {GamePrize} from '../../../models/game-prize';

@Component({
  selector: 'app-add-game-prize',
  templateUrl: './add-game-prize.component.html',
  styleUrls: ['./add-game-prize.component.scss']
})
export class AddGamePrizeComponent implements OnInit, OnDestroy {

  formGame: FormGroup;

  listPosition: Position[] = [];
  listSouvenir: Souvenir[] = [];

  constructor(private formBuilder: FormBuilder,
              private breadService: BreadcrumbService,
              private router: Router,
              private souvenirService: SouvenirService,
              private gameService: GamePrizeService) {
    this.breadService.doOneBread('Призовые игры');
    this.breadService.doTwoBread('Добавить');
  }

  ngOnInit() {
    this.initGameForm();
    this.getListPosition();
    this.getListSouvenir();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initGameForm() {
    this.formGame = this.formBuilder.group({
      souvenirId: ['', [Validators.required]],
      positionId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  addGame(game: GamePrize) {
    this.gameService.postGame(game).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'game-prize']);
      }
    });
  }

  getListPosition() {
    this.gameService.getListPosition().subscribe(res => {
      this.listPosition = res;
    });
  }

  getListSouvenir() {
    this.souvenirService.getListSouvenir().subscribe(res => {
      this.listSouvenir = res;
    });
  }

}
