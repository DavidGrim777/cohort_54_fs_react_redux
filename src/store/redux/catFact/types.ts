export interface CatFact {
  id: string
  fact: string
}

export interface CatFactSliceState {
  catFacts: CatFact[]
  error: string | undefined
  isFetching: boolean
}
