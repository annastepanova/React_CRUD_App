import React, { useState } from 'react'
import UserDataService from '../services/http-service'

const NewUser = () => {
  const initialUserState = {
    id: null,
    username: "",
    email: "",
    phone_number: "",
    preferred_contact_method: "phone"
  }

  const [user, setUser] = useState(initialUserState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const saveUser = () => {
    const data = {
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      preferred_contact_method: user.preferred_contact_method
    }

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          phone_number: response.data.phone_number,
          preferred_contact_method: response.data.preferred_contact_method
        })
        setSubmitted(true);
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const newUser = () => {
    setUser(initialUserState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={user.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={user.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                required
                value={user.phone_number}
                onChange={handleInputChange}
                name="phone_number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferred_contact_method">Contact method</label>
              <select 
                className="form-control" 
                id="preferred_contact_method"
                value={user.preferred_contact_method}
                onChange={handleInputChange}
                name="preferred_contact_method"
                >
                <option>phone</option>
                <option>email</option>
              </select>
            </div>

            <button onClick={saveUser} className="btn btn-success">
              Submit
          </button>
          </div>
        )}
    </div>
  )
}  

export default NewUser
