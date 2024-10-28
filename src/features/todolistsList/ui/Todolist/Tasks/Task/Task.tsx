import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/taskApi.types"
import { useAppDispatch } from "common/hooks"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import s from "./Task.module.css"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const { id: taskId, title, status } = task

  const dispatch = useAppDispatch()

  const handleRemoveTask = () => {
    dispatch(
      tasksThunks.removeTask({
        taskId,
        todolistId,
      }),
    )
  }

  const handleUpdateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked

    const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New

    dispatch(
      tasksThunks.updateTask({
        taskId,
        domainModel: { status },
        todolistId,
      }),
    )
  }

  const handleUpdateTaskTitle = (title: string) => {
    dispatch(
      tasksThunks.updateTask({
        taskId,
        domainModel: { title },
        todolistId,
      }),
    )
  }

  const isTaskCompleted = status === TaskStatuses.Completed

  return (
    <div key={taskId} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox
        checked={isTaskCompleted}
        color="primary"
        onChange={handleUpdateTaskStatus}
      />

      <EditableSpan value={title} onChange={handleUpdateTaskTitle} />
      <IconButton onClick={handleRemoveTask}>
        <Delete />
      </IconButton>
    </div>
  )
}
