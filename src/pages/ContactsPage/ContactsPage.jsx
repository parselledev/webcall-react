import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import {selectUserId} from 'Redux/user/user.selectors';
import {contactsGet} from 'Redux/contacts/contacts.actions';
import './ContactsPage.sass';
import ContactsSearch from 'Components/Contacts/ContactsSearch/ContactsSearch';
import ContactsAdd from 'Components/Contacts/ContactsAdd/ContactsAdd';
import ContactsList from 'Components/Contacts/ContactsList/ContactsList';

class ContactsPage extends Component {

  render() {
    return(
      <div className="contacts">
        <div className="contacts__header">
          <h6 className="contacts__title">Contacts</h6>
          <ContactsSearch />
          <ContactsAdd />
        </div>
        <ContactsList/>
      </div>
    );
  }
}

export default ContactsPage;