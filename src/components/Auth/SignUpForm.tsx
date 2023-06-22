import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LabeledInput from '../elements/LabeledInput';
import { useAuth } from '../../lib/supabase/auth';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Button from '../elements/Button';
import { SignUpData } from '../../interfaces/Auth/AuthData';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required(
      'No name! Password itching to play the name game. Are you trembling?'
    )
    .min(
      3,
      "We seem to have stumbled upon a name that's shorter than a vine video. Minimum 3 characters."
    )
    .max(15, "Name length alert! Let's shorten it up. Maximum 15 characters."),
  email: yup
    .string()
    .email(
      "We need a valid email address to proceed. Let's reel it in and keep the conversation going!"
    )
    .trim()
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least 8 characters, including one letter and one number'
    )
    .trim()
    .required('Password is required'),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signUp, authError } = useAuth();

  const onSubmit = (data: SignUpData) => signUp(data);

  const FormActions = (): JSX.Element => {
    return (
      <div className="mt-8 flex w-full items-center justify-between gap-2">
        <Button
          className="btn-md btn-danger"
          onClick={() => reset}
          type="reset"
        >
          Reset
        </Button>
        <Button className="btn-md btn-success" type="submit">
          Sign Up
        </Button>
      </div>
    );
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass mx-auto flex max-w-md flex-col items-center justify-center gap-2 rounded-md bg-white p-4 shadow-md"
    >
      <div className="mb-4 w-full">
        <LabeledInput
          inputClassName={errors.name ? 'border border-red-400' : ''}
          placeholder="John Doe"
          type="text"
          label="Your name"
          {...register('name')}
        />
        <small className="text-red-400">{errors.name?.message}</small>
      </div>
      <div className="w-full">
        <LabeledInput
          inputClassName={errors.email ? 'border border-red-400' : ''}
          placeholder="example@ex.com"
          type="email"
          label="Email"
          {...register('email')}
        />
        <small className="text-red-400">{errors.email?.message}</small>
      </div>
      <div className="w-full">
        <div className="relative">
          <LabeledInput
            inputClassName={errors.password ? 'border border-red-400' : ''}
            placeholder="secret13pass"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...register('password')}
          />
          <button
            title={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-0 top-2 opacity-60 hover:opacity-100"
          >
            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        </div>
        <small className="text-red-400">{errors.password?.message}</small>
      </div>
      {authError && (
        <p className="text-red-400">
          {authError.message} ({authError.status})
        </p>
      )}
      <FormActions />
    </form>
  );
}
