import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";
import './css/__defaults.scss';
import './css/App.scss';
import './css/header.scss';
import './css/sidebar.scss';
import './css/searchbar.scss';
import { Colofon } from "./pages/Colofon";
import { GebruikVanDeLijst } from "./pages/GebruikVanDeLijst";
import { Homepage } from "./pages/Homepage";
import { Lemma } from "./pages/Lemma";
import { Level } from "./pages/Level";
import { OverHetProject } from "./pages/OverHetProject";
import { Samenwerken } from "./pages/Samenwerken";
import { AllLemmas } from "./pages/AllLemmas";

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

            <Route path="/over-het-project" element={<OverHetProject />} />
            <Route path="/feedback" element={<Samenwerken />} />
            <Route path="/colofon" element={<Colofon />} />
            <Route path="/gebruik-van-de-lijst" element={<GebruikVanDeLijst />} />
            <Route path="/alle-lemmas" element={<AllLemmas />} />

            <Route path="/groep/:levelId" element={<Level />} />
            <Route path="/lemma/:lemmaId" element={<Lemma />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
