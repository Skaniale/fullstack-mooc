import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({people}) => {
  return(
  <div>
        {people.map(person =>
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          )}
      </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <div> 
          name: 
          <input 
            value={props.newName}
            onChange={props.handleNewName}
            />
        </div>
        <div>
          number: 
          <input 
            value={props.newNumber}
            onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = (props) => {
  return (
    <form>
        <div>
          filter shown with:
          <input
            value={props.filter}
            onChange={props.handleFilter}
          />
        </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons.some(person => person.name === newName))
    if ((persons.some(person => person.name === newName) === false)){
      const newObject = {name: newName, number: newNumber}
      console.log("Uusi objekti: ", newObject)
      setPersons(persons.concat(newObject))
      console.log("new person added!")
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a New Person</h3>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons people={personsToShow}/>
    </div>
  )
}

export default App