import { ConfigModule } from '@nestjs/config';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { Logger, LoggerModule} from 'nestjs-pino'
import {join} from 'path'



@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URL),
    ClassroomModule, 
    StudentModule,
    LoggerModule.forRoot()
  ],
  providers: [
    {
      provide: APP_PIPE, 
      useValue: new ValidationPipe()}
  ]

})



export class AppModule {}
