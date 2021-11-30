import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { removeIdPlugin} from './removeId'
export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
  @Prop()
  classroomSize!: number;

  @Prop({
    unique: true
  })
  classroomName!: string;

}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
ClassroomSchema.plugin(removeIdPlugin);
/**
 * CustomerSchema.virtual('fullName')
.set(function (fullName: string) {
  const [firstName, lastName] = fullName.split(' ');
  this.set({ firstName, lastName });
})
.get(function() {
  return `${this.firstName} ${this.lastName}`;
});
 * 
 */