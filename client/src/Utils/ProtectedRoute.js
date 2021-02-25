import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../context/AuthContext";

function ProtectedRoute({ component: RouteComponent, ...rest }) {
  return(
    <AuthConsumer>
          {({ authenticated }) => (
      <Route
        render={props =>
          authenticated ? <RouteComponent {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
    </AuthConsumer>
  )

}

export default ProtectedRoute;
