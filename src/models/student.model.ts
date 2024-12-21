import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { LessonStudents } from './lesson-student.model';

@Table({ tableName: 'students', timestamps: false })
export class Student extends Model<Student> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Lesson, () => LessonStudents)
  lessons: Lesson[];
}
