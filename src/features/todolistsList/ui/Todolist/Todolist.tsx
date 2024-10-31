import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { id, entityStatus } = todolist

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(id))
  }, [dispatch, id])

  const addNewTask = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId: id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addNewTask} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <div style={{ display: "flex", gap: "5px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  )
}
