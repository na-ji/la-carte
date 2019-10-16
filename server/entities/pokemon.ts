import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
@ObjectType()
@Index('pokemon_latitude_longitude', ['latitude', 'longitude'])
@Index('pokemon_disappear_time_pokemon_id', ['disappearTime', 'pokemonId'])
export class Pokemon {
  @Field(type => ID)
  @PrimaryColumn({
    type: 'bigint',
    name: 'encounter_id',
    width: 20,
    unsigned: true
  })
  id: string;

  @Field(type => ID)
  @Column({
    type: 'bigint',
    name: 'spawnpoint_id',
    width: 20,
    unsigned: true
  })
  @Index('pokemon_spawnpoint_id')
  spawnpointId: string;

  @Field()
  @Column({ name: 'pokemon_id', type: 'smallint', width: 6 })
  @Index('pokemon_pokemon_id')
  pokemonId: number;

  @Field()
  @Column({ type: 'double' })
  latitude: number;

  @Field()
  @Column({ type: 'double' })
  longitude: number;

  @Field()
  @Column({ name: 'last_modified', type: 'datetime' })
  @Index('pokemon_last_modified')
  lastModified: Date;

  @Field()
  @Column({ name: 'disappear_time', type: 'datetime' })
  disappearTime: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'smallint', width: 6 })
  form?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'smallint', width: 6 })
  costume?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'smallint', width: 6 })
  cp?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'cp_multiplier', type: 'float' })
  cpMultiplier?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'smallint', width: 6 })
  gender?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'float' })
  height?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'float' })
  weight?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'individual_attack',
    type: 'smallint',
    width: 6
  })
  individualAttack?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'individual_defense',
    type: 'smallint',
    width: 6
  })
  individualDefense?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'individual_stamina',
    type: 'smallint',
    width: 6
  })
  individualStamina?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'move_1',
    type: 'smallint',
    width: 6
  })
  fastMove?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'move_2',
    type: 'smallint',
    width: 6
  })
  chargedMove?: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    name: 'weather_boosted_condition',
    type: 'smallint',
    width: 6
  })
  weatherBoostedCondition?: number;
}
