import Button from "components/Button/Button";

import { type CounterProps } from "./types";
import { CounterWrapper, Count, ButtonControl } from "./styles";

function Counter({ onMinus, onPlus, count }: CounterProps) {
  return (
    <CounterWrapper>
      <ButtonControl>
        <Button name="-" onClick={onMinus} />
      </ButtonControl>
      <Count className="count">{count}</Count>
      <ButtonControl>
        <Button name="+" onClick={onPlus} />
      </ButtonControl>
    </CounterWrapper>
  );
}

export default Counter;
