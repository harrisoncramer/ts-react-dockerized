import React, { ReactElement, useState } from "react";

interface CheckboxProps {
  label: string;
}

export default function Checkbox({
  label,
}: CheckboxProps): ReactElement | null {
  const [checked, setChecked] = useState(false);
  return (
    <div className="root">
      <label>{label}</label>
      <input
        type="checkbox"
        data-testid="my-checkbox"
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
        name={label}
      />
    </div>
  );
}
