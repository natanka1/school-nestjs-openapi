import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateStudentDto {
    @ApiProperty({
        description: 'the name of the student'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'the name of the classroom to add the student'
    })
    @IsNotEmpty()
    classroomName: string;
}
