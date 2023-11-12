import { type } from "os";

export enum BattleShipFieldValueEnum {
    EMPTY = ' ',
    HIT = 'x',
    MISS = '.'
}

export type BattleShipFieldValue = `${BattleShipFieldValueEnum}`;

export interface BattleShipField {
    height: number,
    width: number,
    values: Array<BattleShipFieldValue>
}

export interface ShipCoordinate {
    x: number,
    y: number
}

export enum ShipOrientationEnum {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export type ShipOrientation = `${ShipOrientationEnum}`;

export interface BattleShip {
    position: ShipCoordinate,
    orientation: ShipOrientation,
    length: number
}