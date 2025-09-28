import { BrowserRouter, Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { AppLayout } from "./AppLayout";
import './App.css'
import { Lemmas } from "./pages/Lemmas";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://renowned-chocolate-b2365884fe.strapiapp.com/graphql" }),
  cache: new InMemoryCache(),
});

function App () {


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/lemmas" element={<Lemmas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
