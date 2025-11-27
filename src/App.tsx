import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";
import './css/__defaults.scss';
import './css/App.scss';
import './css/header.scss';
import './css/searchbar.scss';
import './css/sidebar.scss';
import { AllLemmas } from "./pages/AllLemmas";
import { AllTags } from "./pages/AllTags";
import { Colofon } from "./pages/Colofon";
import { DidactischeTips } from "./pages/DidactischeTips";
import { GebruikVanDeLijst } from "./pages/GebruikVanDeLijst";
import { Homepage } from "./pages/Homepage";
import { Lemma } from "./pages/Lemma";
import { Level } from "./pages/Level";
import { OverHetProject } from "./pages/OverHetProject";
import { Samenwerken } from "./pages/Samenwerken";
import { TagPage } from "./pages/TagPage";

export const STRAPI_BASE_URL = 'https://perfect-ducks-3ff901f65f.strapiapp.com'

const client = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_BASE_URL}/graphql` }),
  cache: new InMemoryCache(),
});

export const STERBOEKEN_PRIMARY = '#5E2750'
export const STERBOEKEN_SECONDARY = '#E2A93A'

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
            <Route path='/didactische-tips' element={<DidactischeTips />} />

            <Route path="/alle-teksten" element={<AllLemmas />} />
            <Route path="/alle-tags" element={<AllTags />} />

            <Route path="/groep/:levelId" element={<Level />} />
            <Route path="/teksten/:lemmaId" element={<Lemma />} />
            <Route path="/tag/:tagId" element={<TagPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
