import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { getLessonParamsRequestDto } from './dto/get-lessons-param-request.dto';

@Controller('lessons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLessons(@Query() params: getLessonParamsRequestDto) {
    return this.appService.getLessons(params);
  }
}
