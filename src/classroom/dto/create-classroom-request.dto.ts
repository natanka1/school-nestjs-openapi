import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomRequestDto {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    
    @IsNotEmpty()
    className!: string;


    @ApiProperty({
        description: 'The size of the classroom',
        minimum: 1,
        default: "15"
    })
    @IsNotEmpty()
    classSize: number;
}