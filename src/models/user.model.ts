import { Entity, PrimaryColumn, Column } from "typeorm";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export default class UserModel {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column()
  role: UserRoles;
}
