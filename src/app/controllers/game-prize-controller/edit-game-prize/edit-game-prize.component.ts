import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../models/position';
import {Souvenir} from '../../../models/souvenir';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SouvenirService} from '../../../services/souvenir.service';
import {GamePrizeService} from '../../../services/game-prize.service';
import {GamePrize} from '../../../models/game-prize';

@Component({
  selector: 'app-edit-game-prize',
  templateUrl: './edit-game-prize.component.html',
  styleUrls: ['./edit-game-prize.component.scss']
})
export class EditGamePrizeComponent implements OnInit, OnDestroy {

  id: number;
  itemGame: GamePrize = new GamePrize();
  formGame: FormGroup;

  listPosition: Position[] = [];
  listSouvenir: Souvenir[] = [];

  constructor(private formBuilder: FormBuilder,
              private breadService: BreadcrumbService,
              private router: Router,
              private souvenirService: SouvenirService,
              private gameService: GamePrizeService,
              private route: ActivatedRoute) {
    this.breadService.doOneBread('Призовые игры');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.gameService.getGame(this.id)) {
      this.itemGame = this.gameService.getGame(this.id);
    } else {
      this.router.navigate(['dashboard', 'game-prize']);
    }

    this.initGameForm();
    this.getListPosition();
    this.getListSouvenir();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initGameForm() {
    this.formGame = this.formBuilder.group({
      id: [this.id],
      souvenirId: [this.itemGame.souvenirId, [Validators.required]],
      positionId: [this.itemGame.positionId, [Validators.required]],
      name: [this.itemGame.name, [Validators.required]],
      price: [this.itemGame.price, [Validators.required]],
    });
  }

  editGame(game: GamePrize) {
    this.gameService.putGame(game).subscribe(res => {
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
