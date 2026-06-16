interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));

  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label ? <span className="text-text-secondary">{label}</span> : <span />}
          {showPercentage ? (
            <span className="font-medium text-text-primary">{percentage}%</span>
          ) : null}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-dark-hover ${heights[size]}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
