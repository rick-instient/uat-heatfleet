import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface BroadcastEvent {
    key: any;
    data?: any;
}

export class EventBus {
    private _eventBus: Subject<BroadcastEvent>;
    private static EVENT_SEND_ERROR_TOAST = "SendErrorToast";
    private static EVENT_SEND_TANK_AMOUNT = "SendTankAmount";
    private static EVENT_SEND_PAYMENT_FINISHED = "PaymentFinished";
    private static EVENT_SEND_ACCOUNT_DATA_CHANGED = "SendAccountDataChanged";
    private static EVENT_SEND_CALENDAR_RELOAD = "SendCalendarReload";
    private static EVENT_SEND_CALENDAR_PRICE_RELOAD = "SendCalendarPriceReload";
    private static EVENT_SEND_CALENDAR_RELOADED = "SendCalendarReloaded";


    constructor(
    ) {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    public broadcast(key: any, data?: any) {
        this._eventBus.next({ key, data });
    }

    public on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter(event => event.key === key),
            map(event => <T>event.data)
        )
    }

    public broadcastErrorToast(msg: string) {
        this.broadcast(EventBus.EVENT_SEND_ERROR_TOAST, msg);
    }

    public onErrorToastReceived(): Observable<string> {
        return this.on<string>(EventBus.EVENT_SEND_ERROR_TOAST);
    }

    public broadcastTankAmount(amount:number) {
        this.broadcast(EventBus.EVENT_SEND_TANK_AMOUNT, amount);
    }
    public onTankAmountReceived(): Observable<number> {
        return this.on<number>(EventBus.EVENT_SEND_TANK_AMOUNT);
    }
    public broadcastPaymentFinished() {
        this.broadcast(EventBus.EVENT_SEND_PAYMENT_FINISHED);
    }
    public onPaymentFinishedReceived(): Observable<void> {
        return this.on<void>(EventBus.EVENT_SEND_PAYMENT_FINISHED);
    }    
    public broadcastAccountDataChanged() {
        this.broadcast(EventBus.EVENT_SEND_ACCOUNT_DATA_CHANGED);
    }
    public onAccountDataChangedReceived(): Observable<void> {
        return this.on<void>(EventBus.EVENT_SEND_ACCOUNT_DATA_CHANGED);
    }    

    public broadcastCalendarPriceReload() {
        this.broadcast(EventBus.EVENT_SEND_CALENDAR_PRICE_RELOAD);
    }
    public onCalendarPriceReloadReceived(): Observable<void> {
        return this.on<void>(EventBus.EVENT_SEND_CALENDAR_PRICE_RELOAD);
    }    

    public broadcastCalendarReload() {
        this.broadcast(EventBus.EVENT_SEND_CALENDAR_RELOAD);
    }
    public onCalendarReloadReceived(): Observable<void> {
        return this.on<void>(EventBus.EVENT_SEND_CALENDAR_RELOAD);
    }    

    public broadcastCalendarReloaded(whichReloaded:string) {
        this.broadcast(EventBus.EVENT_SEND_CALENDAR_RELOADED, whichReloaded);
    }
    public onCalendarReloadedReceived(): Observable<string> {
        return this.on<string>(EventBus.EVENT_SEND_CALENDAR_RELOADED);
    }
      
    /*
    
    
      public broadcastChangeScreen(screen:ScreenType) {
        this.broadcast(EventBus.EVENT_CHANGE_SCREEN, screen);
      }
      
      public broadcastToHomeScreen() {
        this.broadcastChangeScreen(ScreenTypes.HOME);
      }
    */
}