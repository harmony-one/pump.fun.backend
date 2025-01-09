import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Token} from "./token.entity";
import {UserAccount} from "./user-account.entity";

@Entity({ name: 'liquidity_provisions' })
export class LiquidityProvision {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  txnHash: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  blockNumber: number;

  @ManyToOne(() => Token, {
    eager: true
  })
  token: Token

  @ManyToOne(() => UserAccount, {
    eager: true
  })
  tokenCreator: UserAccount

  @ApiProperty()
  @Column()
  pool: string;

  @ApiProperty()
  @Column()
  sender: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  tokenId: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  liquidity: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  actualTokenAmount: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  actualAssetAmount: string;

  @ApiProperty()
  @Column({ type: 'bigint' })
  timestamp: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
