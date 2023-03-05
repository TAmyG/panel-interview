import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { SearchComponent } from '../../../../feature/wildfire/components/SearchComponent';

const mockedSetMonthYear = vi.fn();

describe('Testing on <SearchComponent/>', () => {
    test('should match with the snapshot', () => {
        const result = render(
            <SearchComponent setMonthYear={mockedSetMonthYear} />
        );
        expect(result).toMatchSnapshot();
    });

    test('should calls setMonthYear with default values', async () => {
        render(<SearchComponent setMonthYear={mockedSetMonthYear} />);
        const form = screen.getByRole('form');
        const year = screen.getByLabelText('year');

        fireEvent.submit(form);

        expect(mockedSetMonthYear).toHaveBeenCalledWith(
            { value: 'JAN' },
            '2020'
        );
    });

    test('should calls setMonthYear with set values', async () => {
        const yearValue = '2022';
        const monthValue = { value: 'FEB' };
        render(<SearchComponent setMonthYear={mockedSetMonthYear} />);

        const form = screen.getByRole('form');
        const year = screen.getByLabelText('year');
        const month = screen.getByLabelText('month');
        const options = screen.getAllByTestId('select-option');

        fireEvent.input(year, { target: { value: yearValue } });
        fireEvent.change(month, { target: monthValue });
        fireEvent.submit(form);

        expect(mockedSetMonthYear).toHaveBeenCalledWith(monthValue, yearValue);
        expect(options[1].selected).toBeTruthy();
    });
});
