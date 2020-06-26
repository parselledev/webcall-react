import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import {createStructuredSelector} from 'reselect';

import {selectContactsSearch} from 'Redux/contacts/contacts.selectors';
import {contactsSearch} from 'Redux/contacts/contacts.actions';

import Input from 'Components/UI/Input/Input';
import './ContactsSearch.sass';

const ContactsSearch = ({search, handleSearchChange}) => {
  return(
    <Input
      className="contacts__search"
      type="text"
      value={search}
      placeholder="search..."
      onChange={handleSearchChange}
      value={search}/>
  );
}

class ContactsSearchContainer extends Component {

  handleSearchChange = e => {
    this.props.contactsSearch(e.target.value);
  }

  render() {
    return(
      <ContactsSearch
        search={this.props.search}
        handleSearchChange={this.handleSearchChange}/>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  search: selectContactsSearch
});

const mapDispatchToProps = dispatch => ({
  contactsSearch: query => dispatch(contactsSearch(query))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsSearchContainer)