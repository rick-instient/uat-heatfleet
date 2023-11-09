import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
    providedIn: 'root',
  })
export class LoadingService{
  private subjects: { [name:string]:BehaviorSubject<boolean>} = {}
  public stopLoading(endPoint: string): void {
    if(this.subjects[endPoint] == null){
      return;
    }
    this.subjects[endPoint].next(false);
  }
  public startLoading(endPoint: string): Observable<boolean> {
    this.subjects[endPoint] = new BehaviorSubject<boolean>(true);
    return this.subjects[endPoint].asObservable();
  }

}