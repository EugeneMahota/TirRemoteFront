import {Component, OnDestroy, OnInit} from '@angular/core';
import {Camera} from '../../../models/camera';
import {CameraService} from '../../../services/camera.service';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const ipPattern =
  '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

@Component({
  selector: 'app-list-camera',
  templateUrl: './list-camera.component.html',
  styleUrls: ['./list-camera.component.css']
})
export class ListCameraComponent implements OnInit, OnDestroy {

  addCameraForm: FormGroup;
  editCameraForm: FormGroup;

  itemCamera: Camera = new Camera();
  listCamera: Camera[] = [];

  constructor(private cameraService: CameraService, private breadService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadService.doOneBread('Камеры');
  }

  ngOnInit() {
    this.cameraService.getListCamera().subscribe(res => {
      this.listCamera = res;
    });
    this.initAddCameraForm();
    this.initEditCameraForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initAddCameraForm() {
    this.addCameraForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.pattern(ipPattern)]]
    });
  }

  initEditCameraForm() {
    this.editCameraForm = this.formBuilder.group({
      id: [this.itemCamera.id, []],
      name: [this.itemCamera.name, [Validators.required, Validators.minLength(3)]],
      address: [this.itemCamera.address, [Validators.required, Validators.pattern(ipPattern)]]
    });
  }

  deleteCamera() {
    this.cameraService.delCamera(this.itemCamera.id).subscribe(res => {
        if (res.status === 200) {
          this.ngOnInit();
        }
      }
    );
  }

  addCamera(camera: Camera) {
    this.cameraService.postCamera(camera).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

  editCamera(camera: Camera) {
    this.cameraService.putCamera(camera).subscribe(res => {
      this.ngOnInit();
    });
  }

}
