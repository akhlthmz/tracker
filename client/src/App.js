import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { store } from "./index";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/materialUi/theme";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
//components
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/Navabar";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import NewProject from "./components/NewProject";
import Test1 from "./components/test1";
import NewTest from "./components/NewTest";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/about" render={() => <NewTest />} />
        <Route exact path="/contact" render={() => <Test1 />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/add" component={NewProject} />
      </Switch>
      <Alerts />
    </ThemeProvider>
  );
}

export default App;
