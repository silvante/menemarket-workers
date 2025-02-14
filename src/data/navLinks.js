export default {
  main: [
    {
      path: "/",
      label: "Bosh sahifa",
    },
    {
      path: "/orders",
      label: "Buyurtmalar",
    },
    {
      path: "/profile",
      label: "Profil",
    },
    {
      path: "/settings",
      label: "Sozlamalar",
    },
  ],

  products: [
    {
      end: true,
      path: "/products",
      label: "Asosiy",
    },
    {
      path: "/products/create",
      label: "Yaratish",
    },
    {
      disabled: true,
      path: "/products/edit",
      label: "Tahrirlash",
    },
  ],
};
