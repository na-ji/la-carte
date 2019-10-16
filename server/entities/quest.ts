import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity({ name: 'trs_quest' })
@ObjectType()
export class Quest {
  @Field(type => ID)
  @PrimaryColumn({
    type: 'varchar',
    name: 'GUID',
    length: 50
  })
  id: string;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_type',
    width: 3
  })
  @Index('quest_type')
  type: number;

  @Field()
  @Column({
    type: 'int',
    name: 'quest_timestamp',
    width: 11
  })
  timestamp: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_stardust',
    width: 4
  })
  stardust: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_pokemon_id',
    width: 4
  })
  pokemonId: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_reward_type',
    width: 3
  })
  rewardType: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_item_id',
    width: 3
  })
  itemId: number;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_item_amount',
    width: 2
  })
  itemAmount: number;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_target',
    width: 3
  })
  target: number;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_condition',
    length: 500,
    nullable: true
  })
  condition?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_reward',
    length: 1000,
    nullable: true
  })
  reward?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_template',
    length: 100,
    nullable: true
  })
  template?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_task',
    length: 150,
    nullable: true
  })
  task?: string;
}
