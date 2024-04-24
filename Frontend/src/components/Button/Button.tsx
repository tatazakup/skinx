type ButtonGroupProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonGroupProps) => {
  const { children, ...rest } = props;
  return (
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium border-2"
      {...rest}
    >
      {children}
    </button>
  );
};
