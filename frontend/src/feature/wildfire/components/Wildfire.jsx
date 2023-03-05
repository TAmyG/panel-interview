import React from 'react';
import PropTypes from 'prop-types';

/**
 * {"title":"Wildfire - E of Mesa, Arizona - United States","geometry":[{"geoComponent":{"ISO3166Alpha3":"USA"}}]}
 * Component to render title and Country
 * @param {props with wildfire info from backend} wildfire
 * @returns react comnponent
 */
export const Wildfire = ({ title, index, geometry }) => {
    const country = geometry[0].geoComponent.ISO3166Alpha3;
    const { date } = geometry[0];
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{title}</td>
            <td>{country}</td>
            <td>{date}</td>
        </tr>
    );
};

Wildfire.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    geometry: PropTypes.array.isRequired,
};
