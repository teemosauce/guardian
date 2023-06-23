import { Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { ExceptionController } from './exception.controller';
import { Exception } from './entities/exception.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Exception])],
  controllers: [ExceptionController],
  providers: [ExceptionService],
})
export class LogModule {}
