import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Token} from "./token.entity";
import {TradeType} from "../types";
import {UserAccount} from "./user-account.entity";
import Decimal from "decimal.js";

class ColumnNumericTransformer {
  to(data: string): string {
    return data;
  }
  from(data: number): string {
    return data ? new Decimal(data).toFixed() : '0'
  }
}

@Entity({ name: 'trades' })
export class Trade {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  txnHash: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  blockNumber: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: TradeType })
  type: TradeType;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.trades, {
    eager: true
  })
  user: UserAccount

  @ManyToOne(() => Token, (token) => token.trades, {
    eager: true
  })
  token: Token

  @ApiProperty()
  @Column({ type: 'decimal' })
  amountIn: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  amountOut: string;

  @ApiProperty()
  @Column({ type: 'double precision', default: 0, transformer: new ColumnNumericTransformer() })
  price: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  fee: string;

  @ApiProperty()
  @Column({ type: 'bigint' })
  timestamp: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
