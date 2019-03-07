import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GunService} from '../../../services/gun.service';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Gun} from '../../../models/gun';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-gun',
  templateUrl: './add-gun.component.html',
  styleUrls: ['./add-gun.component.css']
})
export class AddGunComponent implements OnInit, OnDestroy {

  @ViewChild('image') imageInput;
  @ViewChild('audio') audioInput;

  gunForm: FormGroup;
  image: File;
  audio: File;

  private notifier: NotifierService;

  constructor(private gunService: GunService,
              private breadService: BreadcrumbService,
              private router: Router,
              private formBuilder: FormBuilder,
              notifierService: NotifierService) {
    this.breadService.doOneBread('Ружья');
    this.breadService.doTwoBread('Добавить');
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.initGunForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initGunForm() {
    this.gunForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      voltage: ['', [Validators.required]]
    });
  }

  selectImage(image: any) {
    let file: File;
    file = image.target.files.item(0);
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      this.image = file;
    } else {
      this.image = null;
      this.imageInput.nativeElement.value = null;
      this.notifier.notify('error', 'Неверный формат фото!');
    }
  }

  selectAudio(audio: any) {
    let file: File;
    file = audio.target.files.item(0);
    if (file.type === 'audio/mp3') {
      this.audio = audio.target.files.item(0);
    } else {
      this.audio = null;
      this.audioInput.nativeElement.value = null;
      this.notifier.notify('error', 'Неверный формат аудио!');
    }
  }

  addGun(gun: Gun) {
    this.gunService.postGun(this.audio, this.image, gun.name, gun.voltage).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'gun']);
      }
    });
  }

}
