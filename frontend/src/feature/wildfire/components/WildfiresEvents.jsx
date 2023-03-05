import React from 'react';
import PropTypes from 'prop-types';
import { useFetchWildfires } from '../hooks/useFetchWildfires';
import { Wildfire } from './Wildfire';

export const WildfiresEvents = ({ month, year }) => {
    const [wildfires, isLoading, ohNo] = useFetchWildfires(month, year);
    return (
        <>
            {isLoading && <h1>Loading...</h1>}

            {!isLoading &&
                (ohNo ? (
                    <h1>Oh No!</h1>
                ) : (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Country</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wildfires.map((fire, index) => (
                                <Wildfire
                                    key={fire.id}
                                    index={index}
                                    {...fire}
                                />
                            ))}
                        </tbody>
                    </table>
                ))}
        </>
    );
};

Wildfire.propTypes = {
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};
