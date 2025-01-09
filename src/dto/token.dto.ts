import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsOptional, IsString} from 'class-validator';
import {Transform, Type} from "class-transformer";
import {SortOrder} from "../types";

// List of sortable props from TokenEntity
enum SortField {
  timestamp = 'timestamp',
  marketCap = 'marketCap',
  lastComment = 'lastComment',
  lastTrade = 'lastTrade'
}

export class GetTokensDto {
  @ApiProperty({ type: String, required: false, default: '' })
  // @Type(() => String)
  // @IsString()
  search?: string;

  @ApiProperty({ type: String, required: false, default: '' })
  @IsOptional()
  symbol?: string;

  @ApiProperty({ type: Boolean, required: false })
  isWinner?: boolean;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  competitionId?: number;

  @ApiProperty({ type: Number, required: false, default: '100' })
  // @Transform((limit) => limit.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: Number, required: false, default: '0' })
  // @Transform((offset) => offset.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  offset?: number;

  @ApiProperty({ enum: SortField, required: false })
  @IsOptional()
  @IsEnum(SortField, { message: `Sort field must be one of ${Object.keys(SortField).join(',')}` })
  sortingField?: SortField;

  @ApiProperty({ enum: SortOrder, required: false })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be ASC or DESC' })
  sortingOrder?: SortOrder;
}

export class GetTokenBalancesDto {
  @ApiProperty({ type: String, required: false })
  // @Type(() => String)
  @IsString()
  @IsOptional()
  tokenAddress?: string;

  @ApiProperty({ type: String, required: false })
  // @Type(() => String)
  @IsString()
  @IsOptional()
  userAddress?: string;

  @ApiProperty({ type: Number, required: false, default: '100' })
  // @Transform((limit) => limit.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: Number, required: false, default: '0' })
  // @Transform((offset) => offset.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  offset: number;
}

export class GetTokenWinnersDto {
  @ApiProperty({ type: Number, required: false, default: '100' })
  // @Transform((limit) => limit.value.toNumber())
  @Type(() => String)
  @IsString()
  limit: number;

  @ApiProperty({ type: Number, required: false, default: '0' })
  // @Transform((offset) => offset.value.toNumber())
  @Type(() => String)
  @IsString()
  offset: number;
}

export class GetTokenBurnsDto {
  @ApiProperty({ type: String, required: true })
  @Transform((address) => address ? address.value.trim().toLowerCase() : address)
  @Type(() => String)
  @IsString()
  tokenAddress: string;

  @ApiProperty({ type: String, required: false })
  @Transform((address) => address ? address.value.trim().toLowerCase() : address)
  @Type(() => String)
  @IsString()
  @IsOptional()
  userAddress?: string;

  @ApiProperty({ type: Number, required: false, default: '100' })
  // @Transform((limit) => limit.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: Number, required: false, default: '0' })
  // @Transform((offset) => offset.value.toNumber())
  @Type(() => String)
  @IsString()
  @IsOptional()
  offset: number;
}
