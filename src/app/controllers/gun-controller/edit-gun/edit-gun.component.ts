import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GunService} from '../../../services/gun.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Gun} from '../../../models/gun';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-gun',
  templateUrl: './edit-gun.component.html',
  styleUrls: ['./edit-gun.component.css']
})
export class EditGunComponent implements OnInit, OnDestroy {

  @ViewChild('image') imageInput;
  @ViewChild('audio') audioInput;

  id: number;
  itemGun: Gun = new Gun();
  gunForm: FormGroup;

  image: File;
  audio: File;

  private notifier: NotifierService;

  constructor(private gunService: GunService,
              private route: ActivatedRoute,
              private router: Router,
              private fromBuilder: FormBuilder,
              private breadService: BreadcrumbService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
    this.breadService.doOneBread('Ружья');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.gunService.getGun(this.id)) {
      this.itemGun = this.gunService.getGun(this.id);
    } else {
      this.router.navigate(['dashboard', 'gun']);
    }
    this.initGunForm();
  }

  initGunForm() {
    this.gunForm = this.fromBuilder.group({
      id: [this.id, []],
      name: [this.itemGun.name, [Validators.required, Validators.minLength(3)]],
      voltage: [this.itemGun.voltage, [Validators.required]],
      image: [this.itemGun.image, []],
      audio: [this.itemGun.audio, []],
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
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

  editGun(gun: Gun) {
    this.gunService.putGun(this.audio, this.image, gun).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'gun']);
      }
    });
  }

}
