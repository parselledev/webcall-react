import React, {Component} from 'react';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {contactsAdd} from 'Redux/contacts/contacts.actions';
import {selectContactsData} from 'Redux/contacts/contacts.selectors';
import {selectUserId} from 'Redux/user/user.selectors';
import Modal from 'Components/UI/Modal/Modal';
import Form from 'Components/UI/Form/Form';
import Button from 'Components/UI/Button/Button';
import Input from 'Components/UI/Input/Input';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class ContactsAdd extends Component {

  state = {
    modalVisible: false
  }

  formInitialValues = {
    name: '',
    phone: '',
    avatar: '',
  };

  handleModalToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  handleSubmit = (values, {resetForm}) => {
    const {name, phone, avatar} = values;
    const {contacts, userId} = this.props;
    this.props.contactsAdd(contacts, userId, name, phone, avatar);
    resetForm(this.formInitialValues);
    this.handleModalToggle();
  }

  render() {

    const {modalVisible} = this.state;

    const formSchema = Yup.object().shape({
      name: Yup.string()
            .min(2, 'Minimum 2 symbols')
            .max(30, 'Maximum 30 symbols')
            .required('Enter name'),
      phone: Yup.number()
            .required('Enter phone'),
      avatar: Yup.string()
            .url('Wrong URL')
            .required('Enter url'),
    });

    const form = (
      <Formik
        initialValues={this.formInitialValues}
        validationSchema={formSchema}
        onSubmit={this.handleSubmit}
        setFieldValue>
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Field
                component={Input.FormField}
                name="name"
                placeholder="Name"/>
              
              <Field
                component={Input.FormNumber}
                name="phone"
                placeholder="Phone"/>

              <Field
                component={Input.FormField}
                name="avatar"
                placeholder="Avatar URL"/>

              <Button
                classMod="medium--blue"
                type="submit"
                text="Add contact"/>
            </Form>
          )}
      </Formik>
    );

    return(
      <div className="contacts__add">
        {
          modalVisible ?
            <Modal
              title="Add contact"
              content={form}
              handleModalClose={this.handleModalToggle}>
            </Modal>
            :
            ''
        }
        <Button
          className="contacts__addBtn"
          classMod="medium--iconed--success"
          text="Add"
          icon={faPlus}
          onClick={this.handleModalToggle}/>
      </div>
    );
  }
}

ContactsAdd.propTypes = {
  contacts: PropTypes.array,
  userId: PropTypes.number,
  contactsAdd: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  contacts: selectContactsData,
  userId: selectUserId
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  contactsAdd: (contacts, userId, social, target, text) => dispatch(contactsAdd(dispatch, apiService, contacts, userId, social, target, text))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsAdd);