import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportGame} from '../../../models/report-game';
import {NotifierService} from 'angular-notifier';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {DateTimeAdapter} from 'ng-pick-datetime';
import {ReportService} from '../../../services/report.service';
import {ReportDate} from '../../../models/report-date';
import {ReportEvent} from '../../../models/report-event';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-report-event',
  templateUrl: './report-event.component.html',
  styleUrls: ['./report-event.component.scss'],
  animations: [
    trigger('table-sm', [
      state('fat', style({
        height: '48.8px'
      })),
      state('slim', style({
        height: '34.4px'
      })),
      transition('fat<=>slim', animate('250ms ease-in-out'))
    ]),
    trigger('list', [
      state('void', style({
        transform: 'scale(0.9)'
      })),
      state('*', style({
        transform: 'scale(1)'
      })),
      transition('void => *, *=>void', animate('250ms ease-in-out'))
    ])
  ]
})
export class ReportEventComponent implements OnInit, OnDestroy {

  showTable: boolean = false;

  reportForm: FormGroup;
  listReport: ReportEvent[] = [];

  date: Date = new Date();

  private notifier: NotifierService;

  activeDate: string;
  constructor(private breadService: BreadcrumbService,
              notifierService: NotifierService,
              dateTimeAdapter: DateTimeAdapter<any>,
              private formBuilder: FormBuilder,
              private reportService: ReportService) {
    this.notifier = notifierService;
    dateTimeAdapter.setLocale('Ru');
    this.breadService.doOneBread('Логирование событий');
  }

  ngOnInit() {
    this.initReportForm();
    this.getDay();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initReportForm() {
    this.reportForm = this.formBuilder.group({
      date: ['', [Validators.required]]
    });
  }

  getReport(date) {
    const reportDate: ReportDate =
      {
        dateStart: +date[0],
        dateEnd: +date[1]
      };

    if (this.reportForm.valid) {
      this.reportService.postEvent(reportDate).subscribe(res => {
        this.listReport = res;
      });
    } else {
      this.notifier.notify('error', 'Неверный формат даты!');
    }
  }

  getDay() {
    let date: Date = new Date();
    let dateStart: Date = new Date(new Date(date.setHours(0)).setMinutes(0));
    let dateEnd: Date = new Date(new Date(date.setHours(23)).setMinutes(59));

    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  getWeek() {
    let day_milliseconds = 24 * 60 * 60 * 1000;
    let date = new Date();
    let dateStart = new Date(date.getTime() - (date.getDay() - 1) * day_milliseconds);
    let dateEnd = new Date(dateStart.getTime() + 6 * day_milliseconds);

    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    dateEnd = new Date(new Date(dateEnd.setHours(23)).setMinutes(59));

    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  getMonth() {
    //start
    let date: Date = new Date();
    let dateStart: Date = new Date(date.setDate(1));
    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    //end
    let dateEnd: Date;
    if (date.getMonth() === 11) {
      dateEnd = new Date(new Date(this.date.setDate(1)).setMonth(1));
      dateEnd = new Date(dateEnd.setFullYear(date.getFullYear() + 1));
    } else {
      dateEnd = new Date(new Date(this.date.setDate(1)).setMonth(date.getMonth() + 1));
    }
    dateEnd = new Date(new Date(dateEnd.setHours(0)).setMinutes(0));
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  getYear() {
    //start
    let dateStart: Date = new Date(this.date.setDate(1));
    dateStart = new Date(dateStart.setMonth(0));
    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    //end
    let dateEnd: Date = new Date(this.date.setDate(1));
    dateEnd = new Date(dateEnd.setMonth(0));
    dateEnd = new Date(new Date(dateEnd.setHours(0)).setMinutes(0));
    dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() + 1));
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  editDay(value) {
    let day: number = 24 * 60 * 60 * 1000;
    let dateStart: Date = this.reportForm.get('date').value[0];
    let dateEnd: Date = this.reportForm.get('date').value[1];

    if (value === '+') {
      dateStart = new Date(+dateStart + day);
      dateEnd = new Date(+dateEnd + day);
    }

    if (value === '-') {
      dateStart = new Date(+dateStart - day);
      dateEnd = new Date(+dateEnd - day);
    }
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  editWeek(value) {
    let week: number = 24 * 60 * 60 * 1000 * 7;

    let dateStart: Date = this.reportForm.get('date').value[0];
    let dateEnd: Date = this.reportForm.get('date').value[1];

    if (value === '+') {
      dateStart = new Date(+dateStart + week);
      dateEnd = new Date(+dateEnd + week);
    }

    if (value === '-') {
      dateStart = new Date(+dateStart - week);
      dateEnd = new Date(+dateEnd - week);
    }
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  editMonth(value) {
    let dateStart: Date = this.reportForm.get('date').value[0];
    let dateEnd: Date = this.reportForm.get('date').value[1];

    if (value === '+') {
      dateStart = new Date(dateStart.setMonth(dateStart.getMonth() + 1));
      dateEnd = new Date(dateEnd.setMonth(dateEnd.getMonth() + 1));
    }

    if (value === '-') {
      dateStart = new Date(dateStart.setMonth(dateStart.getMonth() - 1));
      dateEnd = new Date(dateEnd.setMonth(dateEnd.getMonth() - 1));
    }
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }

  editYear(value) {
    let dateStart: Date = this.reportForm.get('date').value[0];
    let dateEnd: Date = this.reportForm.get('date').value[1];

    if (value === '+') {
      dateStart = new Date(dateStart.setFullYear(dateStart.getFullYear() + 1));
      dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() + 1));
    }

    if (value === '-') {
      dateStart = new Date(dateStart.setFullYear(dateStart.getFullYear() - 1));
      dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() - 1));
    }
    //add
    this.reportForm.get('date').setValue([dateStart, dateEnd]);
  }
}
