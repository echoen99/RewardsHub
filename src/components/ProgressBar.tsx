type ProgressBarProps = {
  percentage: number;
  label?: string;
};

export function ProgressBar({ percentage, label }: ProgressBarProps) {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="progress-meter" aria-label={label ?? `${safePercentage}% complete`}>
      <div className="progress-meter__track">
        <div className="progress-meter__fill" style={{ width: `${safePercentage}%` }} />
      </div>
      {label ? <span>{label}</span> : null}
    </div>
  );
}
