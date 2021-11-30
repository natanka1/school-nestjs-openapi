import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { Classroom } from './schemas/classroom.schema'



/**
 * dtoToSchemaDictionary - Refference only
 * Creates a mapping between dto and schema nameing
 */
// const dtoToSchemaDictionary = [ 
//   {from: "className", to:"classroomName"},
//   {from: "classSize", to:"classroomSize"},
// ];


@Injectable()
export class CreateClassroom_DtoTransformPipe implements PipeTransform<CreateClassroomRequestDto, Classroom> {
  
  transform(value: CreateClassroomRequestDto, metadata: ArgumentMetadata): Classroom {

    const classroom: Classroom = new Classroom();

    classroom.classroomName = value.className;
    classroom.classroomSize = value.classSize; 
    
    // do more stuff as needed

    return classroom
  }
}



