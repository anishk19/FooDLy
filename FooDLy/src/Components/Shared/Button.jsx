function Button({ children, type = 'button', onClick, variant = 'primary', fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;