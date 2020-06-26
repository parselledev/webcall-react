import React, { Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import {selectUserId} from 'Redux/user/user.selectors';
import './App.sass';
import AuthPage from 'Pages/AuthPage/AuthPage';
import Header from 'Components/Header/Header';
import ContactsPage from 'Pages/ContactsPage/ContactsPage';
import Sidebar from 'Components/Sidebar/Sidebar';

class App extends Component {
  render() {

    const {id} = this.props;

    return(
      <div className="app">
        <div className="wrap">
          {
            id != null ?
              <AppAuthenticated />
              :
              <AuthPage />
          }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  id: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  id: selectUserId
});

const AppAuthenticated = () => {
  return(
    <Fragment>
      <Header />
      <Sidebar />
      <Switch>
        <Route path="/" component={ContactsPage} exact/>
        <Route path="/index.html" component={ContactsPage} exact/>
        <Route render={()=><p>Page not found</p>} />
      </Switch>
    </Fragment>
  );
}

export default compose(
  withApiService(),
  connect(mapStateToProps, null)
)(App);