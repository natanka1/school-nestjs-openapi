import { ApiProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto {
    @ApiProperty({
        description: 'the name of the student'
    })
    name: string;

    @ApiProperty({
        description: 'the name of the classroom to add the student'
    })
    classroomName: string;
}



