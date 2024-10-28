import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
} from "features/todolistsList/model/todolistsSlice"
import React from "react"

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const { id, filter } = todolist

  const handleChangeFilter = (filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ filter, id }))
  }

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => handleChangeFilter("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => handleChangeFilter("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => handleChangeFilter("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  )
}
