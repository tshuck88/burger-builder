import React, { Component, Suspense, lazy } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth"));


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
