import React, {Component} from 'react';
import './Header.sass';
import Logo from 'Components/Logo/Logo';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import {selectUserData} from 'Redux/user/user.selectors';
import {userLogout} from 'Redux/user/user.actions';
import Button from 'Components/UI/Button/Button';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

class Header extends Component {

  handleUserLogout = e => {
    e.preventDefault();
    this.props.userLogout();
  }

  render() {

    const {user:{name, avatar}} = this.props;

    return(
      <header className="header">
        <Logo />
        <div className="header__user">
          <p className="header__user-name">{name}</p>
          <img src={avatar} className="header__user-avatar" alt="profile"/>
          <Button
            className="header__user-logout"
            classMod="small--blue"
            icon={faSignOutAlt}
            onClick={this.handleUserLogout}
          />
        </div>
      </header>
    );

  }
}

Header.ptopTypes = {
  user: PropTypes.object,
  userLogout: PropTypes.func
};


const mapStateToProps = createStructuredSelector({
  user: selectUserData
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout(dispatch))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);