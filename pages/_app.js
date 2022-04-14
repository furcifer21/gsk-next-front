import { Provider } from 'react-redux';
import store from '../redux/store';
// We need this check because bootstrap looking for a window that is absent on the server
if (typeof window !== 'undefined') {
    require("jquery");
    require("@popperjs/core");
    require("bootstrap");
}
import '../resources/css/style.css';

const App = ({ Component, pageProps }) => {
    return(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
};

export default App;