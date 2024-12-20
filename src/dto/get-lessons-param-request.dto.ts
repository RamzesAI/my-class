import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class getLessonParamsRequestDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Matches(/^(\d{4}-\d{2}-\d{2})(,(\d{4}-\d{2}-\d{2}))?$/, {
    message: 'Invalid date format. Use YYYY-MM-DD or YYYY-MM-DD,YYYY-MM-DD.',
  })
  date: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Matches(/^\d+(,\d+)*$/, {
    message: 'teacherIds should be a comma-separated list of numbers.',
  })
  teacherIds: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Matches(/^\d+(,\d+)*$/, {
    message: 'teacherIds should be a comma-separated list of numbers.',
  })
  studentsCount: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  lessonsPerPage: number;
}
