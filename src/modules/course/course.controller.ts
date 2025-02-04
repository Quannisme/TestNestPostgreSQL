import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
  Res,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Response } from 'express';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/create-course')
  async create(
    @Body() createCourseDto: Course,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('boday', req.body);
    const temp = await this.courseService.create(createCourseDto);
    if (!temp) {
      return res.status(404).json({ message: 'Error creating' });
    }
    res.status(201).json({ message: 'Success', data: temp });
  }

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
