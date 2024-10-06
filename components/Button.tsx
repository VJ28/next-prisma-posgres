interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, onClick, ...rest }: ButtonProps) {
  return (
    <button
    onClick={onClick}
    {...rest}
    className="mt-4 flex w-full h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
    {children}
    </button>
  );
}
