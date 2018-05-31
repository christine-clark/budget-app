/* eslint-disable import/no-named-as-default */
import {NavLink, Route, Switch} from "react-router-dom";
import AboutPage from "./about/AboutPage";
import CreditsPage from './credits/CreditsPage';
import ManageCreditPage from './credits/ManageCreditPage'; //eslint-disable-line import/no-named-as-default
import DebitsPage from './debits/DebitsPage';
import ManageDebitPage from './debits/ManageDebitPage'; //eslint-disable-line import/no-named-as-default
import HomePage from "./home/HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };

    return (
      <div>
        <nav>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/credits" activeStyle={activeStyle}>Credits</NavLink>
          {' | '}
          <NavLink to="/debits" activeStyle={activeStyle}>Debits</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/credits" component={CreditsPage} />
          <Route path="/credit/:id" component={ManageCreditPage} />
          <Route path="/credit" component={ManageCreditPage}/>
          <Route path="/debits" component={DebitsPage} />
          <Route path="/debit/:id" component={ManageDebitPage} />
          <Route path="/debit" component={ManageDebitPage}/>
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
