import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/todolistsList/model/todolistsSlice"
import React from "react"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const handleRemoveCurrentTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(id))
  }

  const handleChangeCurrentTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
  }

  return (
    <h3>
      <EditableSpan value={title} onChange={handleChangeCurrentTodolistTitle} />
      <IconButton
        onClick={handleRemoveCurrentTodolist}
        disabled={entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </h3>
  )
}
