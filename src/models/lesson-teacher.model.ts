import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';

@Table({ tableName: 'lesson_teachers', timestamps: false })
export class LessonTeachers extends Model<LessonTeachers> {
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lesson_id: number;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.INTEGER })
  teacher_id: number;
}
