import React from 'react';
import { useState } from 'react';
import { SearchComponent, WildfiresEvents } from '../components';

export const SearchPage = () => {
    const [searchInfo, setSearchInfo] = useState(null);

    const setMonthYear = ({ value }, year) => {
        setSearchInfo({ month: value, year });
    };

    return (
        <>
            <SearchComponent setMonthYear={setMonthYear} />
            <div className="mt-4">
                {searchInfo && <WildfiresEvents {...searchInfo} />}
            </div>
        </>
    );
};
