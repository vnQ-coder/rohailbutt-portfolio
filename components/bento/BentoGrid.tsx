export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-3 lg:gap-4 px-4 lg:px-8 pb-16 max-w-[1400px] mx-auto pt-24">
      {children}
    </div>
  );
}
