import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutDetails({workout}) {

  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user) {
      return
    }

    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()


      dispatch({type: "DELETE_WORKOUT", payload: json})

    

  }


  return (
    <div className='workout-details'>
<h4>{workout.title}</h4>
<p><strong>Вес (в кг): {workout.load}</strong></p>
<p><strong>Повторений: {workout.reps}</strong></p>{workout.comments && <p><small>{workout.comments}</small></p>}
<p>{workout.createdAt}</p>
<span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}
