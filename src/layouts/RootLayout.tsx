import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
