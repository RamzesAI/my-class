import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Lesson } from './models/lesson.model';
import { Teacher } from './models/teacher.model';
import { LessonTeachers } from './models/lesson-teacher.model';
import { LessonStudents } from './models/lesson-student.model';
import { Student } from './models/student.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Lesson, Teacher, LessonTeachers, Student, LessonStudents],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([
      Lesson,
      Teacher,
      LessonTeachers,
      Student,
      LessonStudents,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
