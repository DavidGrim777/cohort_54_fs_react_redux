import { ButtonComponent } from "./styles";
import { type ButtonProps } from "./types";

function Button({
  type = "button",
  name,
  onClick = () => {},
  children,
  isRed = false,
  disabled = false,
}: ButtonProps) {
  return (
    <ButtonComponent
      disabled={disabled}
      $isRed={isRed}
      onClick={onClick}
      type={type}
    >
      {/* Улосвный рендеринг */}
      {!children && name}
      {children}
    </ButtonComponent>
  );
}

export default Button;
