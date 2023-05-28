import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible: true,
  },

  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "engineering",
    children: [
      {
        name: "manage.user",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "user_manager/user",
        icon: "keyboard_arrow_right",
      },
      {
        name: "manage.employee",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "list/employee",
        icon: "keyboard_arrow_right",
      },
    ],
  },

  {
    name: "Dashboard.leader",
    isVisible: true,
    icon: "engineering",
    children: [
      {
        name: "manage.pending",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/pending",
        icon: "keyboard_arrow_right",
      },
      {
        name: "manage.approved",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/approved",
        icon: "keyboard_arrow_right",
      },
    ],
  },
];
