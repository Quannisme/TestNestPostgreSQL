import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      name: createStudentDto.name,
      age: createStudentDto.age,
      email: createStudentDto.email,
      courses: [{ id: createStudentDto.courses }],
    });
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
          id: true,
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

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}