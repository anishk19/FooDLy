function FormInput({ label, name, type = 'text', value, onChange, placeholder, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default FormInput;