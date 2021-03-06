import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Rele} from '../../../models/rele';
import {Souvenir} from '../../../models/souvenir';
import {Camera} from '../../../models/camera';
import {Position} from '../../../models/position';
import {GameArcadeService} from '../../../services/game-arcade.service';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CameraService} from '../../../services/camera.service';
import {ReleService} from '../../../services/rele.service';
import {SouvenirService} from '../../../services/souvenir.service';
import {GameArcade} from '../../../models/game-arcade';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-game-arcade',
  templateUrl: './edit-game-arcade.component.html',
  styleUrls: ['./edit-game-arcade.component.scss']
})
export class EditGameArcadeComponent implements OnInit, OnDestroy {

  @ViewChild('image') imageInput;
  @ViewChild('audioStart') audioStartInput;
  @ViewChild('audioEnd') audioEndInput;

  id: number;
  itemGame: GameArcade = new GameArcade();
  formGame: FormGroup;

  audioStart: File;
  audioEnd: File;
  image: File;

  listRele: Rele[] = [];
  listSouvenir: Souvenir[] = [];
  listCamera: Camera[] = [];
  listPosition: Position[] = [];

  private notifier: NotifierService;

  constructor(private gameService: GameArcadeService,
              private breadService: BreadcrumbService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cameraService: CameraService,
              private releService: ReleService,
              notifierService: NotifierService,
              private souvenirService: SouvenirService,
              private route: ActivatedRoute) {
    breadService.doOneBread('Аркадные игры');
    breadService.doTwoBread('Редактировать');
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.gameService.getGame(this.id)) {
      this.itemGame = this.gameService.getGame(this.id);
    } else {
      this.router.navigate(['dashboard', 'game-arcade']);
    }
    this.initGameForm();
    this.getListRele();
    this.getListSouvenir();
    this.getListCamera();
    this.getListPosition();
  }

  initGameForm() {
    this.formGame = this.formBuilder.group({
      id: [this.id, []],
      game_id: [this.itemGame.game_id, []],
      rele_start_id: [this.itemGame.rele_start_id, [Validators.required]],
      rele_end_id: [this.itemGame.rele_end_id, [Validators.required]],
      camera_start_id: [this.itemGame.camera_start_id, [Validators.required]],
      camera_end_id: [this.itemGame.camera_end_id, [Validators.required]],
      camera_multi_photo_id: [this.itemGame.camera_multi_photo_id, [Validators.required]],
      type_souvenir_id: [this.itemGame.type_souvenir_id, [Validators.required]],
      name: [this.itemGame.name, [Validators.required]],
      price: [this.itemGame.price, [Validators.required]],
      lasting_rele_start: [this.itemGame.lasting_rele_start, [Validators.required]],
      lasting_rele_end: [this.itemGame.lasting_rele_end, [Validators.required]],
      fl_display: [this.itemGame.fl_display, [Validators.required]],
      quant_photo: [this.itemGame.quant_photo, [Validators.required]],
      interval_photo: [this.itemGame.interval_photo, [Validators.required]],
      lasting_game: [this.itemGame.lasting_game, [Validators.required]],
      min_lasting_game: [this.itemGame.min_lasting_game, [Validators.required]],
      image: [this.itemGame.image, [Validators.required]],
      audio_start: [this.itemGame.audio_start, [Validators.required]],
      audio_end: [this.itemGame.audio_end, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  editGame(game: GameArcade) {
    this.gameService.putGame(this.image, this.audioStart, this.audioEnd, game).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'game-arcade']);
      }
    });
  }

  selectAudioStart(audio: any) {
    let file: File;
    file = audio.target.files.item(0);

    if (file.type === 'audio/mp3') {
      this.audioStart = audio.target.files.item(0);
    } else {
      this.audioStartInput.nativeElement.value = null;
      this.audioStart = null;
      this.notifier.notify('error', 'Неверный формат аудио!');
    }
  }

  selectAudioEnd(audio: any) {
    let file: File;
    file = audio.target.files.item(0);

    if (file.type === 'audio/mp3') {
      this.audioEnd = audio.target.files.item(0);
    } else {
      this.audioEndInput.nativeElement.value = null;
      this.audioEnd = null;
      this.notifier.notify('error', 'Неверный формат аудио!');
    }
  }

  selectImage(image: any) {
    let file: File;
    file = image.target.files.item(0);
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      this.image = image.target.files.item(0);
    } else {
      this.imageInput.nativeElement.value = null;
      this.image = null;
      this.notifier.notify('error', 'Неверный формат изображения!');
    }
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
