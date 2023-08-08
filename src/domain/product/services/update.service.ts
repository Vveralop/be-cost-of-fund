import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.dto';

@Injectable()
export class UpdateProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
  ) { }

  update(key: ProductKey, input: CreateProductInput) {
    try {
      return this.model.update(key, input);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
