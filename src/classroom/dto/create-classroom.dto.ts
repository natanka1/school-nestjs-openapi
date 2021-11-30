import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {TransformKey} from '../../decorators'

export class CreateClassroomDto {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    @IsNotEmpty()
    @TransformKey("classroomName")
    className:string
   
    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    @IsNotEmpty()
    @TransformKey("classroomSize")
    classSize: number    
}