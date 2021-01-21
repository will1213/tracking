import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DevicePage from "./pages/DevicePage";
import StaffPage from "./pages/StaffPage";
import AddDevicePage from "./pages/AddDevicePage";
//import Signin from "./components/Signin";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/device" component={DevicePage} />
            <Route exact path="/staff" component={StaffPage} />
            <Route exact path="/add" component={AddDevicePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
