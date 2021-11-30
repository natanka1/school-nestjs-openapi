import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class ClassroomDto {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    @IsNotEmpty()
    className:string
    
    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    @IsNotEmpty()
    classSize: number    
}