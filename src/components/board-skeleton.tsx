export function BoardSkeleton() {
  return (
    <div className="pt-6 overflow-x-auto overflow-y-hidden flex items-stretch gap-6 h-full w-full">
      <div className="relative h-full w-[350px] shrink-0 bg-black overflow-y-auto rounded-md p-4 flex flex-col gap-4">
        <div className="rounded-md bg-card w-full h-60 animate-pulse"></div>
        <div className="rounded-md bg-card w-full h-60 animate-pulse"></div>
      </div>
      <div className="relative h-full w-[350px] shrink-0 bg-black overflow-y-auto rounded-md p-4 flex flex-col gap-4">
        <div className="rounded-md bg-card w-full h-60 animate-pulse"></div>
        <div className="rounded-md bg-card w-full h-60 animate-pulse"></div>
      </div>
      <div className="relative h-full w-[350px] shrink-0 bg-black overflow-y-auto rounded-md p-4 flex flex-col gap-4">
        <div className="rounded-md bg-card w-full h-60 animate-pulse"></div>
      </div>
    </div>
  );
}
