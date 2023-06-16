import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { categories, ...product } = createProductDto;
      let categoriesModels = [];

      categoriesModels = await this.categoryRepository.find({
        where: { name: In([...createProductDto.categories]) },
      });

      const model = this.productRepository.create({
        ...product,
        categories: categoriesModels,
      });
      await this.productRepository.save(model);

      return model;
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
    const { categories, ...products } = updateProductDto;
    let categoriesModels = [];
    if (updateProductDto.categories) {
      categoriesModels = await this.categoryRepository.find({
        where: { name: In([...updateProductDto.categories]) },
      });
    }
    const product = await this.productRepository.preload({
      id,
      ...products,
      categories: categoriesModels,
    });
    if (!product) {
      throw new NotFoundException(`Product ${product.name} not found`);
    }
    return this.productRepository.save(product);
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
