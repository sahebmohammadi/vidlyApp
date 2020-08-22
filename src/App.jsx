import React, { Component } from "react";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import Rentals from "./components/rental";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/logout";
import { ToastContainer } from "react-toastify";
import jwtDecode from 'jwt-decode';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
     this.setState({user});
    } catch (ex) {
      
    }
  }
  render() {
    return (
      <>
        <ToastContainer />
        <main className="container">
          <NavBar user = {this.state.user} />
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
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
