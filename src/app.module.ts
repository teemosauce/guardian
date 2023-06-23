import { Module } from '@nestjs/common';
import { ProjectModule } from './module/project/project.module';
import { LogModule } from './module/exception/exception.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/database';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ProjectModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
