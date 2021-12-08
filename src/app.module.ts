import { ConfigModule } from '@nestjs/config';
import { Logger, Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { LogsModule } from './logger/logs.module';

import { createLoggerModuleSync } from '@natankamusher/custom-logger-nest'

const loggerModule = createLoggerModuleSync();

@Module({
  imports: [
    ConfigModule.forRoot(), 
    loggerModule,
    MongooseModule.forRoot(process.env.DB_URL),
    ClassroomModule, 
    StudentModule, LogsModule,
  ],
  providers: [
    {
      provide: APP_PIPE, 
      useValue: new ValidationPipe()
    },
    Logger
  ],
})



export class AppModule {}
