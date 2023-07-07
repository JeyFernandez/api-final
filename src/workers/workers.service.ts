import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    try {
      const worker = await this.workerRepository.create(createWorkerDto);
      await this.workerRepository.save(worker);
      return worker;
    } catch (error) {
      throw new NotFoundException('error creating worker');
    }
  }

  findAll() {
    try {
      return this.workerRepository.find();
    } catch (error) {
      throw new NotFoundException('error finding workers');
    }
  }

  findOne(id: string) {
    try {
      return this.workerRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException('error find one worker');
    }
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    try {
      const findWorker = await this.findOne(id);
      const upadateWorker = await this.workerRepository.merge(
        findWorker,
        updateWorkerDto,
      );
      return this.workerRepository.save(upadateWorker);
    } catch (error) {
      throw new NotFoundException('error updating worker');
    }
  }

  async remove(id: string) {
    try {
      const worker = await this.findOne(id);
      await this.workerRepository.remove(worker);
      return `The worker: ${worker.name} is deleted successfully`;
    } catch (error) {
      throw new NotFoundException('error deleting worker');
    }
  }
}
