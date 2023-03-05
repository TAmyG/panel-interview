import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { Wildfire } from '../../../../feature/wildfire/components/Wildfire';

const props = {
    title: 'Fire event',
    index: 1,
    geometry: [
        {
            date: '2023-03-6',
            geoComponent: {
                ISO3166Alpha3: 'CAN',
            },
        },
    ],
};

describe('Testing on <Wildfire/>', () => {
    test('should match with the snapshot', () => {
        const result = render(<Wildfire {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('should not render date value', async () => {
        const { geometry, ...newProps } = props;
        newProps.geometry = [
            {
                geoComponent: {
                    ISO3166Alpha3: 'CAN',
                },
            },
        ];
        render(<Wildfire {...newProps} />);
        const dateTd = await screen.findAllByLabelText('td');

        expect(dateTd[2].textContent).not.toBeTruthy();
    });
});
