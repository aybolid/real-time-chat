import React, { Ref, ChangeEventHandler, FocusEventHandler } from 'react';

interface RegisterProps {
  name?: string;
  value?: never;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

interface LabeledInputProps extends RegisterProps {
  placeholder: string;
  label: string;
  type: 'email' | 'text' | 'password' | 'number';
  inputClassName?: string;
  labelClassName?: string;
}

const LabeledInput = React.forwardRef(function LabeledInput(
  { ...props }: LabeledInputProps,
  ref
) {
  const { label, labelClassName, inputClassName, ...inputProps } = props;
  return (
    <label className={`${labelClassName} flex w-full flex-col gap-px`}>
      {label}
      <input
        ref={ref as Ref<HTMLInputElement>}
        className={`${inputClassName} w-full rounded-md px-4 py-2 text-xl placeholder:text-neutral-300 focus:outline-none`}
        autoComplete="off"
        {...inputProps}
      />
    </label>
  );
});

export default LabeledInput;
