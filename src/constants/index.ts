
export const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/",
    },
    {
      id: "1",
      title: "Reports",
      url: "/#reports",
    },
    {
      id: "2",
      title: "Admin Panel",
      url: "/admin-panel",
      subMenu: [
        {
          id: "2-1",
          title: "Hospital",
          url: "/admin-panel/hospital",
        },
        {
          id: "2-2",
          title: "User",
          url: "/admin-panel/user",
        },
      ],
    },
    {
      id: "3",
      title: "How to Use",
      url: "/#how-to-use",
    },
    {
      id: "4",
      title: "Register",
      url: "/register",
      onlyMobile: true,
    },
  ];
  