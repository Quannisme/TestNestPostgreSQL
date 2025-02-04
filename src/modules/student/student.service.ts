import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const courses = await this.courseRepository.findByIds(
      createStudentDto.courses.map((course) => course.id),
    );

    const student = this.studentRepository.create({
      name: createStudentDto.name,
      age: createStudentDto.age,
      email: createStudentDto.email,
      courses,
    });
    console.log('s', student);
    const temp = await this.studentRepository.save(student);
    console.log(temp);
    return temp;
  }

  async findAll() {
    // return await this.studentRepository.find({
    //   relations: {
    //     courses: true,
    //   },
    // });
    return await this.studentRepository.find({
      select: {
        courses: {
          name: true,
        },
      },
      relations: {
        courses: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: string) {
    const temp = await this.studentRepository.delete(id);
  }
}
