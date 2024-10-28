import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import {
  RemoveTaskArgType,
  AddTaskArgType,
  TaskType,
  UpdateTaskModelType,
  GetTasksResponse,
} from "./taskApi.types"

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<BaseResponse>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
    )
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<
      BaseResponse<{
        item: TaskType
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponse<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    )
  },
}
