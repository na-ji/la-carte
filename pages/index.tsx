import App from '../components/App';
import Map from '../components/Map';
import { withApollo } from '../lib/apollo';

const IndexPage = () => (
  <App>
    <Map />
  </App>
);

export default withApollo(IndexPage, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});
