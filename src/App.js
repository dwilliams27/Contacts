import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }

  componentDidMount() {
    ContactsApi.getAll().then(contacts => {
      this.setState({
        contacts
      })
    })
  }

  removeContact = (contact) => {
    this.setState(prevState => {
      return {contacts: prevState.contacts.filter(con => con.id !== contact.id)}
    });

    ContactsApi.remove(contact).then(() => {
      this.setState(contact)
    })
  }

  addContact = (contact) => {
    this.setState(prevState => {
      let newContacts = prevState.contacts;
      newContacts.push(contact);
      return {
        contacts: newContacts
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && 
          <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} />}
        {this.state.screen === 'create' &&
          <CreateContact />
        }
      </div>
    );
  }
}

export default App;
