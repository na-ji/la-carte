import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';

import ErrorMessage from './ErrorMessage';
import { RAW_DATA_QUERY } from '../lib/queries';

const coords = {
  southWestLatitude: 48.8237907492343,
  southWestLongitude: 2.690577507019043,
  northEastLatitude: 48.848846202308756,
  northEastLongitude: 2.7505731582641606
};

const rawDataQueryVars = {
  pokemonArgs: {
    ...coords
  },
  pokestopArgs: {
    ...coords
  }
};

export default function Map() {
  const { loading, error, data, networkStatus } = useQuery(RAW_DATA_QUERY, {
    variables: rawDataQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  const { pokestops } = data;

  return (
    <section>
      <ul>
        {pokestops.map((pokestop, index) => (
          <li key={pokestop.id}>
            <div>
              <span>
                {index + 1}. {pokestop.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
}