import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose'
import {Classroom} from '../../classroom/schemas/classroom.schema'

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop()
    privateName: string;

    @Prop({String, ref: 'Classroom'})
    classroom: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student)