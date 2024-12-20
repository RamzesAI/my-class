import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';

@Table({ tableName: 'lessons_teachers', createdAt: false, updatedAt: false })
export class LessonTeachers extends Model<LessonTeachers> {
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lessonId: number;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.INTEGER })
  teacherId: number;
}
