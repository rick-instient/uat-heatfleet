import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieHelper } from "../cookie-helper";
import { CalendarOilDay, CalendarOilOrder, CalendarServiceDay, CalendarServiceOrder, DeliveryCalendarResponse } from "../models/general.model";
import { NetworkService } from "./network.service";

@Injectable({ providedIn: 'root' })
export class CalendarApiService {
  constructor(
    private http: NetworkService,
    private cookieHelper: CookieHelper,
  ) { }
  public getDeliveryCalendar(companyId: string, startDay: string): Observable<DeliveryCalendarResponse> {
    const url = `company/deliverycalendar?CompanyId=${companyId}&StartDayId=${startDay}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public closeOil(companyId: string, dayId: string): Observable<CalendarOilDay> {
    const url = `company/deliverycalendar/close/oil?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });

  }
  public openZone1(companyId: string, dayId: string): Observable<CalendarOilDay> {
    const url = `company/deliverycalendar/open/oil/zone1?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });

  }
  public openZone2(companyId: string, dayId: string): Observable<CalendarOilDay> {
    const url = `company/deliverycalendar/open/oil/zone2?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });
  }

  public openTuneUpService(companyId: string, dayId: string): Observable<CalendarServiceDay> {
    const url = `company/deliverycalendar/open/service/tune-up?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });
  }

  public closeTuneUpService(companyId: string, dayId: string): Observable<CalendarServiceDay> {
    const url = `company/deliverycalendar/close/service/tune-up?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });
  }

  public openServiceCallService(companyId: string, dayId: string): Observable<CalendarServiceDay> {
    const url = `company/deliverycalendar/open/service/service-call?companyId=${companyId}&dayId=${dayId}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });
  }

  public closeServiceCallService(companyId: string, dayId: string): Observable<CalendarServiceDay> {
    const url = `company/deliverycalendar/close/service/service-call?companyId=${companyId}&dayId=${dayId}`;
    const headers = new HttpHeaders().set(
      'Content-Type', 'application/json',
    );

    return this.http.put(url, { headers });
  }

  public setServiceAvailability(companyId: string, dayId: string,serviceCallEnabled:boolean,tuneupEnabled:boolean): Observable<CalendarServiceDay> {
    const url = `company/deliverycalendar/set/service?companyId=${companyId}&dayId=${dayId}&tuneUpEnabled=${tuneupEnabled}&serviceCallEnabled=${serviceCallEnabled}`;
    const headers = this.getHeader();

    return this.http.put(url, { headers });
  }
  private getHeader():HttpHeaders{
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'DAVOS-IsMobile': environment.isMobile.toString()
    });
}
}
