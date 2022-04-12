 // File for importing global things
import "../resources/sass/app.scss";
// We need this check because bootstrap looking for a window that is absent on the server
if (process.browser) {
    require("jquery");
    require("popper.js");
    require("bootstrap");
}
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { isBot } from "../components/helpers";

const App = ({ Component, pageProps }) => {
    return(
        <Component {...pageProps} />
    )
};

export default appWithTranslation(App);