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
}

const LabeledInput = React.forwardRef(function LabeledInput(
  { ...props }: LabeledInputProps,
  ref
) {
  const { label, ...inputProps } = props;
  return (
    <label className="flex w-full flex-col gap-1">
      {label}
      <input
        ref={ref as Ref<HTMLInputElement>}
        className={`${inputProps.inputClassName} w-full rounded-md px-4 py-2 text-xl placeholder:text-neutral-300`}
        autoComplete="off"
        {...inputProps}
      />
    </label>
  );
});

export default LabeledInput;
