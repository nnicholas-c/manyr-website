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
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] focus-visible:ring-offset-2
          ${checked ? 'bg-[#1C1C1C]' : 'bg-[rgba(28,28,28,0.15)]'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5
            bg-white
            rounded-full
            transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-[#4A4A4A] mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
