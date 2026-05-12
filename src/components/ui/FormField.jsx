
export function FormField({ id, label, error, isSelect = false, children }) {
  return (
    <div className="relative mb-7">

      {/* Label */}
      {/* <label
        htmlFor={id}
        className="block text-white text-md font-medium uppercase"
      >
        {label}
      </label> */}

      {/* Input / Select wrapper */}
      <div className="relative">
        {children}
        {/* Custom dropdown arrow — pure CSS, no JS */}
        {isSelect && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 bottom-2 text-white text-md"
          >▼</span>
        )}
      </div>

      {/* Inline error — shown below the field as user types */}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-1 text-red-400 text-[12px]"
        >
          {error}
        </p>
      )}
    </div>
  );
}