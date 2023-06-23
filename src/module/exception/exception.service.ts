import { Injectable } from '@nestjs/common';
import { CreateExceptionDto } from './dto/create-exception.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception as ExceptionEntity } from './entities/exception.entity';

@Injectable()
export class ExceptionService {
  constructor(
    @InjectRepository(ExceptionEntity)
    private readonly exceptionEntity: Repository<ExceptionEntity>,
  ) {}

  create(createExceptionDto: CreateExceptionDto) {
    const exception = new ExceptionEntity();
    exception.colno = createExceptionDto.colno;
    exception.rowno = createExceptionDto.rowno;
    exception.error = createExceptionDto.error;
    exception.projectId = createExceptionDto.appId;
    return this.exceptionEntity.insert(exception);
  }

  findAll() {
    return this.exceptionEntity.findAndCount();
  }

  findOne(id: number) {
    return this.exceptionEntity.findOneBy({
      id,
    });
  }

  remove(id: number) {
    return this.exceptionEntity.softDelete(id);
  }
}
