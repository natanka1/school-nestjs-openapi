import {InjectModel, MongooseModule} from '@nestjs/mongoose'
import { Classroom } from './schemas/classroom.schema';
import {Model} from 'mongoose'
import { Injectable, Logger } from '@nestjs/common';
import { ClassroomService } from './classroom.service';

const existingClassroomName = "ExistingClassroom";


export const mockClassroomService: Partial<ClassroomService> = {
    
    findAll(){
        return Promise.resolve([{
            classroomName: "Java",
            classroomSize: 23
        }] as Classroom[])
    },
    create(classroom: Classroom): Promise<Classroom>{
        if(classroom.classroomName === existingClassroomName) {
            // throw new BadRequestError('classname in use')
        }
        return Promise.resolve(classroom as Classroom)
    },
    findOne(){
        return Promise.resolve({
            classroomName: "Java",
            classroomSize: 23
        } as Classroom)
    },
    update(){
        return Promise.resolve({
            classroomName: "Java",
            classroomSize: 23
        } as Classroom)
    },
    remove(){
        return Promise.resolve()
    }
}