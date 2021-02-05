import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DevicePage from "./pages/DevicePage";
import StaffPage from "./pages/StaffPage";
import AddDevicePage from "./pages/AddDevicePage";
import CalendarPage from "./pages/CalendarPage";
import ProtectedRoute from "./Utils/ProtectedRoute";

//import Signin from "./components/Signin";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <ProtectedRoute exact path="/device" component={DevicePage} />
            <ProtectedRoute exact path="/staff" component={StaffPage} />
            <ProtectedRoute exact path="/add" component={AddDevicePage} />
            <ProtectedRoute exact path="/calendar" component={CalendarPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
