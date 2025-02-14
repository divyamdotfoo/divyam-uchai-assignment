import { persist } from "zustand/middleware";
import { User } from "./types";
import { create } from "zustand";
import { createSelectors } from "./selector";

interface UserState {
  users: User[];
}

const useUserBase = create<UserState>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: "one",
          name: "Mark S",
          avatar: "/mark.jpg",
        },
        {
          id: "two",
          name: "Helly R",
          avatar: "/helly.webp",
        },
        {
          id: "three",
          name: "Dylan G",
          avatar: "/dylan.png",
        },
        {
          id: "four",
          name: "Irving B",
          avatar: "/irving.avif",
        },
        {
          id: "five",
          name: "Mr Milchick",
          avatar: "/milchick.jpg",
        },
        {
          id: "six",
          name: "Mrs Selving",
          avatar: "/selving.jpg",
        },
      ],
    }),
    {
      name: "user-store",
      version: 1,
    }
  )
);

export const useUser = createSelectors(useUserBase);
