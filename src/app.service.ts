import { Injectable } from '@nestjs/common';
import { getLessonParamsRequestDto } from './dto/get-lessons-param-request.dto';
import { Op, Sequelize } from 'sequelize';
import { Lesson } from './models/lesson.model';
import { Student } from './models/student.model';
import { Teacher } from './models/teacher.model';

@Injectable()
export class AppService {
  async getLessons(params: getLessonParamsRequestDto) {
    const {
      date,
      status,
      teacherIds,
      studentsCount,
      page = 1,
      lessonsPerPage = 5,
    } = params;

    const where = {};

    if (date) {
      const dates = date.split(',');
      if (dates.length === 1) {
        where['date'] = dates[0];
      } else if (dates.length === 2) {
        where['date'] = { [Op.between]: [dates[0], dates[1]] };
      }
    }

    if (status) {
      where['status'] = status;
    }

    let teacherWhere = {};
    if (teacherIds && teacherIds.length > 0) {
      const teacherIdsArray = teacherIds
        .split(',')
        .map((id) => parseInt(id, 10));
      teacherWhere = {
        id: { [Op.in]: teacherIdsArray },
      };
    }

    const lessons = await Lesson.findAll({
      where,
      attributes: [
        'id',
        'date',
        'title',
        'status',
        [
          Sequelize.fn('COUNT', Sequelize.col('students.LessonStudents.visit')),
          'visitCount',
        ],
      ],
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
          through: {
            attributes: ['visit'],
          },
        },
        {
          model: Teacher,
          where: teacherWhere,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
      group: [
        '"Lesson"."id"',
        '"Lesson"."date"',
        '"Lesson"."title"',
        '"Lesson"."status"',
        '"students"."id"',
        '"students"."name"',
        '"students->LessonStudents"."lesson_id"',
        '"students->LessonStudents"."student_id"',
        '"students->LessonStudents"."visit"',
        '"teachers"."id"',
        '"teachers"."name"',
        '"teachers->LessonTeachers"."lesson_id"',
        '"teachers->LessonTeachers"."teacher_id"',
      ],
    });

    const startIndex = (+page - 1) * +lessonsPerPage;
    const paginatedLessons = lessons.slice(
      startIndex,
      +startIndex + +lessonsPerPage,
    );

    let studentsCountArray;
    let filteredLessons;

    if (studentsCount) {
      studentsCountArray = studentsCount
        .split(',')
        .map((num) => parseInt(num, 10));

      filteredLessons = paginatedLessons.filter((lesson) => {
        const studentCount = lesson.students.length;

        if (studentsCountArray.length === 1) {
          return studentCount === studentsCountArray[0];
        }

        if (studentsCountArray.length === 2) {
          const [minCount, maxCount] = studentsCountArray;
          return studentCount >= minCount && studentCount <= maxCount;
        }
        return false;
      });
      return filteredLessons;
    }

    return paginatedLessons;
  }
}
