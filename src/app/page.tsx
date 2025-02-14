import { Avatar } from "@/components/avatar";
import { BoardContainer, BoardHeader } from "@/components/board";
import { BoardLayoutActions } from "@/components/board-layout-actions";
import { Notifications } from "@/components/notifications";
import { SearchTender } from "@/components/search-tender";

export default function Page() {
  return (
    <BoardContainer>
      <BoardHeader title="Tender Tasks">
        <div className=" flex items-center gap-6">
          <SearchTender />
          <Notifications />
          <Avatar />
        </div>
      </BoardHeader>
      <BoardLayoutActions />
    </BoardContainer>
  );
}
