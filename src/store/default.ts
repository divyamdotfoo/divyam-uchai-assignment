import { generateContainerColor } from "@/lib/utils";
import { BoardStoreState } from ".";

export const defaultUsers = [
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
    name: "Mrs Selvig",
    avatar: "/selvig.jpg",
  },
];

export const defaultColumns: BoardStoreState["columns"] = {
  todo: {
    id: "todo",
    title: "To Do",
    taskIds: ["task1", "task4"],
    colors: generateContainerColor(),
  },
  "in-progress": {
    id: "in-progress",
    title: "In Progress",
    taskIds: ["task8", "task5", "task7"],
    colors: generateContainerColor(),
  },
  review: {
    id: "review",
    title: "Review",
    taskIds: ["task11", "task12"],
    colors: generateContainerColor(),
  },
  done: {
    id: "done",
    title: "Done",
    taskIds: ["task13", "task14"],
    colors: generateContainerColor(),
  },
};

export const defaultTasks: BoardStoreState["tasks"] = {
  task1: {
    id: "task1",
    title: "Update user authentication flow",
    description: "Implement new OAuth2 authentication system",
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }), // yesterday
    columnId: "todo",
    priority: "high",
    assignee: defaultUsers[0],
    attachments: [{ type: "file" }],
    comments: [
      {
        id: "comment1",
        text: "We should consider adding 2FA",
        by: defaultUsers[1],
        taskId: "task1",
      },
      {
        id: "comment2",
        text: "Agreed, I'll add it to the scope",
        by: defaultUsers[0],
        taskId: "task1",
      },
      {
        id: "comment3",
        text: "Let's schedule a review session",
        by: defaultUsers[4],
        taskId: "task1",
      },
    ],
  },

  task4: {
    id: "task4",
    title: "Performance optimization",
    description: "Optimize application loading time",
    createdAt: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "todo",
    priority: "high",
    assignee: defaultUsers[3],
    attachments: [{ type: "file" }],
    comments: [],
  },
  task5: {
    id: "task5",
    title: "Database migration",
    description: "Migrate from MongoDB to PostgreSQL",
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "in-progress",
    priority: "high",
    assignee: defaultUsers[4],
    attachments: [],
    comments: [
      {
        id: "comment4",
        text: "Started the initial schema design",
        by: defaultUsers[4],
        taskId: "task5",
      },
      {
        id: "comment5",
        text: "We need to plan the data transfer strategy",
        by: defaultUsers[0],
        taskId: "task5",
      },
      {
        id: "comment6",
        text: "I can help with the migration scripts",
        by: defaultUsers[2],
        taskId: "task5",
      },
    ],
  },

  task7: {
    id: "task7",
    title: "User testing",
    description: "Conduct user testing sessions",
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "in-progress",
    priority: "medium",
    assignee: defaultUsers[0],
    attachments: [{ type: "video" }],
    comments: [],
  },
  task8: {
    id: "task8",
    title: "Security audit",
    description: "Perform security vulnerability assessment",
    createdAt: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "in-progress",
    priority: "high",
    assignee: defaultUsers[1],
    attachments: [],
    comments: [
      {
        id: "comment7",
        text: "Found some critical vulnerabilities",
        by: defaultUsers[1],
        taskId: "task8",
      },
      {
        id: "comment8",
        text: "I'll start working on fixes",
        by: defaultUsers[3],
        taskId: "task8",
      },
      {
        id: "comment9",
        text: "Please prioritize the high-risk items",
        by: defaultUsers[4],
        taskId: "task8",
      },
    ],
  },
  task11: {
    id: "task11",
    title: "Documentation review",
    description: "Review technical documentation",
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "review",
    priority: "low",
    assignee: defaultUsers[4],
    attachments: [],
    comments: [
      {
        id: "comment10",
        text: "Some sections need more detail",
        by: defaultUsers[4],
        taskId: "task11",
      },
      {
        id: "comment11",
        text: "I'll update the architecture diagrams",
        by: defaultUsers[2],
        taskId: "task11",
      },
      {
        id: "comment12",
        text: "Don't forget to add deployment instructions",
        by: defaultUsers[5],
        taskId: "task11",
      },
    ],
  },
  task12: {
    id: "task12",
    title: "Performance testing",
    description: "Run performance tests on new features",
    createdAt: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "review",
    priority: "medium",
    assignee: defaultUsers[5],
    attachments: [{ type: "file" }],
    comments: [],
  },
  task13: {
    id: "task13",
    title: "Bug fixes",
    description: "Fix reported bugs in production",
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "done",
    priority: "high",
    assignee: defaultUsers[0],
    attachments: [],
    comments: [],
  },
  task14: {
    id: "task14",
    title: "Release preparation",
    description: "Prepare for version 2.0 release",
    createdAt: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    columnId: "done",
    priority: "high",
    assignee: defaultUsers[1],
    attachments: [{ type: "file" }],
    comments: [
      {
        id: "comment13",
        text: "All critical features are implemented",
        by: defaultUsers[1],
        taskId: "task14",
      },
      {
        id: "comment14",
        text: "Final testing looks good",
        by: defaultUsers[3],
        taskId: "task14",
      },
      {
        id: "comment15",
        text: "Ready for deployment",
        by: defaultUsers[5],
        taskId: "task14",
      },
    ],
  },
};
