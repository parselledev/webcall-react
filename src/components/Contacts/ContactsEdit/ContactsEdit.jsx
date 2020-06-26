import React, {Component} from 'react';
import PropTypes from 'prop-types'
import compose from 'Utils/compose';
import {connect} from 'react-redux';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';

import {
  contactsEdit,
  contactsDelete
} from 'Redux/contacts/contacts.actions';
import {selectUserId} from 'Redux/user/user.selectors';
import Modal from 'Components/UI/Modal/Modal';
import Form from 'Components/UI/Form/Form';
import Button from 'Components/UI/Button/Button';
import Input from 'Components/UI/Input/Input';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class ContactsEdit extends Component {

  state = {
    modalVisible: false,
  }

  handleModalToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  handleSubmit = (values, {resetForm}) => {
    const {name, phone, avatar} = values;
    const {initialValues,contact:{id}, userId} = this.props;
    this.props.contactsEdit(userId, id, name, phone, avatar);
    resetForm(initialValues);
    this.handleModalToggle();
  }

  handleContactDelete = id => {
    const willDelete = confirm("Delete this contact?");
    const {userId} = this.props;
    if(willDelete) this.props.contactsDelete(userId, id);
  }

  render() {

    const {modalVisible} = this.state;

    const {initialValues, contact:{id}} = this.props;

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
        initialValues={initialValues}
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
                text="Save"/>
            </Form>
          )}
      </Formik>
    );

    return(
      <div className="contacts__list-edit">
        {
          modalVisible ?
            <Modal
              title="Edit contact"
              content={form}
              handleModalClose={this.handleModalToggle}>
            </Modal>
            :
            ''
        }
        <Button
          className="contacts__list-editBtn"
          classMod="medium--icon--blue"
          icon={faPencilAlt}
          onClick={this.handleModalToggle}/>
        <Button
          className="contacts__list-deleteBtn"
          classMod="medium--icon--danger"
          icon={faTrashAlt}
          onClick={() => this.handleContactDelete(id)}/>
      </div>
    );
  }
}

ContactsEdit.propTypes = {
  initialValues: PropTypes.object,
  contact: PropTypes.object,
  userId: PropTypes.number,
  contactsEdit: PropTypes.func,
  contactsDelete: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  userId: selectUserId
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  contactsEdit: (userId, id, name, phone, avatar) => dispatch(contactsEdit(dispatch, apiService, userId, id, name, phone, avatar)),
  contactsDelete: (userId, id) => dispatch(contactsDelete(dispatch, apiService, userId, id))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsEdit);