import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatusType } from "app/appSlice"
import { clearTasksAndTodolists } from "common/actions"
import { ResultCode } from "common/enums"
import {
  createAppAsyncThunk,
  handleServerAppError,
  thunkTryCatch,
} from "common/utils"
import { todolistsApi } from "features/todolistsList/api/todolistsApi"

import {
  TodolistType,
  UpdateTodolistTitleArgType,
} from "features/todolistsList/api/todolistApi.types"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        }
        state.unshift(newTodolist)
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id)
        if (todo) {
          todo.title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/fetchTodolists`,
  async () => {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await todolistsApi.createTodolist(title)
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(
      todolistsActions.changeTodolistEntityStatus({
        id,
        entityStatus: "loading",
      }),
    )
    const res = await todolistsApi.deleteTodolist(id).finally(() =>
      dispatch(
        todolistsActions.changeTodolistEntityStatus({
          id,
          entityStatus: "idle",
        }),
      ),
    )
    if (res.data.resultCode === ResultCode.Success) {
      return { id }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const changeTodolistTitle = createAppAsyncThunk<
  UpdateTodolistTitleArgType,
  UpdateTodolistTitleArgType
>(`${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  const res = await todolistsApi.updateTodolist(arg)
  if (res.data.resultCode === ResultCode.Success) {
    return arg
  } else {
    return rejectWithValue(null)
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {
  fetchTodolists,
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
}
export const { selectTodolists } = slice.selectors
export const todolistsPath = slice.reducerPath

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
