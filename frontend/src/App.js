import NavBarTop from "./components/nav_bar/NavBarTop";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBarTop />
      <Outlet />
    </>
  );
}

export default App;
