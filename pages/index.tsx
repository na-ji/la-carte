import dynamic from 'next/dynamic';

import App from '../components/App';
import { withApollo } from '../lib/apollo';
import { withRedux } from '../lib/redux';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

const IndexPage = () => (
  <App>
    <Map />
  </App>
);

export default withRedux(withApollo(IndexPage));
