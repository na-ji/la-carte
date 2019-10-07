import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
@ObjectType()
@Index('pokestop_latitude_longitude', ['latitude', 'longitude'])
export class Pokestop {
  @Field(type => ID)
  @PrimaryColumn({
    type: 'varchar',
    name: 'pokestop_id',
    length: 50
  })
  id: string;

  @Field(type => ID)
  @Column({
    type: 'tinyint',
    width: 1
  })
  enabled: boolean;

  @Field()
  @Column({ type: 'double' })
  latitude: number;

  @Field()
  @Column({ type: 'double' })
  longitude: number;

  @Field()
  @Column({ name: 'last_modified', type: 'datetime' })
  @Index('pokestop_last_modified')
  lastModified: Date;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  name?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  image?: string;

  @Field({ nullable: true })
  @Column({ name: 'lure_expiration', type: 'datetime', nullable: true })
  @Index('pokestop_lure_expiration')
  lureExpiration?: Date;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    name: 'active_fort_modifier',
    width: 6,
    nullable: true
  })
  @Index('pokestop_active_fort_modifier')
  activeFortModifier?: number;

  @Field({ nullable: true })
  @Column({ name: 'last_updated', type: 'datetime', nullable: true })
  @Index('pokestop_last_updated')
  lastUpdated?: Date;

  @Field({ nullable: true })
  @Column({ name: 'incident_start', type: 'datetime', nullable: true })
  incidentStart?: Date;

  @Field({ nullable: true })
  @Column({ name: 'incident_expiration', type: 'datetime', nullable: true })
  incidentExpiration?: Date;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    name: 'incident_grunt_type',
    width: 1,
    nullable: true
  })
  incidentGruntType?: number;
}
