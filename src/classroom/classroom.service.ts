import {Model} from 'mongoose'
import {  HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { updateProperties } from '../utils/functions';
import { Classroom,ClassroomDocument} from '../classroom/schemas/classroom.schema';

@Injectable()
export class ClassroomService {
  constructor(@InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>) {}
  
  private readonly logger = new Logger(ClassroomService.name)

  async create(classroom: Classroom) {
    try{
      const doc:ClassroomDocument = new this.classroomModel(classroom)
      const savedDoc: ClassroomDocument = await doc.save();
      
      // done in plugin:
      delete(savedDoc._id)
      delete(savedDoc.__v)

      const result: Classroom = (savedDoc.toObject() as Classroom)
      
      this.logger.log("classroom created")
      return result;
    } catch(err){
      switch(err.code){
        case(11000): {
          throw new HttpException('Classroom already exists', HttpStatus.CONFLICT )
        }
        default: {
          throw new Error()
        }

      }
     throw(err);
    }
  }

  async findAll(): Promise<Classroom[]> {
    const doc:ClassroomDocument[] = await this.classroomModel.find().select('-_id -__v ').exec();
    
    const classrooms: Classroom[] = doc.map((document: ClassroomDocument) => {
      const classroom: Classroom = (document.toObject() as Classroom);
      return classroom as Classroom
    })
    return classrooms
  }

  async findOne({classroomName}: {classroomName:string}): Promise<Classroom> {
    const doc: ClassroomDocument = await this.classroomModel.findOne({classroomName}).exec();
    const classroom: Classroom = (doc.toObject() as Classroom);
    return classroom
  }

  
  async update(classroomName: string, classroom: Classroom): Promise<Classroom> {

    const classroomDoc: ClassroomDocument = await this.classroomModel.findOne({classroomName})
    if(!classroomDoc){
      throw new Error('document not found')
    }

    updateProperties<Classroom>(classroom , (classroomDoc as Classroom))

    const doc: ClassroomDocument = await classroomDoc.save()
    
    return(doc.toObject() as Classroom)
  }

  async remove({classroomName}:{classroomName: string}): Promise<void> {
    await this.classroomModel.deleteOne({classroomName}).exec();
    return
  }
}
