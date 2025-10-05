import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './css/App.scss';
import './css/sidebar.scss';
import { AppLayout } from "./AppLayout";
import { Level } from "./pages/Level";
import { Homepage } from "./pages/Homepage";
import { Lemma } from "./pages/Lemma";

export const STRAPI_BASE_URL = 'https://perfect-ducks-3ff901f65f.strapiapp.com'

const client = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_BASE_URL}/graphql` }),
  cache: new InMemoryCache(),
});

function App () {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/groep/:levelId" element={<Level />} />
            <Route path="/lemma/:lemmaId" element={<Lemma />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
