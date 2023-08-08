import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.dto';
import * as uuid from 'uuid';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
  ) { }

  create(input: CreateProductInput) {
    try {
      return this.model.create({
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
