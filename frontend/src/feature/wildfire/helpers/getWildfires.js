export const getWilfires = async (month = 'JAN', year = '2020') => {
    const url = import.meta.env.PROD
        ? `http://localhost:3000/graphql`
        : import.meta.env.VITE_API_URL;
    console.log('Normal', url);

    /**
     * GraphQL query
     * by default the request type is POST
     * the arguments are passed in variables attribute within the body
     * the quer attribute defines which fields are required for frontend
     */
    const body = {
        query: 'query wildfire($month: String!, $year: String!){ wildfire(month: $month, year: $year){events{ id title geometry{ date geoComponent{ ISO3166Alpha3 } } } } }',
        variables: {
            month,
            year,
        },
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };

    const resp = await fetch(url, requestOptions);
    const {
        data: { wildfire },
    } = await resp.json();
    wildfire.events.sort((a, b) => {
        const countryA = a.geometry[0].geoComponent.ISO3166Alpha3;
        const countryB = b.geometry[0].geoComponent.ISO3166Alpha3;
        return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
    });
    // Order alphabetically by country each event
    return wildfire;
};
