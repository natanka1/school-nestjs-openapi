import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {TransformKey} from '../../decorators'


export class UpdateClassroomRequestDto {
    @TransformKey("classroomName")
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    className:string
    
    @TransformKey("classroomSize")
    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    classSize: number    
}
