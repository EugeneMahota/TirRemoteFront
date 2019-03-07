import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameTir} from '../../../models/game-tir';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {GameTirService} from '../../../services/game-tir.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Souvenir} from '../../../models/souvenir';
import {Camera} from '../../../models/camera';
import {Rele} from '../../../models/rele';
import {CameraService} from '../../../services/camera.service';
import {SouvenirService} from '../../../services/souvenir.service';
import {ReleService} from '../../../services/rele.service';
import {Position} from '../../../models/position';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-game-tir',
  templateUrl: './edit-game-tir.component.html',
  styleUrls: ['./edit-game-tir.component.css']
})
export class EditGameTirComponent implements OnInit, OnDestroy {

  id: number;
  itemGameTir: GameTir = new GameTir();

  formGame: FormGroup;

  @ViewChild('image') imageInput;
  @ViewChild('audioStart') audioStartInput;
  @ViewChild('audioEnd') audioEndInput;

  audioStart: File;
  audioEnd: File;
  image: File;

  listRele: Rele[] = [];
  listSouvenir: Souvenir[] = [];
  listCamera: Camera[] = [];
  listPosition: Position[] = [];

  private notifier: NotifierService;

  constructor(private breadService: BreadcrumbService,
              private gameService: GameTirService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService,
              private souvenirService: SouvenirService,
              notifierService: NotifierService,
              private releService: ReleService) {
    this.breadService.doOneBread('Игры тира');
    this.breadService.doTwoBread('Редактирование');
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.gameService.getGame(this.id)) {
      this.itemGameTir = this.gameService.getGame(this.id);
    } else {
      this.router.navigate(['dashboard', 'game-tir']);
    }

    this.getListRele();
    this.getListSouvenir();
    this.getListCamera();
    this.getListPosition();
    this.initGameForm();
  }

  initGameForm() {
    this.formGame = this.formBuilder.group({
      id: [this.itemGameTir.id, [Validators.required]],
      game_id: [this.itemGameTir.game_id, []],
      rele_start_id: [this.itemGameTir.rele_start_id, [Validators.required]],
      rele_end_id: [this.itemGameTir.rele_end_id, [Validators.required]],
      camera_start_id: [this.itemGameTir.camera_start_id, [Validators.required]],
      camera_end_id: [this.itemGameTir.camera_end_id, [Validators.required]],
      camera_multi_photo_id: [this.itemGameTir.camera_multi_photo_id, [Validators.required]],
      type_souvenir_id: [this.itemGameTir.type_souvenir_id, [Validators.required]],
      name: [this.itemGameTir.name, [Validators.required]],
      price: [this.itemGameTir.price, [Validators.required]],
      image: [this.itemGameTir.image, [Validators.required]],
      lasting_game: [this.itemGameTir.lasting_game, [Validators.required]],
      lasting_rele_start: [this.itemGameTir.lasting_rele_start, [Validators.required]],
      lasting_rele_end: [this.itemGameTir.lasting_rele_end, [Validators.required]],
      fl_display: [this.itemGameTir.fl_display, [Validators.required]],
      shots: [this.itemGameTir.shots, [Validators.required]],
      miss_shots: [this.itemGameTir.miss_shots, [Validators.required]],
      audio_start: [this.itemGameTir.audio_start, [Validators.required]],
      audio_end: [this.itemGameTir.audio_end, [Validators.required]],
      quant_photo: [this.itemGameTir.quant_photo, [Validators.required]],
      interval_photo: [this.itemGameTir.interval_photo, [Validators.required]],
      timeout_autocancel: [this.itemGameTir.timeout_autocancel, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
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

  editGame(game: GameTir) {
    this.gameService.putGame(this.audioStart, this.audioEnd, this.image, game).subscribe(res => {
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
