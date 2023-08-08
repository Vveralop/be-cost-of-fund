import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Funding, FundingKey } from '../models/funding.model';

@Injectable()
export class SelectFundingService {
  constructor(
    @InjectModel('funding')
    private readonly model: Model<Funding, FundingKey>,
  ) { }

  findOne(key: FundingKey) {
    try {
      return this.model.get(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
