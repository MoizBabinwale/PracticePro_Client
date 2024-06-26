import { useLocation } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import "./App.css";
import Navbar from "./components/Navbar";
import { useNavigation } from "./context/NavContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  const { isNavOpen } = useNavigation();
  const location = useLocation();
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <AllRoutes className={`${isNavOpen && "hidden"}`} />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
