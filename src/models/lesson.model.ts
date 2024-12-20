import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { LessonTeachers } from './lesson-teacher.model';
import { Student } from './student.model';
import { LessonStudents } from './lesson-student.model';

@Table({ tableName: 'lessons' })
export class Lesson extends Model<Lesson> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  status: number;

  @BelongsToMany(() => Teacher, () => LessonTeachers)
  teachers: Teacher[];

  @BelongsToMany(() => Student, () => LessonStudents)
  students: Student[];
}
