const Input = ({ label, type, name, value, onChange, error, placeholder }) => (
  <div className="form-group">
    <label htmlFor={label} className="text-muted text-capitalize">
      {label}
    </label>
    <input
      type={type}
      id={label}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? "form-control is-invalid" : "form-control"}
      placeholder={placeholder}
      autoComplete="on"
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default Input;
