import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  randomJokeSliceActions,
  randomJokeSliceSelectors,
} from "store/redux/randomJoke/randomJokeSlice"
import { RandomJoke } from "store/redux/randomJoke/types"

import Button from "components/Button/Button"

import {
  PageWrapper,
  JokeCard,
  JokeContainer,
  JokeText,
  JokeWrapper,
  ButtonControl,
} from "./styles"

function Lesson_18() {
  const dispatch = useAppDispatch()
  const { randomJokes, isFetching, error } = useAppSelector(
    randomJokeSliceSelectors.randomJokesData,
  )

  const getRandomJoke = () => {
    dispatch(randomJokeSliceActions.getRandomJoke())
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  const jokes = randomJokes.map((joke: RandomJoke) => {
    return (
      <JokeWrapper key={joke.id}>
        <JokeText>{joke.joke}</JokeText>
        <ButtonControl>
          <Button
            onClick={() =>
              dispatch(randomJokeSliceActions.deleteRandomJoke(joke.id))
            }
            isRed
            name="Delete"
          />
        </ButtonControl>
      </JokeWrapper>
    )
  })

  return (
    <PageWrapper>
      <JokeCard>
        <JokeContainer>{jokes}</JokeContainer>
        <Button
          disabled={isFetching}
          name="Get Random Joke"
          onClick={getRandomJoke}
        />
      </JokeCard>
    </PageWrapper>
  )
}

export default Lesson_18
