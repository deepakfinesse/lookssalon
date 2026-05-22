
export function FormField({ id, label, error, isSelect = false, isDate = false, children }) {
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
        {isSelect && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 bottom-2 text-white text-md"
          >▼</span>
        )}
        {isDate && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 bottom-2 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
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