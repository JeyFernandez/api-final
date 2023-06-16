import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    try {
      const provider = await this.providerRepository.create(createProviderDto);
      await this.providerRepository.save(provider);
      return provider;
    } catch (error) {
      throw new Error('error creating provider please check and try again');
    }
  }

  findAll() {
    try {
      return this.providerRepository.find();
    } catch (error) {
      throw new Error('Error finding provider');
    }
  }

  findOne(id: string) {
    try {
      return this.providerRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('Error getting one providers');
    }
  }

  async update(id: string, updateProviderDto: CreateProviderDto) {
    try {
      const findProvider = await this.providerRepository.findOneBy({ id });
      const updateProvider = await this.providerRepository.merge(
        findProvider,
        updateProviderDto,
      );
      return this.providerRepository.save(updateProvider);
    } catch (error) {
      throw new Error('Error when updating provider please try again');
    }
  }

  async remove(id: string) {
    try {
      const provider = await this.findOne(id);
      await this.providerRepository.remove(provider);
      return `provider ${provider.name} is removed successfully`;
    } catch (error) {
      throw new Error('Error removing provider');
    }
  }
}
