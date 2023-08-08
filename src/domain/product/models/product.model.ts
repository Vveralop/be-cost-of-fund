import { CreateProductInput } from '../dto/create-product.dto';

export type ProductKey = {
  id: string;
};

class ForecastCurve {
    curveName: string;
    forecastCurve: string;
    fixingFrequency: string;
}

class _Options {
    id: string;
    productName: string;
    description: string;
    rateType: string;
    isActive: boolean;
    structure: string;
    dayCounter: string;
    compounding: string;
    allowPartialDisbursements: string;
    currency: string;
    minNotional: number;
    maxNotional: number;
    minStartTenor: string;
    maxStartTenor: string;
    maxEndTenor: string;
    discountCurve: string;
    forecastCurves: [ ForecastCurve ];
    paymentFrequencies: [ string ];
}

export class Product extends CreateProductInput {
    id: string;
    category: string;
    description: string;
    productType: string;
    options: [ _Options ];
    createAt: Date;
    updateAt: Date;
  }