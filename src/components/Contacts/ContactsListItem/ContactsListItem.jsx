import React, {Component} from 'react';
import './ContactsListItem.sass';
import ContactsEdit from 'Components/Contacts/ContactsEdit/ContactsEdit';

class ContactsListItem extends Component {
  render() {

    const {contact, contact:{avatar, name, phone}} = this.props;

    const initialValues = {
      name,
      phone,
      avatar
    };

    return(
      <li className="contacts__list-item">
        <img src={avatar} alt="" className="contacts__list-avatar"/>
        <p className="contacts__list-name">{name}</p>
        <p className="contacts__list-phone">{phone}</p>
        <ContactsEdit contact={contact} initialValues={initialValues}/>
      </li>
    );

  }
}

export default ContactsListItem;