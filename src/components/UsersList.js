import React, { useState, useEffect } from "react"
import UserDataService from "../services/http-service"
import { Link } from "react-router-dom"

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const refreshList = () => {
    getUsers()
    setCurrentUser(null)
    setCurrentIndex(-1)
  }

  const setActiveUser = (user, index) => {
    setCurrentUser(user)
    setCurrentIndex(index)
  }

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then(response => {
        console.log(response.data)
        refreshList()
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.username}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentUser.username}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentUser.phone_number}
            </div>
            <div>
              <label>
                <strong>Contact method:</strong>
              </label>{" "}
              {currentUser.preferred_contact_method}
            </div>

            <Link
              to={`/users/${currentUser.id}`}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a User</p>
            </div>
          )}
      </div>
    </div>
  )
}

export default UsersList
