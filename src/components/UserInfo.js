import React, { useState, useEffect } from "react"
import UserDataService from "../services/http-service"

const UserInfo = props => {
  const initialUserState = {
    id: null,
    username: "",
    email: "",
    phone_number: "",
    preferred_contact_method: "phone"
  }

  const [currentUser, setCurrentUser] = useState(initialUserState)
  const [message, setMessage] = useState("")

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getUser(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentUser({ ...currentUser, [name]: value })
  }
  
  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data)
        setMessage("User information was updated successfully!")
      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data)
        props.history.push("/users")
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User Info</h4>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                value={currentUser.phone_number}
                onChange={handleInputChange}
                name="phone_number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferred_contact_method">Contact method</label>
              <select
                className="form-control"
                id="preferred_contact_method"
                value={currentUser.preferred_contact_method}
                onChange={handleInputChange}
                name="preferred_contact_method"
              >
                <option>phone</option>
                <option>email</option>
              </select>
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p style={{marginTop: '10px'}}>{message}</p>
        </div>
      ) : (
          <div>
            <br />
            <p>Please click on a User</p>
          </div>
        )}
    </div>
  )
}

export default UserInfo
