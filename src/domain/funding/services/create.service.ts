import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Funding, FundingKey } from '../models/funding.model';
//import { Funding, FundingKey } from '../models/fund.model';
import * as uuid from 'uuid';
import { CreateFundingInput } from '../dto/create-funding.dto';
//import { CreateFundingInput } from '../dto/cretae-fund.dto';

@Injectable()
export class CreateFundingService {
  constructor(
    @InjectModel('funding')
    private readonly model: Model<Funding, FundingKey>,
  ) { }

  async create(input: CreateFundingInput) {
    try {
      return await this.model.create({
        ...input,
        id: uuid.v4(),
        createAt: new Date(),
        updateAt: new Date()
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
