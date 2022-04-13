 // File for importing global things
import 'bootstrap/dist/css/bootstrap.css';
import "../resources/css/style.css";
 import { Provider } from 'react-redux';
 import store from '../redux/store';
// We need this check because bootstrap looking for a window that is absent on the server
if (process.browser) {
    require("jquery");
    require("@popperjs/core");
    require("bootstrap");
}

const App = ({ Component, pageProps }) => {
    return(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
};

export default App;