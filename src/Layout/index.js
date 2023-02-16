import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../CreateDeck";
import EditCard from "../EditCard";
import EditDeck from "../EditDeck";
import Home from "../Home/HomePage";
import Study from "../Study";
import ViewDeck from "../ViewDeck";
import Header from "./Header";
import NotFound from "./NotFound";
import AddCard from "../AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <ViewDeck />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
