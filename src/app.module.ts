import { ConfigModule } from '@nestjs/config';
import { Logger, Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URL),
    ClassroomModule, 
    StudentModule
  ],
  providers: [
    {
      provide: APP_PIPE, 
      useValue: new ValidationPipe()
    },
    Logger
  ],
  controllers: [AppController],
})



export class AppModule {}
