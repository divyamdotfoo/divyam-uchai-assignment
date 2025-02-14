import React from "react";

export function BoardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full min-h-dvh py-4 pr-4 overflow-auto">
      <div className=" rounded-2xl bg-card w-full h-full px-6 py-4">
        {children}
      </div>
    </div>
  );
}

export function BoardHeader({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full pb-4 border-b border-borderCard flex items-center justify-between">
      <h2 className=" text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
