import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { WildfiresEvents } from '../../../../feature/wildfire/components/WildfiresEvents';
import { useFetchWildfiresGql } from '../../../../feature/wildfire/hooks/useFetchWildfiresGql';

vi.mock('../../../../feature/wildfire/hooks/useFetchWildfiresGql');

describe('Testing on <WildfiresEvents/>', () => {
    const props = {
        month: 'FEB',
        year: '2018',
    };
    test('should be Loading', () => {
        useFetchWildfiresGql.mockReturnValue([
            [], //wildires
            true, //isLoading
            false, //ohNo
        ]);
        render(<WildfiresEvents {...props} />);

        expect(screen.getByText('Loading...'));
    });

    test('should shows "Oh No!" message', () => {
        useFetchWildfiresGql.mockReturnValue([
            [], //wildires
            false, //isLoading
            true, //ohNo
        ]);
        render(<WildfiresEvents {...props} />);

        expect(screen.getByText('Oh No!'));
    });

    test('should renders events table', () => {
        useFetchWildfiresGql.mockReturnValue([
            [
                {
                    id: '',
                    title: '',
                    geometry: [
                        {
                            date: '',
                            geoComponent: {
                                ISO3166Alpha3: '',
                            },
                        },
                    ],
                },
            ], //wildires
            false, //isLoading
            false, //ohNo
        ]);

        render(<WildfiresEvents {...props} />);

        expect(screen.getByRole('table'));
    });
});
