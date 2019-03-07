import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {GameTirService} from '../../../services/game-tir.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GameTir} from '../../../models/game-tir';
import {Position} from '../../../models/position';
import {CameraService} from '../../../services/camera.service';
import {ReleService} from '../../../services/rele.service';
import {SouvenirService} from '../../../services/souvenir.service';
import {Camera} from '../../../models/camera';
import {Rele} from '../../../models/rele';
import {Souvenir} from '../../../models/souvenir';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-game-tir',
  templateUrl: './add-game-tir.component.html',
  styleUrls: ['./add-game-tir.component.scss']
})
export class AddGameTirComponent implements OnInit, OnDestroy {

  @ViewChild('image') imageInput;
  @ViewChild('audioStart') audioStartInput;
  @ViewChild('audioEnd') audioEndInput;

  formGame: FormGroup;

  audioStart: File;
  audioEnd: File;
  image: File;

  listCamera: Camera[] = [];
  listRele: Rele[] = [];
  listSouvenir: Souvenir[] = [];
  listPosition: Position[] = [];

  private notifier: NotifierService;
  constructor(private breadService: BreadcrumbService,
              private gameService: GameTirService,
              notifierService: NotifierService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cameraService: CameraService,
              private releService: ReleService,
              private souvenirService: SouvenirService) {
    this.breadService.doOneBread('Игры тира');
    this.breadService.doTwoBread('Добавить');
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.initGameForm();
    this.getListRele();
    this.getListSouvenir();
    this.getListCamera();
    this.getListPosition();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
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
      lasting_game: ['', [Validators.required]],
      lasting_rele_start: ['', [Validators.required]],
      lasting_rele_end: ['', [Validators.required]],
      fl_display: [true, [Validators.required]],
      shots: ['', [Validators.required]],
      miss_shots: ['', [Validators.required]],
      quant_photo: [0, [Validators.required]],
      interval_photo: [0, [Validators.required]],
      timeout_autocancel: ['', [Validators.required]]
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

  addGame(game: GameTir) {
    console.log(game);
    this.gameService.postGame(this.audioStart, this.audioEnd, this.image, game).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'game-tir']);
      }
    });
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
