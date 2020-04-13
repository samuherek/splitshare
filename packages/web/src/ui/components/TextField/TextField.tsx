import React from 'react';
import FormControl from '../../core/FormControl';
import Input from '../Input';
import InputLabel from '../InputLabel';
import { InputCoreProps } from '../../core/InputCore';

export interface TextFieldProps extends InputCoreProps {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: object;
  focused?: boolean;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  InputLabelProps?: object;
  inputProps?: object;
  inputRef?: React.Ref<any>;
  multiline?: boolean;
  name: string;
  // onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  // onFocus?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  SelectProps?: object;
  type?: string;
  value: any;
  variant?: 'standard';
  startAdornment?: any;
  endAdornment?: any;
}
const variantInputComponent = {
  standard: Input,
};

const TextField = React.forwardRef<any, TextFieldProps>(function TextField(
  props,
  ref
) {
  const {
    autoComplete,
    autoFocus,
    children,
    className,
    defaultValue,
    endAdornment,
    error = false,
    FormHelperTextProps,
    fullWidth,
    focused = false,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    inputRef,
    label,
    multiline,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    disabled = false,
    select = false,
    SelectProps,
    startAdornment,
    type,
    value,
    variant = 'standard',
    ...rest
  } = props;

  // warning(
  //   !select || !children,
  //   'Nexoya: `select` is not implemented for `TextField` just yet'
  // );

  const InputMore = {};

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  // @ts-ignore
  const InputComponent = variantInputComponent[variant];

  return (
    <FormControl
      error={error}
      focused={focused}
      // @ts-ignore
      ref={ref}
      disabled={disabled}
      className={className}
      required={required}
      // {...rest}
    >
      {!label ? null : <InputLabel htmlFor={id || name}>{label}</InputLabel>}
      {select ? null : (
        <InputComponent
          aria-describedby={helperTextId}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          multiline={multiline}
          name={name}
          rows={rows}
          inputRef={inputRef}
          type={type}
          value={value}
          id={id || name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          inputProps={inputProps}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          // required={required}
          {...InputMore}
        />
      )}
      {/* {!helperText ? null : (
          <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
        )} */}
    </FormControl>
  );
});

export default TextField;
