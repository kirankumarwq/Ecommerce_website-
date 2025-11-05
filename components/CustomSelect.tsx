import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>}
      <button
        type="button"
        className="relative w-full cursor-default rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-neutral-900"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{selectedOption?.label || 'Select an option'}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          {React.cloneElement(ICONS.menu, { className: 'h-5 w-5 text-neutral-400 transform rotate-90' })} {/* Using menu icon as a chevron for simplicity */}
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
        >
          {options.map(option => (
            <li
              key={option.value}
              className={`relative cursor-default select-none py-2 pl-3 pr-9 text-neutral-900 ${
                option.value === value ? 'bg-primary-100 text-primary-800' : 'hover:bg-neutral-100'
              }`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              <span className={`block truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                {option.label}
              </span>

              {option.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                  {/* Checkmark icon, using a generic one for simplicity */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;