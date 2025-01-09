import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734856972465 implements MigrationInterface {
    name = 'InitialMigration1734856972465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "tokenId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trades_type_enum" AS ENUM('buy', 'sell')`);
        await queryRunner.query(`CREATE TABLE "trades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "type" "public"."trades_type_enum" NOT NULL, "amountIn" numeric NOT NULL, "amountOut" numeric NOT NULL, "price" double precision NOT NULL DEFAULT '0', "fee" numeric NOT NULL, "timestamp" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "tokenId" uuid, CONSTRAINT "PK_c6d7c36a837411ba5194dc58595" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "competitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "competitionId" integer NOT NULL, "timestampStart" bigint NOT NULL, "timestampEnd" bigint, "isCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "winnerTokenId" uuid, CONSTRAINT "REL_1cabb773c3ab1758cde24755fa" UNIQUE ("winnerTokenId"), CONSTRAINT "PK_ef273910798c3a542b475e75c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "address" character varying NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "uri" character varying NOT NULL, "uriData" json, "timestamp" bigint NOT NULL, "totalSupply" numeric NOT NULL DEFAULT '0', "price" double precision NOT NULL DEFAULT '0', "marketCap" double precision NOT NULL DEFAULT '0', "isWinner" boolean NOT NULL DEFAULT false, "isEnabled" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "competitionId" uuid, "userId" uuid, CONSTRAINT "UQ_60d4ed8a9af53cecc343b27ae52" UNIQUE ("txnHash"), CONSTRAINT "UQ_8887c0fb937bc0e9dc36cb62f35" UNIQUE ("address"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b0ec0293d53a1385955f9834d5c" UNIQUE ("address"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "indexer_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blockNumber" integer NOT NULL, CONSTRAINT "PK_186a04c706e20d425992635168a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token_burns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "burnedAmount" numeric NOT NULL, "fee" numeric NOT NULL, "mintedAmount" numeric NOT NULL, "timestamp" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "tokenId" uuid, "winnerTokenId" uuid, CONSTRAINT "UQ_55b31cf9e5c929505080921faea" UNIQUE ("txnHash"), CONSTRAINT "PK_f500ae7d0285eb8f2b687445791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token_balances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric NOT NULL DEFAULT '0', "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "tokenId" uuid, CONSTRAINT "PK_e12dc361a93cf25efa25d0a4cdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "signin_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "nonce" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_626ec9008e03c717f7893754c14" UNIQUE ("address"), CONSTRAINT "PK_9e7302d6c7bbe2be62cc3bba8c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "liquidity_provisions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "txnHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "pool" character varying NOT NULL, "sender" character varying NOT NULL, "tokenId" uuid NOT NULL, "liquidity" numeric NOT NULL, "actualTokenAmount" numeric NOT NULL, "actualAssetAmount" numeric NOT NULL, "timestamp" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenCreatorId" uuid, CONSTRAINT "PK_76db53f9e158c75e076280ca51e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_a1a9159cff0915f608ecd694fa5" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trades" ADD CONSTRAINT "FK_b09eef25e1f2cc0ca543e80fbe6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trades" ADD CONSTRAINT "FK_65e5e3d2a8d1700f7f893855bd6" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competitions" ADD CONSTRAINT "FK_1cabb773c3ab1758cde24755fa2" FOREIGN KEY ("winnerTokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_27d5e8fdc5b3b397885dd9eb57d" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token_burns" ADD CONSTRAINT "FK_a3d57eb40befb6d4198b66c7d86" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token_burns" ADD CONSTRAINT "FK_9d17a9475853ae38ae220871cbf" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token_burns" ADD CONSTRAINT "FK_7a473a60ecad51ea32e3031270a" FOREIGN KEY ("winnerTokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token_balances" ADD CONSTRAINT "FK_a9f4195c452704e9fe3064197aa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token_balances" ADD CONSTRAINT "FK_d46c04b920313214b5b405d84b3" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liquidity_provisions" ADD CONSTRAINT "FK_6151e0c4e7b5ea4d020a9ac1915" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liquidity_provisions" ADD CONSTRAINT "FK_b418e0f4cd84fb881aef5b178df" FOREIGN KEY ("tokenCreatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "liquidity_provisions" DROP CONSTRAINT "FK_b418e0f4cd84fb881aef5b178df"`);
        await queryRunner.query(`ALTER TABLE "liquidity_provisions" DROP CONSTRAINT "FK_6151e0c4e7b5ea4d020a9ac1915"`);
        await queryRunner.query(`ALTER TABLE "token_balances" DROP CONSTRAINT "FK_d46c04b920313214b5b405d84b3"`);
        await queryRunner.query(`ALTER TABLE "token_balances" DROP CONSTRAINT "FK_a9f4195c452704e9fe3064197aa"`);
        await queryRunner.query(`ALTER TABLE "token_burns" DROP CONSTRAINT "FK_7a473a60ecad51ea32e3031270a"`);
        await queryRunner.query(`ALTER TABLE "token_burns" DROP CONSTRAINT "FK_9d17a9475853ae38ae220871cbf"`);
        await queryRunner.query(`ALTER TABLE "token_burns" DROP CONSTRAINT "FK_a3d57eb40befb6d4198b66c7d86"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_27d5e8fdc5b3b397885dd9eb57d"`);
        await queryRunner.query(`ALTER TABLE "competitions" DROP CONSTRAINT "FK_1cabb773c3ab1758cde24755fa2"`);
        await queryRunner.query(`ALTER TABLE "trades" DROP CONSTRAINT "FK_65e5e3d2a8d1700f7f893855bd6"`);
        await queryRunner.query(`ALTER TABLE "trades" DROP CONSTRAINT "FK_b09eef25e1f2cc0ca543e80fbe6"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_a1a9159cff0915f608ecd694fa5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "liquidity_provisions"`);
        await queryRunner.query(`DROP TABLE "signin_requests"`);
        await queryRunner.query(`DROP TABLE "token_balances"`);
        await queryRunner.query(`DROP TABLE "token_burns"`);
        await queryRunner.query(`DROP TABLE "indexer_state"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "competitions"`);
        await queryRunner.query(`DROP TABLE "trades"`);
        await queryRunner.query(`DROP TYPE "public"."trades_type_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
