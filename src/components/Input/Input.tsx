import { InputWrapper, InputLabel, InputComponent, ErrorText } from "./styles";

import { type InputProps } from "./types";

function Input({
  id,
  name,
  type = "text",
  placeholder,
  label,
  disabled = false,
  error = undefined,
  value,
  onChange,
}: InputProps) {
  return (
    <InputWrapper>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputComponent
        disabled={disabled}
        $error={error}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!!error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
}

export default Input;
