/**
 * components/ui/FormField.jsx
 *
 * Reusable field wrapper used across ALL dynamic pages.
 * Renders: label → input/select slot → inline error (below field, on typing)
 *
 * Props:
 *   id        string   — links label htmlFor + input id
 *   label     string   — uppercase field label text
 *   error     string   — react-hook-form error message (shown below field)
 *   isSelect  bool     — renders the gold ▼ arrow for <select> fields
 *   children  ReactNode — the actual <input> or <select> element
 */

export function FormField({ id, label, error, isSelect = false, children }) {
  return (
    <div className="relative mb-5">

      {/* Label */}
      <label
        htmlFor={id}
        className="block text-white text-[11px] font-[var(--font-primary)] tracking-[3px] uppercase mb-1"
      >
        {label}
      </label>

      {/* Input / Select wrapper */}
      <div className="relative">
        {children}
        {/* Custom dropdown arrow — pure CSS, no JS */}
        {isSelect && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 bottom-3 text-[var(--primary)] text-[9px]"
          >▼</span>
        )}
      </div>

      {/* Inline error — shown below the field as user types */}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-red-400 text-[11px] tracking-wide leading-tight"
        >
          {error}
        </p>
      )}
    </div>
  );
}