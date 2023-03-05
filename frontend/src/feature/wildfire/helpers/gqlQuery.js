import { gql } from 'apollo-boost';

const wildfireQuery = gql`
    query wildfireQuery($month: String!, $year: String!) {
        wildfire(month: $month, year: $year) {
            events {
                id
                title
                geometry {
                    date
                    geoComponent {
                        ISO3166Alpha3
                    }
                }
            }
        }
    }
`;

export { wildfireQuery };
