import {
    BattleShipField,
    BattleShipFieldValueEnum,
    BattleShip,
    ShipCoordinate,
    ShipOrientationEnum
} from '@customTypes/battleShip';

import {
    isCoordOutOfBounds
} from '@helper/battleShip';

// check if all ships on field are placed in a valid way
// - no ships are overlapping
// - no ships are placed on a field that is already marked as a miss
const validateField = (
    ships: Array<BattleShip>,
    field: BattleShipField
): boolean => {
    if(!validateShipPlacement(ships, field)) {
        return false;
    }

    const isInvalid = ships.some(ship => {
        const doesShipFit = validateSingleShipOnField(ship, field);
        return !doesShipFit;
    });

    return !isInvalid;
}

// check if all ships are placed in a valid way, independent of the field
const validateShipPlacement = (
    ships: Array<BattleShip>,
    field: BattleShipField
): boolean => {
    const invalidCoords = new Set<number>();

    const isInvalid = ships.some(ship => {
        const shipCoords = getShipCoordinates(ship);
        const allCoords = getShipCoordinatesWithSurrounding(ship);

        // check if ship is not placed on invalid tiles
        const isInvalid = shipCoords.some(coord => {
            const index = (coord.y * field.width) + coord.x;
            return invalidCoords.has(index) || isCoordOutOfBounds(coord, field);
        });

        // mark ship as well as surrounding coords as invalid
        allCoords.forEach(coord => {
            if(!isCoordOutOfBounds(coord, field)) {
                const index = (coord.y * field.width) + coord.x;
                invalidCoords.add(index);
            }
        });

        return isInvalid;
    });

    return !isInvalid;
}


// check if a ship would fit on a field on an given field
const validateSingleShipOnField = (
    ship: BattleShip,
    field: BattleShipField
): boolean => {
    const coords = getShipCoordinates(ship);
    const isInvalid = coords.some(coord => {
        const index = (coord.y * field.width) + coord.x;
        return field.values[index] === BattleShipFieldValueEnum.MISS;
    });

    return !isInvalid;
}

const getShipCoordinates = (
    ship: BattleShip
): Array<ShipCoordinate> => {
    const coordinates: Array<ShipCoordinate> = [];

    const xMod = Number(ship.orientation === ShipOrientationEnum.HORIZONTAL);
    const yMod = Number(ship.orientation === ShipOrientationEnum.VERTICAL);

    for(let i = 0; i < ship.length; i++) {
        const x = ship.position.x + (i * xMod);
        const y = ship.position.y + (i * yMod);

        coordinates.push({ x, y });
    }

    return coordinates;
}

const getShipCoordinatesWithSurrounding = (
    ship: BattleShip
): Array<ShipCoordinate> => {
    const coordinates: Array<ShipCoordinate> = [];

    const xMod = Number(ship.orientation === ShipOrientationEnum.HORIZONTAL);
    const yMod = Number(ship.orientation === ShipOrientationEnum.VERTICAL);

    const xModReverse = yMod;
    const yModReverse = xMod;

    for(let j = -1; j <= 1; j++) {
        for(let i = -1; i < ship.length + 1; i++) {
            const x = ship.position.x + (i * xMod) + (j * xModReverse);
            const y = ship.position.y + (i * yMod) + (j * yModReverse);

            coordinates.push({ x, y });
        }
    }

    return coordinates;
}

const battleShipSolver = {
    validateField,
    validateShipPlacement,
    validateSingleShipOnField
}

export default battleShipSolver;