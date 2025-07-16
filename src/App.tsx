import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 2xl:px-80 text-black dark:text-white">
      <Header />
      <main className="min-h-screen">
        <Outlet />
        <ToastContainer position="top-center" autoClose={1000}/>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
