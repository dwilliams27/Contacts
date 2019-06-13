import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

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
    });
  }

  addContact = (contact) => {
    ContactsApi.create(contact).then((contact) => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.concat([contact])
      }));
    });
  }

  switchScreen = () => {
    this.setState({
      screen: this.state.screen === 'create' ? 'list' : 'create'
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => 
            <ListContacts 
              contacts={this.state.contacts} 
              onDeleteContact={this.removeContact}
            />
          }
        />

        <Route path='/create' render={({ history }) => (
            <CreateContact addContact={(contact) => {
              this.addContact(contact);
              history.push('/');
            }} 
          />
        )} />
      </div>
    );
  }
}

export default App;
