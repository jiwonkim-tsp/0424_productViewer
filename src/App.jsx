import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <>
      <Header />
      <Outlet context={pathname} />
    </>
  );
}

export default App;
