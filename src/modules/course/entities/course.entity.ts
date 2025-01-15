import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;
  @Column({ name: 'nameClass', type: 'varchar' })
  name: string;
  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
