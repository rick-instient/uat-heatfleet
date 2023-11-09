
export enum CalendarReloadPieces {
    SheduleOil = 'scheduleoil',
    ScheduleService = 'scheduleservice',
    Calendar = 'calendar'
}
export enum PaymentState {
    Unknown = 0,
    PaymentPending = 1,
    PaymentFailed = 2,
    PaymentSuccess = 3
}
export enum PaymentType {
    Unknown = 0,
    Sale = 1,
    Refund = 2
}
export enum DayStatus {
    Unknown = 0,
    Closed = 1,
    ManualClosed = 2,
    AutoOpened = 3,
    ManualOpened = 4
}

export enum DeliveryDayStatus {
    Closed = 0,
    Zone1Open = 1,
    Zone2Open = 2,
    ServiceOpen = 3
}

export enum TruckType {
    Unknown = 0,
    OilTruck = 1,
    ServiceTruck = 2,
}

export enum FlashSaleType {
    Unknown = 0,
    FixedNumberOfOrder = 1,
    FixedValue = 2,
    FixedVolume = 3
}

export enum ServiceType {
    Unknown = 0,
    TuneUp = 1,
    ServiceCall = 2,
    OneYearContract = 3,
    OilDelivery = 4,
    All = 5
}

export enum TankLocation {
    BelowTheBottomLeftCorner = 6,
    NextToBottomLeftCorner = 5,
    NextToTheUpperLeftCorner = 4,
    AboveTheUpperLeftCorner = 3,
    AboveTheUpperRigthCorner = 2,
    NextToTheUpperRightCorner = 1,
    NextToBottomRightCorner = 8,
    BelowTheBottomRightCorner = 7,
}
export enum OrderStatus {
    Unknown = 0,
    Temporary = 1,
    Pending = 2,
    Scheduled = 3,
    Delivered = 4,
    Canceled = 5,
    DeliveryFailed = 6,
    PaymentFailed = 7,
    Giveup = 8
}

export enum CustomerTaxType {
    Unknown = 0,
    Residental = 1,
    Commercial = 2
}


export enum GridUiStates {
    DataLoading = 1,
    Empty = 2,
    DataLoaded = 3
}
