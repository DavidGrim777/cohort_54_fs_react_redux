export interface RandomJoke {
  id: string
  joke: string
}

export interface RandomJokeSliceState {
  randomJokes: RandomJoke[]
  isFetching: boolean
  error: string | undefined
}
