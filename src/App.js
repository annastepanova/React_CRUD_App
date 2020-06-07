import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NewUser from "./components/NewUser"
import UserInfo from "./components/UserInfo"
import UsersList from "./components/UsersList"
import HomePage from './components/HomePage'

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            HOME
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link exact to="/users" className="nav-link">
                ALL USERS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users/new" className="nav-link">
                NEW USER
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/new" component={NewUser} />
            <Route path="/users/:id" component={UserInfo} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}


export default App
