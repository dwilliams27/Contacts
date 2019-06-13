import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (q) => {
    this.setState({
      query: q.trim()
    })
  }

  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;

    const visible = contacts.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        {
          (visible.length !== contacts.length &&  
            <div className='showing-contacts'>
              <span>Now showing {visible.length} of {contacts.length} total</span>
              <button className='show-all' onClick={() => {
                this.updateQuery('');
                }}>Show all</button>
            </div>
          )
        }
        <ol className='contact-list'>
          {
            visible.map(contact => {
              return (
                <li key={contact.id} className='contact-list-item'>
                  <div 
                    className='contact-avatar'
                    style={{
                      backgroundImage: `url(${contact.avatarURL})`
                    }}
                  ></div>
                  <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.handle}</p>
                  </div>
                  <button 
                    onClick={() => onDeleteContact(contact)}
                    className='contact-remove'>
                    Remove
                  </button>
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }
}

export default ListContacts;
