import React, { useState, Fragment } from 'react'
import './App.css'
import AddWorkForm from './components/AddWork'
import EditWorkForm from './components/EditWork'
import WorkTable from './components/WorkTable'

const App = () => {
	// Data
	const usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
  ]
  

  const initialFormState = { id: null, name: '', username: '' }
  
 

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>REACT CRUD</h1>
      <hr/>
      <div className="row">
          <div className="col">
              <h5 style={{float:"right"}}>No.of Items:{users.length}</h5>
          </div>
      </div>
      <br/>
			<div className="row">
				<div className="col-md-6">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditWorkForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddWorkForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="col-md-6">
					<h2>View Work Items</h2>
					<WorkTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App