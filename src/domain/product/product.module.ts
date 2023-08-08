import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ProductSchema } from './models/product.schema';
import { CreateProductService, DeleteProductService, SelectProductService, SelectAllProductService,  UpdateProductService } from './services';
import { CreateProductController, SelectProductController, UpdateProductController, DeleteProductController, SelectAllProductController } from 'src/adapter/controllers/product';
import {  } from 'src/adapter/controllers/product/select-all.controller';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'product',
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [CreateProductController, SelectProductController, SelectAllProductController, UpdateProductController, DeleteProductController],
  providers: [CreateProductService, SelectProductService, SelectAllProductService, UpdateProductService, DeleteProductService],
})
export class ProductModule { }
