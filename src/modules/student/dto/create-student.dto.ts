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
  @IsNotEmpty({ message: 'Required' })
  @IsString({ message: 'Required string' })
  @Matches(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
    message: 'Required first letter upper case',
  })
  name: string;
  @IsNotEmpty({ message: 'Required' })
  @IsNumber({}, { message: 'Required number' })
  @Max(50, { message: 'Max 50' })
  @Min(18, { message: 'Min 18' })
  age: number;
  @IsNotEmpty({ message: 'Required' })
  @IsString({ message: 'Required string' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email',
  })
  email: string;
  @IsNotEmpty({ message: 'Required' })
  courses: number;
}
