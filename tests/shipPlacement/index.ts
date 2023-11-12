import { expect, test, describe } from 'bun:test';

import solver from '@solver';
import {
    BattleShip,
    BattleShipField
} from '@customTypes/battleShip';

export default () => {
    const field4x4: BattleShipField = {
        height: 4,
        width: 4,
        values: [] // unused in this case, can be empty
    };

    const field6x6: BattleShipField = {
        height: 6,
        width: 6,
        values: [] // unused in this case, can be empty
    };

    const field1x5: BattleShipField = {
        height: 1,
        width: 5,
        values: [] // unused in this case, can be empty
    };

    const validPlacements4x4 : Array<BattleShip> = [
        { position: { x: 0, y: 0 }, length: 3, orientation: 'horizontal' },
        { position: { x: 2, y: 2 }, length: 2, orientation: 'vertical' },
        { position: { x: 0, y: 3 }, length: 1, orientation: 'vertical' }
    ];

    const validPlacements6x6 : Array<BattleShip> = [
        { position: { x: 0, y: 0 }, length: 4, orientation: 'horizontal' },
        { position: { x: 5, y: 0 }, length: 6, orientation: 'vertical' },
        { position: { x: 1, y: 3 }, length: 2, orientation: 'horizontal' },
        { position: { x: 1, y: 5 }, length: 1, orientation: 'horizontal' }
    ];

    const validPlacements1x5 : Array<BattleShip> = [
        { position: { x: 1, y: 0 }, length: 2, orientation: 'horizontal' },
        { position: { x: 4, y: 0 }, length: 1, orientation: 'horizontal' }
    ];

    const invalidOverlappingCornerPlacements6x6 : Array<BattleShip> = [
        ...validPlacements6x6,
        { position: { x: 3, y: 2 }, length: 1, orientation: 'horizontal' }
    ];

    const invalidOverlappingShipPlacements4x4 : Array<BattleShip> = [
        { position: { x: 1, y: 1 }, length: 3, orientation: 'vertical' },
        { position: { x: 0, y: 2 }, length: 3, orientation: 'horizontal' }
    ];

    describe('valid fields', () => {
        test('4x4 field', () => {
            const result4x4 = solver.validateShipPlacement(validPlacements4x4, field4x4);
            expect(result4x4).toBe(true);
        });

        test('6x6 field', () => {
            const resul6x6 = solver.validateShipPlacement(validPlacements6x6, field6x6);
            expect(resul6x6).toBe(true);
        });

        test('1x5 field', () => {
            const result1x5 = solver.validateShipPlacement(validPlacements1x5, field1x5);
            expect(result1x5).toBe(true);
        });
    });

    describe('out of bounds', () => {
        test('6x6 ships on 4x4 field', () => {
            const result = solver.validateShipPlacement(validPlacements6x6, field4x4);
            expect(result).toBe(false);
        });

        test('1x5 ships on 4x4 field', () => {
            const result = solver.validateShipPlacement(validPlacements1x5, field4x4);
            expect(result).toBe(false);
        });

        test('4x4 ships on 1x5 field', () => {
            const result = solver.validateShipPlacement(validPlacements4x4, field1x5);
            expect(result).toBe(false);
        });
    });

    describe('overlapping', () => {
        test('overlapping corner', () => {
            const result = solver.validateShipPlacement(invalidOverlappingCornerPlacements6x6, field6x6);
            expect(result).toBe(false);
        });

        test('overlapping ship', () => {
            const result = solver.validateShipPlacement(invalidOverlappingShipPlacements4x4, field4x4);
            expect(result).toBe(false);
        });
    });
}