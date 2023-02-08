import React, { Component } from 'react';
import { Container } from './container/Container.styled';
import { Section } from './Section/Section';
import { ContactList } from './contactList/ContactList';
import { Form } from './form/Form';
import { SearchInput } from './searchInput/SearchInput';

import { nanoid } from 'nanoid';
// const INTIAL_VALUE = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) this.setState({ contacts: storedContacts });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  handleSearchInput = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  handleFormSubmit = ({ name, number }) => {
    this.setState(prevState => {
      if (
        prevState.contacts.some(
          item => item.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`${name} is already in contacts`);
      } else if (prevState.contacts.some(item => item.number === number)) {
        alert(`${number} is already in contacts`);
      } else {
        return {
          contacts: [...prevState.contacts, { id: nanoid(), name, number }],
        };
      }
    });
  };
  filteredContacts = () => {
    const normalisedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(normalisedFilter)
    );
  };
  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== id),
    });
  };
  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <Container>
        <Section title="Add contact" className="aside">
          <Form onFormSubmit={this.handleFormSubmit}></Form>
        </Section>

        <Section title="Contact List">
          <SearchInput
            value={this.state.filter}
            onChange={this.handleSearchInput}
          ></SearchInput>
          <ContactList
            contactData={filteredContacts}
            deleteContact={this.deleteContact}
          ></ContactList>
        </Section>
      </Container>
    );
  }
}
