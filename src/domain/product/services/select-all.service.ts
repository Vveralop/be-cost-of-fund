import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';

@Injectable()
export class SelectAllProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
  ) { }

  async findAll() {
    try {
      return  await this.model.scan().exec()
      //return await dynamoose.model.scan().exec()
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
