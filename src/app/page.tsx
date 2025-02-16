import { Avatar } from "@/components/avatar";
import { Board } from "@/components/board";
import { BoardLayoutActions } from "@/components/board-layout-actions";
import { Notifications } from "@/components/notifications";
import { SearchTender } from "@/components/search-tender";

export default function Page() {
  return (
    // board container
    <div className=" w-full h-dvh py-4 pr-4 overflow-hidden">
      <div className=" rounded-2xl bg-card w-full h-full px-6 py-4 flex flex-col items-start">
        {/* board header */}

        <div className=" w-full mb-4 pb-4 border-b border-borderCard flex items-center justify-between">
          {/* this title can come from param prop for each page */}

          <h2 className=" text-2xl font-bold">Tender Tasks</h2>
          <div className=" flex items-center gap-6">
            {/* client components */}
            <SearchTender />
            <Notifications />
            <Avatar />
          </div>
        </div>
        {/* client components */}
        <BoardLayoutActions />
        <Board />
      </div>
    </div>
  );
}
