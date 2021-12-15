import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Sign from "./components/Sign";
import Rewards from "./components/Rewards";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Inventory from "./components/Inventory";
import Playground from "./components/Playground";

function App() {
  const [index, setIndex] = useState();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://yun-graphql.herokuapp.com/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header setIndex={setIndex} />
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              width="100%"
            >
              <Routes>
                <Route path="/" element={<Sign />} />

                <Route path="/Rewards" element={<Rewards />} />
                <Route path="/Playground" element={<Playground />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="*" element={<Sign />} />
              </Routes>
            </Box>
          </Container>
        </div>
        <BottomNav index={index} setIndex={setIndex} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
