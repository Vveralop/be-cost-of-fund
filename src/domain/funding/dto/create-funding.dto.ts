import { IsEnum, IsNotEmpty } from 'class-validator';
import { Calendar, Convention, Currency, DayCounter, HelperType } from './funding.enums';
import { ApiProperty } from '@nestjs/swagger';

class HelperConfig {
  @ApiProperty()
  tenor: string;
  @ApiProperty()
  @IsEnum(Calendar)
  calendar: Calendar;
  @ApiProperty()
  fixingDays: number;
  @ApiProperty()
  endOfMonth: boolean;
  @ApiProperty()
  baseCurrencyAsCollateral: boolean;
  @ApiProperty()
  @IsEnum(Convention)
  convention: Convention;
  @ApiProperty()
  discountCurve: string;
  @ApiProperty()
  settlementDays: number;
  @ApiProperty()
  identifier: string;
}

class FxSpotPoint {
  @ApiProperty()
  value: number;
  @ApiProperty()
  ticker: string;
}

class MarketConfig {
  @ApiProperty()
  fxSpot: FxSpotPoint;
  @ApiProperty()
  fxPoints: FxSpotPoint;
}

class RateHekpers {
  @ApiProperty()
  @IsEnum(HelperType)
  helperType: HelperType;
  @ApiProperty({
    type: HelperConfig,
    isArray: true,
  })
  helperConfig: HelperConfig;
  @ApiProperty({
    type: MarketConfig,
    isArray: true,
  })
  marketConfig: MarketConfig;
}

class CurveConfig {
  @ApiProperty()
  curveType: string;
  @ApiProperty()
  @IsEnum(DayCounter)
  dayCounter: DayCounter;
  @ApiProperty()
  enableExtrapolation: boolean;
  @ApiProperty()
  @IsEnum(Currency)
  currency: Currency;
  @ApiProperty({
    type: RateHekpers,
    isArray: true,
  })
  rateHelpers: [RateHekpers]
}

class CurveIndex {
  @ApiProperty()
  indexType: string;
  @ApiProperty()
  tenor: string;
  @ApiProperty()
  @IsEnum(DayCounter)
  dayCounter: DayCounter;
  @ApiProperty()
  @IsEnum(Currency)
  currency: Currency;
  @ApiProperty()
  fixingDays: number;
  @ApiProperty()
  @IsEnum(Calendar)
  calendar: Calendar;
  @ApiProperty()
  endOfMonth: boolean;
  @ApiProperty()
  @IsEnum(Convention)
  convention: Convention;
}

class Curves {
  @ApiProperty()
  curveName: string;
  @ApiProperty({
    type: CurveConfig,
    isArray: false,
  })
  curveConfig: CurveConfig;
  @ApiProperty({
    type: CurveIndex,
    isArray: false,
  })
  curveIndex: CurveIndex;
}

class Nodes {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  value: number;
}

class Curve {
  @ApiProperty()
  curveName: string;
  @ApiProperty({
    type: Nodes,
    isArray: true,
  })
  nodes: [ Nodes ]
}

class MarketData {
  @ApiProperty()
  refDate: Date;

  @ApiProperty({
    type: Curves,
    isArray: true,
  })
  curves: [Curves]
}

export class CreateFundingInput {
  @ApiProperty({
    type: MarketData,
    isArray: false,
  })
  @IsNotEmpty() 
  marketdata: MarketData;

  @ApiProperty()
  @IsNotEmpty()
  curve: Curve;
}
