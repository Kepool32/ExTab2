import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vacancies')
export class Vacancy {
  @ApiProperty({ example: 1, description: 'Unique vacancy identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Senior Frontend Developer', description: 'Vacancy title' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'User interface development', description: 'Vacancy description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'Moscow', description: 'Location' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ApiProperty({ example: '150000 - 250000', description: 'Salary' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  salary: string;

  @ApiProperty({ example: '3+ years of experience', description: 'Requirements' })
  @Column({ type: 'text', nullable: true })
  requirements: string;

  @ApiProperty({ example: 'JavaScript, React, TypeScript', description: 'Skills' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  skills: string;

  @ApiProperty({ example: 'Full-time', description: 'Employment type' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  employmentType: string;

  @ApiProperty({ example: 'IT, Development', description: 'Category' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}
