import { Outlet, Link } from "react-router-dom";
import Menu from "../components/Menu/Menu"
import Footer from "../components/Footer/Footer"


const Layout = () => {
  return (
    <> 
    <div>
    <Menu/>
    </div>

    <div>
      <Outlet />
    </div>

    <div>
     <Footer/>
    </div>
    </>
  )
};

export default Layout;