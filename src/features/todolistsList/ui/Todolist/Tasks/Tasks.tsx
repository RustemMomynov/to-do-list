import { AppRootStateType } from "app/store"
import { Task } from "./Task/Task"
import { TaskType } from "features/todolistsList/api/taskApi.types"
import { selectFilteredTasks } from "features/todolistsList/model/tasksSlice"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import React from "react"
import { useSelector } from "react-redux"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const tasksForTodolist = useSelector<AppRootStateType, TaskType[]>((state) =>
    selectFilteredTasks(state, todolist.id, todolist.filter),
  )

  return (
    <div style={{ margin: "20px 0" }}>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </div>
  )
}
