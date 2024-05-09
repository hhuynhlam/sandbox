import { Auth0Provider } from "@auth0/auth0-react";
import Page from "./Page";

import "./App.css";

function App() {
  return (
    <Auth0Provider
      authorizationParams={{
        audience:"https://api.zapehr.com",
        redirect_uri: "http://localhost:5173",
      }}
      clientId="zLrwzCdr2KtEeaJuEM92FzZyrJYLaPJC"
      domain="https://auth.zapehr.com"
    >
      <Page />
    </Auth0Provider>
  );
}

export default App;
