import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VacationRequest } from "./VacationRequest";

export enum UserRole {
  Requester = "Requester",
  Validator = "Validator",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @OneToMany(() => VacationRequest, (request) => request.user)
  vacationRequests: VacationRequest[];
}