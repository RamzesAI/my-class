import { Injectable } from '@nestjs/common';
import { getLessonParamsRequestDto } from './dto/get-lessons-param-request.dto';
import { Op, Sequelize } from 'sequelize';
import { Lesson } from './models/lesson.model';

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

    if (teacherIds && teacherIds.length > 0) {
      const teacherIdsArray = teacherIds
        .split(',')
        .map((id) => parseInt(id, 10));
      where['id'] = {
        [Op.in]: Sequelize.literal(`(
          SELECT "lessonId"
          FROM lessons_teachers
          WHERE "teacherId" IN (${teacherIdsArray.join(',')})
        )`),
      };
    }

    if (studentsCount) {
      const studentsCountRange = studentsCount.split(',');
      if (studentsCountRange.length === 1) {
        where['studentsCount'] = parseInt(studentsCountRange[0], 10);
      } else if (studentsCountRange.length === 2) {
        where['studentsCount'] = {
          [Op.between]: [
            parseInt(studentsCountRange[0], 10),
            parseInt(studentsCountRange[1], 10),
          ],
        };
      }
    }

    return Lesson.findAll({
      where,
      limit: lessonsPerPage,
      offset: (page - 1) * lessonsPerPage,
    });
  }
}
