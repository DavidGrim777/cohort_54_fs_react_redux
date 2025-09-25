import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  catFactSliceActions,
  catFactSliceSelectors,
} from "store/redux/catFact/catFactSlice"
import { CatFact } from "store/redux/catFact/types"

import Button from "components/Button/Button"

import {
  PageWrapper,
  CatFactCard,
  CatFactsContainer,
  CatFactText,
  CatFactWrapper,
  ButtonControl,
} from "./styles"

function Lesson_18() {
  const dispatch = useAppDispatch()
  const { catFacts, isFetching, error } = useAppSelector(
    catFactSliceSelectors.catFactData,
  )

  const getCatFact = () => {
    dispatch(catFactSliceActions.getCatFact())
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  const facts = catFacts.map((fact: CatFact) => {
    return (
      <CatFactWrapper key={fact.id}>
        <CatFactText>{fact.fact}</CatFactText>
        <ButtonControl>
          <Button
            onClick={() => dispatch(catFactSliceActions.deleteCatFact(fact.id))}
            isRed
            name="Delete"
          />
        </ButtonControl>
      </CatFactWrapper>
    )
  })

  return (
    <PageWrapper>
      <CatFactCard>
        <CatFactsContainer>{facts}</CatFactsContainer>
        <Button
          disabled={isFetching}
          name="Get Cat Fact"
          onClick={getCatFact}
        />
      </CatFactCard>
    </PageWrapper>
  )
}

export default Lesson_18
