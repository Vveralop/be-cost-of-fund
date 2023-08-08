import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Funding, FundingKey } from '../models/funding.model';
import { CreateFundingInput } from '../dto/create-funding.dto';

@Injectable()
export class UpdateFundingService {
  constructor(
    @InjectModel('funding')
    private readonly model: Model<Funding, FundingKey>,
  ) { }

  update(key: FundingKey, input: CreateFundingInput) {
    try {
      return this.model.update(key, input);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
