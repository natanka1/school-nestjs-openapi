import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Classroom } from '../schemas/classroom.schema'
export class ClassroomResponseDto {

    @ApiProperty({
      description: 'The name of the classroom',
      minimum: 1,
      default: "Math"
  })
    className: string

    @ApiProperty({
      description: 'The size of the classroom',
      minimum: 1,
      default: "Math"
  })
    classSize: number
    constructor(classroom: Classroom) {
      this.className = classroom.classroomName;
      this.classSize= classroom.classroomSize;
    }

    
}

