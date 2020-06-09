import React, { useState, useEffect, useCallback } from "react"
import UserDataService from "../services/http-service"
import UsersList from './UsersList'
import LoadingSpinner from './LoadingSpinner'


const Users = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchUser, setSearchUser] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const onChangeSearchUser = e => {
    const searchUser = e.target.value
    setSearchUser(searchUser)
  }

  const getUsers = useCallback(() => {
    setIsLoading(true)
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data)
        setIsLoading(false)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await getUsers()
        setUsers(responseData.data)
      }
      catch (err) {
      }
    }
    fetchUsers()
  }, [getUsers])


  const refreshList = () => {
    getUsers()
    setCurrentUser(null)
    setCurrentIndex(-1)
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

  const findByUsername = () => {
    UserDataService.findByName(searchUser)
      .then(response => {
        setUsers(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && 
        <UsersList 
        loadedUsers={users} 
        refreshList={refreshList} 
        removeAllUsers={removeAllUsers} 
        findByUsername={findByUsername} 
        onChangeSearchUser={onChangeSearchUser}
        />}
    </>
  )
}

export default Users
