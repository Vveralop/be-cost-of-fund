import { Schema } from 'dynamoose';

export const FundingSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  marketdata: {
    type: Object,
    schema: {
      refDate: { type: String },
      curves: {
        type: Array,
        schema: [{
          type: Object,
          schema: {
            curveName: { type: String },
            curveConfig: {
                type: Object,
                schema: {
                  curveType: { type: String },
                  dayCounter: { type: String },
                  enableExtrapolation: { type: Boolean },
                  currency: { type: String },
                  rateHelpers: {
                    type: Array,
                    schema: [{
                      type: Object,
                      schema: {
                        helperType: { type: String },
                        helperConfig: { 
                          type: Object,
                          schema: {
                            tenor: { type: String },
                            identifier: { type: String },
                            dayCounter: { type: String },
                            calendar: { type: String },
                            settlementDays: { type: Number },
                            endOfMonth: { type: Boolean },
                            convention: { type: String },
                            frequency: { type: String },
                            paymentLag: { type: Number },
                            telescopicValueDates: { type: Boolean },
                            index: { type: String },
                            fixedLegFrequency: { type: String },
                            fwdStart: { type: String },
                          }
                        },
                        marketConfig: {
                          type: Object,
                          schema: {
                            rate: { 
                              type: Object,
                              schema: {
                                value: { type: Number },
                                ticker: { type: String }
                              }
                            },
                            spread: {
                              type: Object,
                              schema: {
                                value: { type: Number },
                                ticker: { type: String }
                              }
                            }
                          }
                        }
                      }
                    }]
                  }
                },
            },
            curveIndex: {
              type: Object,
              schema: {
                indexType: { type: String },
                tenor: { type: String },
                dayCounter: { type: String },
                currency: { type: String },
                fixingDays: { type: Number },
                calendar: { type: String },
                endOfMonth: { type: Boolean },
                convention: { type: String },
              }
            }
          }
        }]
      }
    }
  },
  curve: {
    type: Object,
    schema: {
      curveName: { type: String },
      nodes: {
        type: Array,
        schema: [{
          type: Object,
          schema: {
          date: { type: String },
          value: { type: Number }
          }
        }]
      }
    }
  },
  createAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
});
