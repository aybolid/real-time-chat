interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  /**
   * size - `btn-sm` | `btn-md` | `btn-lg`
   *
   * mod - `btn-primary` | `btn-secondary` | `btn-success` | `btn-danger`
   */
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  type = 'button',
  disabled = false,
  title,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`btn ${className} disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60`}
      type={type}
    >
      {children}
    </button>
  );
}
