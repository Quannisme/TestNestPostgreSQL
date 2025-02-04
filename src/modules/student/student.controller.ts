import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  NotFoundException,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Received file:', file);
    console.log('Received data:', createStudentDto);
    // return this.studentService.create(createStudentDto);
    return;
  }

  @Get()
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    console.log('1', id, res);
    const temp = await this.studentService.remove(id);
    return res.status(200).json({ message: 'success' });
  }
}
