import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, column, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Dept from './Dept'

export default class Agent extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public deptId: number;

  @belongsTo(() => Dept, {
    foreignKey: "dept_id",
  })
  public Dept: BelongsTo<typeof Dept>;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
