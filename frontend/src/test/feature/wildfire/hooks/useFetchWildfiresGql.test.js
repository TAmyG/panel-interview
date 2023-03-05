import {
    render,
    screen,
    fireEvent,
    renderHook,
    waitFor,
} from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useFetchWildfiresGql } from '../../../../feature/wildfire/hooks/useFetchWildfiresGql';

describe('Testing on useFetchWildfiresGql', () => {
    test('should return initial state', () => {
        const { result } = renderHook(() =>
            useFetchWildfiresGql('FEB', '2020')
        );
        const [wildfires, isLoading, ohNo] = result.current;

        expect(wildfires.length).toBe(0);
        expect(isLoading).toBeTruthy();
        expect(ohNo).toBeFalsy();
    });

    test('should return wildfires', async () => {
        const { result } = renderHook(() =>
            useFetchWildfiresGql('FEB', '2020')
        );

        await waitFor(
            () => expect(result.current[0].length).toBeGreaterThan(0),
            { timeout: 10000 }
        );

        const [wildfires, isLoading, ohNo] = result.current;

        expect(wildfires.length).toBeGreaterThan(0);
        expect(isLoading).toBeFalsy();
        expect(ohNo).toBeFalsy();
    });
});
