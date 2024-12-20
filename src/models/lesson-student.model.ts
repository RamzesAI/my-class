import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Student } from './student.model';

@Table({ tableName: 'lessons_students', createdAt: false, updatedAt: false })
export class LessonStudents extends Model<LessonStudents> {
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lessonId: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @Column({ type: DataType.BOOLEAN })
  visit: boolean;
}
