import React, {Component} from 'react';
import './AuthPage.sass';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import compose from 'Utils/compose'
import withApiService from 'Components/hoc/withApiService';
import {userAuth} from 'Redux/user/user.actions';
import Form from 'Components/UI/Form/Form';
import Button from 'Components/UI/Button/Button';
import Input from 'Components/UI/Input/Input';
import {Formik, Field} from 'formik';
import Logo from 'Components/Logo/Logo';
import * as Yup from 'yup';

class AuthPage extends Component {

  formInitialValues = {
    login: '',
    password: ''
  };

  handleSubmit = (values, {resetForm}) => {
    const {login, password} = values;
    this.props.userAuth(login, password) // mockup auth function
    resetForm(this.formInitialValues);
  }


  render() {

    const formSchema = Yup.object().shape({
      login: Yup.string()
            .required('Enter your login'),
      password: Yup.string()
            .required('Enter your password')
    });

    return(
      <div className="auth">
        <Logo />
        <Formik
          initialValues={this.formInitialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
          setFieldValue>
            {(props) => (
              <Form onSubmit={props.handleSubmit}>

                <Field
                  component={Input.FormField}
                  name="login"
                  placeholder="Login"/>

                <Field
                  component={Input.FormPassword}
                  name="password"
                  placeholder="Password"/>

                <Button
                  classMod="medium--blue"
                  type="submit"
                  text="Sign In"/>
              </Form>
            )}
        </Formik>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, {apiService}) => ({
  userAuth: (login, password) => dispatch(userAuth(dispatch, apiService, login, password))
});

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(AuthPage)