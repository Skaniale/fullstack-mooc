import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notifications'

const Persons = (props) => {
  return(
  <div>
      {props.people.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => props.deletePerson(person)}>
              delete
            </button>
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
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
    const newObject = {name: newName, number: newNumber}
    console.log(persons.some(person => person.name === newName))
    if ((persons.some(person => person.name === newName) === false)){
      console.log("Uusi objekti: ", newObject)
      setPersons(persons.concat(newObject))
      console.log("new person added!")
      personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setIsError(false)
        setMessage(`Added '${newObject.name}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
    } 
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const newObjectId = persons.find(person => person.name === newName)
      console.log("updated object: ", newObject)
      console.log("new ID: ", newObjectId.id)
      personService
      .update(newObjectId.id, newObject)
      .catch(error => {
        setIsError(true)
        setMessage(`Person '${newObject.name}' was already removed from server`)
        setTimeout(() => {
          setMessage(null)
        }, 7500)
      })
      .then(returnedPerson => {
        setMessage(`Persons '${returnedPerson.name}' number updated to '${returnedPerson.number}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if(window.confirm("Delete " + person.name + "?")) {
      personService
      .delObject(person.id)
      .then(console.log("del successful!"))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
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
      <Persons people={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App