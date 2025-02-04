import { Course } from 'src/modules/course/entities/course.entity';
import { MessageName } from './../../../../node_modules/pg-protocol/src/messages';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Required string' })
  @Matches(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
    message: 'Required first letter upper case',
  })
  @IsNotEmpty({ message: 'Required' })
  name: string;
  @Max(50, { message: 'Max 50' })
  @Min(18, { message: 'Min 18' })
  @IsNumber({}, { message: 'Required number' })
  @IsNotEmpty({ message: 'Required age' })
  age: number;
  @IsString({ message: 'Required string' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email',
  })
  @IsNotEmpty({ message: 'Required' })
  email: string;
  @IsNotEmpty({ message: 'Required image' })
  image: string;
  @IsNotEmpty({ message: 'Required Courses' })
  courses: { id: string }[];
}
