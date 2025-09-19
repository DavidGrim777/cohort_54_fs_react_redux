import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  counterSliceActions,
  counterSliceSelectors,
} from "store/redux/counter/counterSlice"

import Button from "components/Button/Button"

import { CounterWrapper, Count, ButtonControl } from "./styles"

function Counter() {
  // Хук useAppDispatch не принимает в себя аргументы, он просто возвращает нам функцию dispatch,
  // которая передает action в redux store. Потом на переданный action апускается нужный нам reducer
  const dispatch = useAppDispatch()

  // Забираем хначение из redux store, затем передаем значения в нужные места в JSX,
  // таким образом подписываемся на изменения в redux store
  const count = useAppSelector(counterSliceSelectors.count)

  const onPlus = () => {
    // counterSliceActions.plus()  - это actionCreator - функция, которая возвращает нам action
    const plusAction = counterSliceActions.plus()
    // action - это обьект, состоящий из 2 пар ключ/значение
    // 1 - type - строка(тип экшена), по которому у нас вызывается редьюсер. Например: "COUNTER/plus"
    // COUNTER - имя слайса
    // plus - имя редьюсера
    // 2 - payload - это данные, которые вы хотите передать их компонента в редьюсер
    console.log(plusAction)
    dispatch(plusAction)
    // Более короткая запись
    // dispatch(counterSliceActions.plus());
  }

  const onMinus = () => {
    dispatch(counterSliceActions.minus())
  }

  const onMultiply = () => {
    dispatch(counterSliceActions.multiply(3))
  }

  const onDivide = () => {
    dispatch(counterSliceActions.divide(2))
  }

  return (
    <CounterWrapper>
      <ButtonControl>
        <Button name="/" onClick={onDivide} />
      </ButtonControl>
      <ButtonControl>
        <Button name="-" onClick={onMinus} />
      </ButtonControl>
      <Count className="count">{count}</Count>
      <ButtonControl>
        <Button name="+" onClick={onPlus} />
      </ButtonControl>
      <ButtonControl>
        <Button name="*" onClick={onMultiply} />
      </ButtonControl>
    </CounterWrapper>
  )
}

export default Counter
