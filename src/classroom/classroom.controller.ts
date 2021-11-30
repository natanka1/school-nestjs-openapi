
import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { BadRequestExceptionFilter } from '../utils/exceptions';
import {cast} from '../utils/functions'

import { Serialize } from '../decorators'

import { Classroom } from './schemas/classroom.schema';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { ClassroomResponseDto } from './dto/classroom-response.dto'
import { CreateClassroom_DtoTransformPipe } from './classroom.pipes';
import { ApiBody } from '@nestjs/swagger';
import { LoggerModule, Logger} from 'nestjs-pino'


@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService,
    private readonly logger: Logger) {}
  
  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  @ApiBody({type: CreateClassroomRequestDto}) // The filter doesn't work with classroom object
  async create(@Body(new CreateClassroom_DtoTransformPipe()) dto:CreateClassroomRequestDto ): Promise<ClassroomResponseDto> {
    try{
      const classroom = cast<CreateClassroomRequestDto, Classroom>(dto)
      const createdClassroom = await this.classroomService.create(classroom);
      this.logger.log("classroom created")
      return new ClassroomResponseDto(createdClassroom)

    } catch(error){
        throw error
    }

  }

  @Get()
  async findAll() {
    const classrooms: Classroom[] = await this.classroomService.findAll();
    return classrooms
  }

  @Get(':classroomName')
  async findOne(@Param('classroomName') classroomName: string) : Promise<ClassroomResponseDto> {
      const classroom: Classroom = await this.classroomService.findOne({classroomName})
      return new ClassroomResponseDto(classroom)
  }

  @Patch(':classroomName')
  @Serialize()
  @UseFilters(new BadRequestExceptionFilter())
  @ApiBody({type: CreateClassroomRequestDto})
  async update(@Param('classroomName') classroomName: string, @Body() classroom: Classroom ): Promise<ClassroomResponseDto> {
    
    const updatedClassroom: Classroom = await this.classroomService.update(classroomName, classroom)
    return new ClassroomResponseDto(updatedClassroom)
  }

  @Delete(':classroomName')
  async remove(@Param('classroomName') classroomName: string) {
    return await this.classroomService.remove({classroomName});
  }
}
