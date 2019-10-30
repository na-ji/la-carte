import { Field } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'gymdetails' })
export class GymDetails {
  @PrimaryColumn({
    type: 'varchar',
    name: 'gym_id',
    length: 50
  })
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 191
  })
  name: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'description',
    nullable: true,
    length: 191
  })
  description?: string;

  @Column({
    type: 'varchar',
    name: 'url',
    length: 191
  })
  url: string;

  hasUrl(): boolean {
    return this.url !== '';
  }

  @Column({ name: 'last_scanned', type: 'datetime' })
  lastScanned: Date;
}
