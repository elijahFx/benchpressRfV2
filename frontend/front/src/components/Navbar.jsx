import React from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  console.log(user);

  const { workouts } = useWorkoutsContext()

  return (
    <header>
      <div className="container">
        <div>
        <Link to="/">
          <h1>Benchpress.rf</h1>
          <h2>{user?.rank}</h2>
          {workouts && <h6>{workouts.length} упражнений</h6>}
        </Link>
        
        </div>
        <nav>
          {user && (
          <div className='right'>
            <span>{user.email}</span>
            <button onClick={handleClick}>
              Выйти
            </button>
          </div>)}
          {!user && (<div>
            <Link to="/login">
             Войти
            </Link>
            <Link to="/signup">
              Зарегестрироваться
            </Link>
          </div>)}
          </nav>
      </div>
    </header>
  )
}
