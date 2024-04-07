import { useEffect, useState } from "react";
import React from "react";
import Title from "./components/title/title";
import List from "./components/list/list";
import Input from "./components/input/input";
import Notification, { NotificationProps } from "./components/notification/notification";
import FormPersonNew from "./components/form-person-new/form-person-new";
import personsService from "./services/persons";

export type Person = { name: string; number: string; id: string };

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [newName, setNewName] = useState<Person["name"]>("");
  const [newNumber, setNewNumber] = useState<Person["number"]>("");
  const [notification, setNotification] = useState<NotificationProps>();


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddNewName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((el) => el.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('da')
        const newPerson: Person = {
          ...existingPerson,
          number: newNumber
        };
        personsService.update(newPerson.id, newPerson).then(res => {
          setPersons(persons.map(n => (n.id !== newPerson.id ? n : res)));
        })
      } else return;
    } else if (persons.find((el) => el.number === newNumber)) {
      setNotification({ message: `A person with this phone number ${newNumber} is already added to phonebook`, status: 'error'})
      setTimeout(() => {
        setNotification(undefined)
      }, 5000)
      return;
    } else {
      const newPerson: Person = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      personsService.create(newPerson).then(res => {
        setPersons(persons.concat(res));
        setNotification({ message: `Added ${newName}`, status: 'success'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
      .catch(error => setNotification({ message: error.response.data.error, status: 'error'}))
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    personsService.getAll().then(res => setPersons(res))
  }, [])

  const removeNumberHandler = id => {
    const person = list.find(el => el.id === id);
    if (window.confirm(`Delete ${person?.name}?`)) {
      personsService.remove(id).then(() => {
        const updatedPersonsList = persons.filter(el => el.id !== id)
        setPersons(updatedPersonsList);
      })
      .catch(() => {
        setNotification({ message: `Information of ${person?.name} has been already removed from server`, status: 'error'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
    }
  }

  const list = filter
    ? persons.filter((el) => el.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <Title text="Phonebook" />
      <Notification message={notification?.message} status={notification?.status}/>
      <Input
        label="Filter shown with"
        value={filter}
        onChange={handleFilterChange}
        type="text"
      />
      <Title text="Add new number" />
      <FormPersonNew
        onSubmit={handleAddNewName}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Title text="Numbers" />
      <List list={list} removeHandler={removeNumberHandler}/>
    </div>
  );
};

export default App;
