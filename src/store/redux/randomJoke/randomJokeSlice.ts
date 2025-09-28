import axios from "axios"
import { v4 } from "uuid"
import { createAppSlice } from "store/createAppSlice"

import { RandomJoke, RandomJokeSliceState } from "./types"
import { PayloadAction } from "@reduxjs/toolkit"

const RANDOM_JOKE_URL: string =
  "https://official-joke-api.appspot.com/random_joke"

const randomJokesInitialState: RandomJokeSliceState = {
  randomJokes: [],
  error: undefined,
  isFetching: false,
}

export const randomJokeSlice = createAppSlice({
  name: "RANDOM_JOKE",
  initialState: randomJokesInitialState,
  reducers: create => ({
    getRandomJoke: create.asyncThunk(
      async () => {
        const response = await axios.get(RANDOM_JOKE_URL)

        return response
      },
      {
        pending: (state: RandomJokeSliceState) => {
          state.error = undefined
          state.isFetching = true
        },
        fulfilled: (state: RandomJokeSliceState, action) => {
          state.isFetching = false
          if (action.payload) {
            const jokeData = action.payload.data

            state.randomJokes = [
              ...state.randomJokes,
              { joke: `${jokeData.setup} ${jokeData.punchline}`, id: v4() },
            ]
          }
        },
        rejected: (state: RandomJokeSliceState, action) => {
          state.isFetching = false

          if (action.error.code === "ERR_BAD_REQUEST") {
            state.error = "Too Many Requests"
          } else {
            state.error = "Some Network Error"
          }
        },
      },
    ),
    deleteRandomJoke: create.reducer(
      (state: RandomJokeSliceState, action: PayloadAction<string>) => {
        state.randomJokes = [...state.randomJokes].filter(
          (randomJokes: RandomJoke) => randomJokes.id !== action.payload,
        )
      },
    ),
  }),
  selectors: {
    randomJokesData: (state: RandomJokeSliceState) => state,
  },
})

export const randomJokeSliceActions = randomJokeSlice.actions

export const randomJokeSliceSelectors = randomJokeSlice.selectors
