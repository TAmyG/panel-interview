import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from 'apollo-boost';
import { wildfireQuery } from './gqlQuery';

const url = import.meta.env.PROD
    ? `http://localhost:3000/graphql`
    : import.meta.env.VITE_API_URL;
//const url = import.meta.env.VITE_API_URL;
console.log(url);

// Apolloclient needs by default the properties link and cache
const client = new ApolloClient({
    link: ApolloLink.from([new HttpLink({ uri: url })]),
    cache: new InMemoryCache(),
});

const getWildfiresGql = async (month, year) => {
    try {
        const {
            data: { wildfire },
        } = await client.query({
            query: wildfireQuery,
            variables: { month, year },
        });

        //Sort events alphabetically
        wildfire.events.sort((a, b) => {
            const countryA = a.geometry[0].geoComponent.ISO3166Alpha3;
            const countryB = b.geometry[0].geoComponent.ISO3166Alpha3;
            return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
        });
        return wildfire;
    } catch (error) {
        console.log('getWildfiresGql', error);
        return {
            events: [],
        };
    }
};

export { getWildfiresGql };
