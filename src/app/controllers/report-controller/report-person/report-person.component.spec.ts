import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPersonComponent } from './report-person.component';

describe('ReportPersonComponent', () => {
  let component: ReportPersonComponent;
  let fixture: ComponentFixture<ReportPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
