import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Auth0Provider
		domain="dev-fo0kxrhbmrjwmqak.us.auth0.com"
		clientId="GKtUQrl3KqevV1AvGSZ5vKm7xbLRopln"
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<App />
	</Auth0Provider>
);

reportWebVitals();
