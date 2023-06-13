import { Injectable } from '@nestjs/common';
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
    const worker = await this.workerRepository.create(createWorkerDto);
    await this.workerRepository.save(worker);
    return worker;
  }

  findAll() {
    return this.workerRepository.find();
  }

  findOne(id: string) {
    return this.workerRepository.findOneBy({ id });
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const findWorker = await this.findOne(id);
    const upadateWorker = await this.workerRepository.merge(
      findWorker,
      updateWorkerDto,
    );
    return this.workerRepository.save(upadateWorker);
  }

  async remove(id: string) {
    const worker = await this.findOne(id);
    await this.workerRepository.remove(worker);
    return `The worker: #${worker.name} is deleted successfully`;
  }
}
