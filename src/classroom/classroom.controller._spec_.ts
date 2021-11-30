import { Test } from '@nestjs/testing';
import { ClassroomService } from './classroom.service'
import { ClassroomController } from './classroom.controller'
import { mockClassroomService } from './classroom.mock.service'
import { ClassroomResponseDto } from './dto/classroom-response.dto';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { Classroom } from './schemas/classroom.schema';
import { cast } from '../utils/functions';

describe('Classroom Controller', () => {
    
    let controller: ClassroomController

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
            providers: [{
                provide: ClassroomService,
                useValue: mockClassroomService
            }],
            controllers: [ClassroomController]
        }).compile()
        controller = moduleRef.get(ClassroomController)
    })
    it('Can create an instance of classroom service', async () => {

        expect(controller).toBeDefined()
    })
    it('create a new classroom', async () => {
        const classroomDto: unknown = {
            classroomName: "JavaScript",
            classroomSize: 15
        }
        const classroom = await controller.create( classroomDto as CreateClassroomRequestDto)

        const {className, classSize} = classroom
        expect(className).toBe("JavaScript")
        expect(classSize).toBe(15)
    })
    it('finds a classroom', async () => {
        const classroom = await controller.findOne("JavaScript")
        expect(classroom instanceof ClassroomResponseDto).toBe(true)
    })
})

