import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEventComponent } from './report-event.component';

describe('ReportEventComponent', () => {
  let component: ReportEventComponent;
  let fixture: ComponentFixture<ReportEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
