import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Funding, FundingKey } from '../models/funding.model';

@Injectable()
export class DeleteFundingService {
  constructor(
    @InjectModel('funding')
    private readonly model: Model<Funding, FundingKey>,
  ) { }

  delete(key: FundingKey) {
    try {
      return this.model.delete(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
