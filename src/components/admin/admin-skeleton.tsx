export function AdminPageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-28 rounded-full bg-white/10" />
      <div className="mt-4 h-10 w-64 rounded-lg bg-white/10" />
      <div className="mt-3 h-4 w-full max-w-2xl rounded bg-white/[.06]" />
      <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-white/10 bg-[#061224]/60 p-5">
          <div className="h-5 w-32 rounded bg-white/10" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Array.from({ length: cards }).map((_, index) => (
              <div key={index} className="h-12 rounded-xl bg-white/[.06]" />
            ))}
          </div>
          <div className="mt-6 h-11 w-36 rounded-xl bg-white/10" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 rounded-2xl border border-white/10 bg-[#061224]/45" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminListSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-28 rounded-2xl border border-white/10 bg-[#061224]/50" />
      ))}
    </div>
  );
}
