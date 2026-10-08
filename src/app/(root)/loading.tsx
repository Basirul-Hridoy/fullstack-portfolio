function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/[.06] ${className}`} />;
}

export default function HomeLoading() {
  return (
    <div className="home-wrapper min-h-screen px-4 pb-20 pt-12">
      <div className="mx-auto max-w-6xl space-y-16">
        {Array.from({ length: 6 }).map((_, index) => (
          <section key={index} className="space-y-6">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-10 w-72 max-w-full" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: index === 0 ? 4 : 3 }).map((__, card) => (
                <SkeletonBlock key={card} className="h-36" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
