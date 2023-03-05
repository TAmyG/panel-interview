import { useEffect, useState } from 'react';
import { getWilfires } from '../helpers/getWildfires';
import { getWildfiresGql } from '../helpers/getWildfiresGql';
/**
 * Retrieves wildfires from backend sending month and year
 * @param {Format MMM} month
 * @param {Format YYYY} year
 */
export const useFetchWildfiresGql = (month = 'JAN', year = '2020') => {
    const [wildfires, setWildfires] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ohNo, setOhNo] = useState(false);

    const getWilfiresFromBackend = async () => {
        // When the user search by second time, isLoading is false. So if a new request is triggered change isLoading to true
        // to show the user that a new search is in progress
        if (isLoading === false) {
            setIsLoading(true);
        }
        const newWildfires = await getWildfiresGql(month, year);
        setWildfires(newWildfires.events);
        setIsLoading(false);

        if (newWildfires.events.length < 1) {
            setOhNo(true);
        } else {
            setOhNo(false);
        }
    };

    /**
     * When a React Component call the hook getLWildfiresFromBackend could execute many times
     * to prevent that, useEffect is implemented below and it will trigger when month or year change
     */
    useEffect(() => {
        getWilfiresFromBackend();
    }, [month, year]);

    return [wildfires, isLoading, ohNo];
};
