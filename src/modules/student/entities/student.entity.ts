import { Course } from 'src/modules/course/entities/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;
  @Column({ name: 'studentName', type: 'varchar' })
  name: string;
  @Column({ name: 'studentAge', type: 'int' })
  age: number;
  @Column({ name: 'studentEmail', type: 'varchar' })
  email: string;
  @Column({ name: 'image', type: 'varchar' })
  image: string;
  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: 'student_course',
    joinColumns: [{ name: 'student_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'course_id', referencedColumnName: 'id' }],
  })
  courses: Course[];
}
