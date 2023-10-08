import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutForm() {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [comments, setComments] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()


    const handleSubmit = async (e) => {
      e.preventDefault()

      if(!user) {
        setError("Вы должны войти, чтобы добавить тренировку")
        return
      }

      const workout = { title, reps, load, comments }

      const response = await fetch("http://localhost:4000/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(!response.ok) {
        console.log(json);
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if(response.ok) {
        setError(null)
        setTitle("")
        setReps("")
        setLoad("")
        setComments("")
        setEmptyFields([])
        dispatch({type: "CREATE_WORKOUT", payload: json})
      }

    }

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Добавить новое упражнение</h3> 

        <label>Название упражнения:*</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("название") ? "error" : ""}
        />

        <label>Количество повторений:*</label>
        <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("повторения") ? "error" : ""}
        />

      <label>Вес (в кг.)*</label>
        <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("нагрузка") ? "error" : ""}
        />

      <label>Комментарии</label>
        <input
        type="text"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        />
        <button >Добавить упражнение</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
