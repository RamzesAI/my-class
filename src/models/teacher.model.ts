import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { LessonTeachers } from './lesson-teacher.model';

@Table({ tableName: 'teachers', timestamps: false })
export class Teacher extends Model<Teacher> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Lesson, () => LessonTeachers)
  lessons: Lesson[];
}
