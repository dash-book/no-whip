const apiRoutes = {
  login: {
    page: "/login",
    login: "/api/login",
  },
  employee: {
    page: "/employees",
  },
  audit: {
    page: "/audit",
  },
  tracking: {
    page: "/tracking",
  },
  whoIsWorking: {
    page: "/who-is-working",
  },
  users: {
    getUsers: "/api/users",
    editUser: (id: string) => `/api/users/${id}`,
    createUser: "/api/users",
    deleteUser: (id: string) => `/api/users/${id}`,
  },
};

export default apiRoutes;
