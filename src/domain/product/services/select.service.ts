import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';

@Injectable()
export class SelectProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
  ) { }

  findOne(key: ProductKey) {
    try {
      return this.model.get(key);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
