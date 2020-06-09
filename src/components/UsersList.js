import React, { useState } from "react"
import { Link } from "react-router-dom"


const UsersList = (props) => {

  const [currentUser, setCurrentUser] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)


  const setActiveUser = (user, index) => {
    setCurrentUser(user)
    setCurrentIndex(index)
  }


  if (props.loadedUsers.length === 0) {
    return (
      <div className="center">
        <div className="card">
          <h2>No users found</h2>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username"
              onChange={props.onChangeSearchUser}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={props.findByUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">

          <h4>Users List</h4>
          <ul className="list-group">
            {props.loadedUsers.map((user, index) => (
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
            onClick={props.removeAllUsers}
          >
            Remove All
      </button>
          <button className="btn btn-sm btn-secondary"
            onClick={props.refreshList}
          >
            Back to All
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
    </>
  )
}

export default UsersList
