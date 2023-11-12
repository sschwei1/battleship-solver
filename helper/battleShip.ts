import {
    BattleShipField,
    ShipCoordinate
} from '@customTypes/battleShip'

export const isCoordOutOfBounds = (coord: ShipCoordinate, field: BattleShipField): boolean => {
    const outOfBounds =
        coord.x < 0 || coord.x >= field.width ||
        coord.y < 0 || coord.y >= field.height;

    return outOfBounds;
}