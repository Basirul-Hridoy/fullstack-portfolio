type CaseStudySkeletonProps = {
  detail?: boolean;
};

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-white/[.07] ${className}`} />
);

export default function CaseStudySkeleton({ detail = false }: CaseStudySkeletonProps) {
  if (!detail) {
    return (
      <main className="min-h-screen bg-[#020711]">
        <div className="wrapper pt-32 pb-20">
          <Bar className="mb-8 h-4 w-28" />
          <Bar className="h-4 w-40" />
          <Bar className="mt-5 h-12 w-full max-w-2xl sm:h-16" />
          <Bar className="mt-5 h-4 w-full max-w-2xl" />
          <Bar className="mt-2 h-4 w-3/4 max-w-xl" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-[#061224]/60">
                <Bar className="h-36 rounded-none" />
                <div className="p-4">
                  <Bar className="h-4 w-2/3" />
                  <Bar className="mt-3 h-3 w-full" />
                  <Bar className="mt-2 h-3 w-4/5" />
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <Bar className="h-8" />
                    <Bar className="h-8" />
                    <Bar className="h-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020711]">
      <div className="wrapper pt-32 pb-20">
        <Bar className="mb-8 h-4 w-32" />
        <Bar className="h-4 w-28" />
        <Bar className="mt-5 h-12 w-full max-w-3xl sm:h-16" />
        <Bar className="mt-5 h-4 w-full max-w-2xl" />
        <Bar className="mt-2 h-4 w-3/4 max-w-xl" />

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#061224]/60 p-5 sm:p-8">
          <Bar className="h-64 w-full rounded-2xl sm:h-80" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#061224]/60 p-5">
            <Bar className="h-4 w-28" />
            <Bar className="mt-4 h-6 w-56" />
            <Bar className="mt-4 h-4 w-full" />
            <Bar className="mt-2 h-4 w-5/6" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Bar className="h-12" />
              <Bar className="h-12" />
              <Bar className="h-12" />
              <Bar className="h-12" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#061224]/60 p-5">
            <Bar className="h-4 w-28" />
            <Bar className="mt-4 h-6 w-48" />
            <Bar className="mt-4 h-4 w-full" />
            <Bar className="mt-2 h-4 w-4/5" />
            <div className="mt-7 grid grid-cols-3 gap-2">
              <Bar className="h-16" />
              <Bar className="h-16" />
              <Bar className="h-16" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Bar className="h-64 w-full rounded-2xl sm:h-80" />
          <Bar className="h-64 w-full rounded-2xl sm:h-80" />
        </div>
      </div>
    </main>
  );
}
