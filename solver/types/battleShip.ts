export enum BattleShipFieldValue {
    EMPTY = ' ',
    HIT = 'X',
    MISS = '.'
}

export interface BattleShipField {
    height: number,
    width: number,
    values: Array<BattleShipFieldValue>
}

export interface ShipPosition {
    x: number,
    y: number
}

export enum ShipOrientation {
    HORIZONTAL = 'H',
    VERTICAL = 'V'
}

export interface BattleShip {
    position: ShipPosition,
    orientation: ShipOrientation,
    length: number,
    sunk: boolean
}