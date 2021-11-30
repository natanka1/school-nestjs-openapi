import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteClassroomDto {
    @ApiProperty({
        description: 'The name of the classroom to delete',
        minimum: 1,
        default: "Classroom name to delete"
    })
    @IsNotEmpty()
    name:string
}