import React, { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { months } from '../data/months';

export const SearchComponent = ({ setMonthYear }) => {
    const [searchMonth, setSearchMonth] = useState({ value: 'JAN' });
    const { searchYear, onInputChange } = useForm({ searchYear: '2020' });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setMonthYear(searchMonth, searchYear);
    };

    const onSelectChange = (e) => {
        setSearchMonth(() => ({
            value: e.target.value,
        }));
    };

    return (
        <form aria-label="form" onSubmit={onSearchSubmit}>
            <div className="row mt-4">
                <div className="col">
                    <select
                        value={searchMonth.value}
                        className="form-control"
                        onChange={onSelectChange}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <input
                        type="number"
                        placeholder="Year"
                        className="form-control"
                        name="searchYear"
                        autoComplete="off"
                        value={searchYear}
                        onChange={onInputChange}
                        required={true}
                    />
                </div>
                <div className="col">
                    <button className="btn btn-outline-primary">Search</button>
                </div>
            </div>
        </form>
    );
};
