import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '@modules/product/models/product.model';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
  ) { }

  async delete(key: ProductKey) {
    try {
      const product = await this.model.get(key);
      if (!product){
        throw new NotFoundException;
      } else {
        await this.model.delete(key);
        return {
          statusCode: 200,
          message: 'OK',
          data: {}
        };
      }
  
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
