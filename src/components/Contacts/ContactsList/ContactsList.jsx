import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import './ContactsList.sass';
import {selectUserId} from 'Redux/user/user.selectors';
import {
  selectContactsData,
  selectContactsSearch,
  selectContactsFetching
} from 'Redux/contacts/contacts.selectors';
import {contactsGet} from 'Redux/contacts/contacts.actions';
import ContactsListItem from 'Components/Contacts/ContactsListItem/ContactsListItem';
import Spin from 'Components/UI/Spin/Spin';
import Empty from 'Components/UI/Empty/Empty';

class ContactsList extends Component {

  componentDidMount() {
    this.props.contactsGet(this.props.id)
  }

  render() {
    const {contacts, search, fetching} = this.props;

    if(contacts == null || (!fetching && contacts.length == 0)) return <Empty />
    if(fetching && contacts.length == 0) return <Spin />

    const visibleContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().split(" ").join("").includes(search.toLowerCase()) ||
        contact.phone.toLowerCase().split(" ").join("").includes(search.toLowerCase())
    ).sort((a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    });
    
    return(
      visibleContacts.length ?
        <ul className="contacts__list">
          <Spin.Overlay
            children={
              visibleContacts.map((contact, key) => {
                return (
                  <ContactsListItem
                    key={key}
                    contact={contact}
                  />
                );
              })
            }
            loading={fetching}
          />
        </ul>
      :
      <Empty text="Try changing your search query"/>
    );
  }
}

ContactsList.propTypes = {
  id: PropTypes.number,
  contacts: PropTypes.array,
  search: PropTypes.string,
  fetching: PropTypes.bool,
  contactsGet: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  id: selectUserId,
  contacts: selectContactsData,
  search: selectContactsSearch,
  fetching: selectContactsFetching
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  contactsGet: userId => dispatch(contactsGet(dispatch, apiService, userId))
});

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsList);