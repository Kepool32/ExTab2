import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vacancy } from '@vacancies/entities/vacancy.entity';

@Entity('favorites')
export class Favorite {
  @ApiProperty({ example: 1, description: 'Unique favorite identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Vacancy ID' })
  @Column({ type: 'int' })
  vacancyId: number;

  @ApiProperty({ type: () => Vacancy, description: 'Vacancy' })
  @ManyToOne(() => Vacancy, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vacancyId' })
  vacancy: Vacancy;

  @ApiProperty({ description: 'Date added to favorites' })
  @CreateDateColumn()
  createdAt: Date;
}
