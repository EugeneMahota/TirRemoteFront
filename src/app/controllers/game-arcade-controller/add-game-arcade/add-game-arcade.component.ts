import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameArcadeService} from '../../../services/game-arcade.service';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Router} from '@angular/router';
import {CameraService} from '../../../services/camera.service';
import {ReleService} from '../../../services/rele.service';
import {SouvenirService} from '../../../services/souvenir.service';
import {Rele} from '../../../models/rele';
import {Souvenir} from '../../../models/souvenir';
import {Camera} from '../../../models/camera';
import {Position} from '../../../models/position';
import {GameArcade} from '../../../models/game-arcade';

@Component({
  selector: 'app-add-game-arcade',
  templateUrl: './add-game-arcade.component.html',
  styleUrls: ['./add-game-arcade.component.scss']
})
export class AddGameArcadeComponent implements OnInit, OnDestroy {

  formGame: FormGroup;

  audioStart: File;
  audioEnd: File;
  image: File;

  listRele: Rele[] = [];
  listSouvenir: Souvenir[] = [];
  listCamera: Camera[] = [];
  listPosition: Position[] = [];

  constructor(private gameService: GameArcadeService,
              private breadService: BreadcrumbService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cameraService: CameraService,
              private releService: ReleService,
              private souvenirService: SouvenirService) {
    breadService.doOneBread('Аркадные игры');
    breadService.doTwoBread('Добавить');
  }

  ngOnInit() {
    this.initGameForm();
    this.getListRele();
    this.getListSouvenir();
    this.getListCamera();
    this.getListPosition();
  }

  initGameForm() {
    this.formGame = this.formBuilder.group({
      game_id: ['', []],
      rele_start_id: ['', [Validators.required]],
      rele_end_id: ['', [Validators.required]],
      camera_start_id: ['', [Validators.required]],
      camera_end_id: ['', [Validators.required]],
      camera_multi_photo_id: ['', [Validators.required]],
      type_souvenir_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      lasting_rele_start: ['', [Validators.required]],
      lasting_rele_end: ['', [Validators.required]],
      fl_display: [true, [Validators.required]],
      quant_photo: [0, [Validators.required]],
      interval_photo: [0, [Validators.required]],
      lasting_game: ['', [Validators.required]],
      min_lasting_game: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  addGame(game: GameArcade) {
    this.gameService.postGame(this.image, this.audioStart, this.audioEnd, game).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'game-arcade']);
      }
    });
  }

  selectAudioStart(audio: any) {
    this.audioStart = audio.target.files.item(0);
  }

  selectAudioEnd(audio: any) {
    this.audioEnd = audio.target.files.item(0);
  }

  selectImage(image: any) {
    this.image = image.target.files.item(0);
  }

  getListRele() {
    this.releService.getListRele().subscribe(res => {
      this.listRele = res;
    });
  }

  getListSouvenir() {
    this.souvenirService.getListSouvenir().subscribe(res => {
      this.listSouvenir = res;
    });
  }

  getListCamera() {
    this.cameraService.getListCamera().subscribe(res => {
      this.listCamera = res;
    });
  }

  getListPosition() {
    this.gameService.getListPosition().subscribe(res => {
      this.listPosition = res;
    });
  }

}
