import { Toaster } from "react-hot-toast";

function Layout({ children }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}

export default Layout;
