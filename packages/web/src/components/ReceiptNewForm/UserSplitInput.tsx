import { InputBase, styled } from '@splitshare/ui';
import * as React from 'react';

interface IProps {
  value: number;
  onChange: (userId: string, value: number) => void;
  userId: string;
  maxValue: number;
}

const InputBaseStyled = styled(InputBase)<{ editing: boolean }>`
  text-align: right;
  max-width: 50px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
  margin: 0;

  &:focus,
  &:hover {
    background: #f3f3f3;
  }
`;

const UserSplitInput = ({ value, onChange, userId, maxValue }: IProps) => {
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(String(value));

  React.useEffect(() => {
    const inputNum = Number(inputValue);
    if (value !== inputNum && !isNaN(inputNum)) {
      setInputValue(String(value));
    }
  }, [value]);

  function handleChange(ev: any) {
    const valueNum = Number(ev.currentTarget.value);
    const isOverMax = valueNum > maxValue;
    setInputValue(isOverMax ? String(maxValue) : ev.currentTarget.value);

    if (ev.target.value !== '') {
      onChange(ev.currentTarget.id, isOverMax ? maxValue : valueNum);
    }
  }

  function handleBlur(ev: any) {
    if (ev.target.value === '') {
      setInputValue(String(value));
    }
    setEditing(false);
  }

  return (
    <InputBaseStyled
      editing={editing}
      value={inputValue}
      onChange={handleChange}
      id={userId}
      type="number"
      step="0.1"
      onFocus={() => {
        setEditing(true);
      }}
      onBlur={handleBlur}
    />
  );
};

export default UserSplitInput;
