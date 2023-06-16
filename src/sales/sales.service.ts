import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const sales = await this.salesRepository.create(createSaleDto);
      await this.salesRepository.save(sales);
      return sales;
    } catch (error) {
      throw new Error('error creating sales: ' + error);
    }
  }

  findAll() {
    return this.salesRepository.find();
  }

  findOne(id: string) {
    return this.salesRepository.findOneBy({ id });
  }

  async update(id: string, updateSaleDto: CreateSaleDto) {
    try {
      const finSales = await this.findOne(id);
      const upadateSales = await this.salesRepository.merge(
        finSales,
        updateSaleDto,
      );
      await this.salesRepository.save(upadateSales);

      return upadateSales;
    } catch (error) {
      throw new Error('error updating sales');
    }
  }

  async remove(id: string) {
    try {
      const sales = await this.salesRepository.findOneBy({ id });
      await this.salesRepository.remove(sales);
      return `remove sales ${sales.id} successfully`;
    } catch (error) {}
  }
}
