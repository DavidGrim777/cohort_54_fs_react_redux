import axios from "axios"
import { v4 } from "uuid"
import { createAppSlice } from "store/createAppSlice"

import { CatFactSliceState, CatFact } from "./types"
import { PayloadAction } from "@reduxjs/toolkit"

const CAT_FACT_URL: string = "https://catfact.ninja/fact"

const catFactsInitialState: CatFactSliceState = {
  catFacts: [],
  error: undefined,
  isFetching: false,
}

export const catFactSlice = createAppSlice({
  name: "CAT_FACT",
  initialState: catFactsInitialState,
  reducers: create => ({
    // asyncThunk - это метод у обьекта create, который позволяет работать с асинхронностью в redux(создает функцию middleware - redux thunk)
    // принимает в себя 2 аргумента:
    // 1 аргумент - это функция callback, которая и выполняет асинхронные действия. Например: запрос на сервер
    // 2 аргумент - это обьект, в котором содержаться 3 редьюсера: pending, fullfiled и rejected
    getCatFact: create.asyncThunk(
      async () => {
        // В response у нас будет лежать либо ошибка, либо ожидаемые данные с сервера, что именно мы не знаем сразу
        const response = await axios.get(CAT_FACT_URL)

        return response
      },
      {
        pending: (state: CatFactSliceState) => {
          console.log("Pending")
          state.error = undefined
          state.isFetching = true
        },
        fulfilled: (state: CatFactSliceState, action) => {
          // Пишем логику, когда пришел положительные ответ от сервера и мы кладем пришедшие данные в наш массив в виде обьекта
          console.log("Fulfilled")
          state.catFacts = [
            ...state.catFacts,
            { fact: action.payload.data.fact, id: v4() },
          ]
          state.isFetching = false
        },
        rejected: (state: CatFactSliceState, action) => {
          // Пишем логику, когда нам пришла ошибка
          console.log("Rejected")
          state.isFetching = false

          if (action.error.code === "ERR_BAD_REQUEST") {
            state.error = "Too Many Requests"
          } else {
            state.error = "Some Network Error"
          }
        },
      },
    ),
    deleteCatFact: create.reducer(
      (state: CatFactSliceState, action: PayloadAction<string>) => {
        state.catFacts = [...state.catFacts].filter(
          (catFact: CatFact) => catFact.id !== action.payload,
        )
      },
    ),
  }),
  selectors: {
    // catFacts: (state: CatFactSliceState) => state.catFacts,
    // error: (state: CatFactSliceState) => state.error,
    catFactData: (state: CatFactSliceState) => state,
  },
})

export const catFactSliceActions = catFactSlice.actions

export const catFactSliceSelectors = catFactSlice.selectors
