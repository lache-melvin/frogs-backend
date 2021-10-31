import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Frog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;
}
