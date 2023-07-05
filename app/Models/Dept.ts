import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Agent from "./Agent";

export default class Dept extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public deptName: string;

  @column()
  public domain: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @hasMany(() => Agent, {
    foreignKey: "dept_id",
  })
  public Agent: HasMany<typeof Agent>;
}
