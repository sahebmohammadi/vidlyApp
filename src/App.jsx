import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import Rentals from "./components/rental";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <main className="container">
          <NavBar />
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
