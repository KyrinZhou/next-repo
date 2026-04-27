type LabSlotSkeletonProps = {
  label: string;
};

export function LabSlotSkeleton({ label }: LabSlotSkeletonProps) {
  return (
    <div className="lab-slot-card skeleton-card">
      <div className="lab-slot-top">
        <span>{label}</span>
        <h3>Loading slot...</h3>
      </div>
      <p>并行路由会让这个插槽独立等待，而不是堵塞整页。</p>
      <small>streaming segment</small>
    </div>
  );
}
