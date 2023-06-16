import { Injectable, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw new Error('error creating product please try again');
    }
  }

  findAll() {
    try {
      return this.productRepository.find();
    } catch (error) {
      throw new Error('error find alll product');
    }
  }

  findOne(id: string) {
    try {
      return this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('error find one product');
    }
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    try {
      const findCategories = await this.findOne(id);
      const updateProduct = await this.productRepository.merge(
        findCategories,
        updateProductDto,
      );
      return this.productRepository.save(updateProduct);
    } catch (error) {
      throw new Error('Error updating');
    }
  }

  async remove(id: string) {
    try {
      const producto = await this.findOne(id);
      await this.productRepository.remove(producto);
      return 'Product removed successfully';
    } catch (error) {
      throw new Error('error when removing product');
    }
  }
}
