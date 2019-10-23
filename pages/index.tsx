import dynamic from 'next/dynamic';

import App from '../components/App';
import { withApollo } from '../lib/apollo';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

const IndexPage = () => (
  <App>
    <Map />
  </App>
);

export default withApollo(IndexPage, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});
