import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Student } from './student.model';

@Table({ tableName: 'lesson_students', timestamps: false })
export class LessonStudents extends Model<LessonStudents> {
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lesson_id: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  student_id: number;

  @Column({ type: DataType.BOOLEAN })
  visit: boolean;
}
