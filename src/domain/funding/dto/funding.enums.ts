export enum DayCounter {
    Actual360 = 'Actual360', 
    Actual365 = 'Actual365', 
    Thirty360 = 'Thirty360'
}

// export enum Compounding {
//     Simple = 'Simple', 
//     Compounded = 'Compounded', 
//     Continuous = 'Continuous', 
//     SimpleThenCompounded = 'SimpleThenCompounded'
// }

// export enum Frequency {
//     Daily = "Daily",
//     Biweekly = "Biweekly",
//     Bimonthly = "Bimonthly", 
//     EveryFourthMonth = "EveryFourthMonth", 
//     EveryFourthWeek = "EveryFourthWeek", 
//     Weekly = "Weekly", 
//     Monthly = "Monthly", 
//     Quarterly = "Quarterly", 
//     Semiannual = "Semiannual", 
//     Annual = "Annual", 
//     NoFrequency = "NoFrequency", 
//     Once = "Once", 
//     OtherFrequency = "OtherFrequency"
// }

// export enum TimeUnit {
//     Days = "Days",
//     Months = "Months",
//     Weeks = "Weeks", 
//     Years = "Years"
// }

export enum Calendar {
    NullCalendar = 'NullCalendar',
    Chile = "Chile", 
    Brazil = "Brazil", 
    UnitedStates = "UnitedStates", 
    TARGET = "TARGET"
}

export enum Convention {
    Following = "Following", 
    ModifiedFollowing = "ModifiedFollowing", 
    Preceding = "Preceding", 
    ModifiedPreceding = "ModifiedPreceding", 
    Unadjusted = "Unadjusted", 
    HalfMonthModifiedFollowing = "HalfMonthModifiedFollowing", 
    Nearest = "Nearest"
}

export enum Currency {
    AUD = "AUD", 
    BRL = "BRL", 
    CHF = "CHF", 
    CLF = "CLF", 
    CLP = "CLP", 
    COP = "COP", 
    EUR = "EUR", 
    GBP = "GBP", 
    JPY = "JPY", 
    MXN = "MXN", 
    NZD = "NZD", 
    PEN = "PEN", 
    SEK = "SEK", 
    USD = "USD"
}

// export enum Month {
//     January = "January", 
//     February = "February", 
//     March = "March", 
//     April = "April", 
//     May = "May", 
//     June = "June", 
//     July = "July", 
//     September = "September", 
//     October = "October", 
//     November = "November", 
//     December = "December"
// }

export enum HelperType {
    Bond = "Bond", 
    Deposit = "Deposit", 
    FxSwap = "FxSwap", 
    OIS = "OIS", 
    SofrFuture = "SofrFuture", 
    Swap = "Swap", 
    TenorBasis = "TenorBasis", 
    Xccy = "Xccy",
    XccyBasis = "XccyBasis"
}

// export enum RateType {
//     Fixed = "Fixed", 
//     Floating = "Floating", 
//     Mixed = "Mixed"
// }

// export enum Structure {
//     FixedRateCustom = "FixedRateCustom", 
//     FixedRateBullet = "FixedRateBullet", 
//     EqualPayments = "EqualPayments", 
//     Zero = "Zero", 
//     FixedRateEqualRedemptions = "FixedRateEqualRedemptions", 
//     FloatingRateCustom = "FloatingRateCustom", 
//     FloatingRateBullet = "FloatingRateBullet", 
//     FloatingRateEqualRedemptions = "FloatingRateEqualRedemptions"
// }