'use client';

interface ToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export default function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  id,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-start gap-4">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative shrink-0
          w-11 h-6
          rounded-full
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1520]
          ${checked ? 'bg-[var(--accent-primary)]' : 'bg-[rgba(34,211,238,0.2)]'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5
            bg-[#0a1520]
            rounded-full
            transition-transform duration-200
            shadow-sm
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer text-[var(--foreground)]">
          {label}
        </label>
        {description && (
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
