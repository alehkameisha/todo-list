const Filed = (props) => {
    const {
        className = '',
        id,
        label,
        value,
        type = 'text',
        onInput,
        ref
    } = props

    return (
        <div className={`field ${className}`}>
          <label
            className="field__label"
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className="field__input"
            id={id}
            placeholder=" "
            autoComplete="off"
            value={value}
            type={type}
            onInput={onInput}
            ref={ref}
          />
        </div>
    )
}

export default Filed