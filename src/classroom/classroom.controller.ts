
import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ClassroomService } from './classroom.service';
import { BadRequestExceptionFilter } from '../utils/exceptions';
import { Logger } from 'winston';

import { Serialize } from '../decorators'
import {cast} from '../utils/functions'
import { Classroom } from './schemas/classroom.schema';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { ClassroomResponseDto } from './dto/classroom-response.dto'
import { CreateClassroom_DtoTransformPipe } from './classroom.pipes';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly classroomService: ClassroomService) {}
  
  
  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  @ApiOperation({tags: ["create classroom", "classroom create"], description: "create a new classroom"})
  @ApiBody({type: CreateClassroomRequestDto}) // The filter doesn't work with classroom object
  async create(@Body(new CreateClassroom_DtoTransformPipe()) dto:CreateClassroomRequestDto ): Promise<ClassroomResponseDto> {
    try{
      const classroom = cast<CreateClassroomRequestDto, Classroom>(dto)
      const createdClassroom = await this.classroomService.create(classroom);
      this.logger.info("info message from logger");
      return new ClassroomResponseDto(createdClassroom)

    } catch(error){
        throw error
    }

  }

  @Get('/log')
  logMessage() {
    const obj={a: "sldksdlj", b:5}
    this.logger.log({
      level: 'info', message: "info message from logger"
    });
    this.logger.debug("debug message from logger", obj);
    this.logger.error("error message from logger");
    this.logger.verbose("verbose message from logger");
    this.logger.warn("warn message from logger");
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
