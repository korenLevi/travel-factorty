import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum RequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

@Entity()
export class VacationRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.vacationRequests)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: "enum", enum: RequestStatus, default: RequestStatus.Pending })
  status: RequestStatus;

  @Column({ nullable: true })
  comments: string;

  @CreateDateColumn()
  createdAt: Date;
}