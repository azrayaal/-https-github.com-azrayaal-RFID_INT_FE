// import "./App.css";
// import { Route, Router, Routes } from "react-router-dom";
// import Loading from "./pages/outbound";
// import Layout from "./layout";
// import ScanTag from "./pages/mobile";
// import Read from "./pages/mobile/read";
// import Clear from "./pages/mobile/clear";
// import Write from "./pages/mobile/write";
// import IdleTags from "./pages/mobile/idleTag";
// import InuseTags from "./pages/mobile/inuseTag";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Receiving from "./pages/inbound";
// import Home from "./pages/home";
// import Login from "./pages/auth";
// import { PrivateRoute } from "./hooks/privateRoute";


// function App() {
//   return (
//     <>
//       <div className="">
//         <Layout>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route element={<PrivateRoute />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/loading" element={<Loading />} />
//             <Route path="/receiving" element={<Receiving />} />
//             <Route path="/scan" element={<ScanTag />} />
//             <Route path="/read" element={<Read />} />
//             <Route path="/clear" element={<Clear />} />
//             <Route path="/write" element={<Write />} />
//             <Route path="/idletags" element={<IdleTags />} />
//             <Route path="/inusetags" element={<InuseTags />} />
//             </Route>
//             <Route path="*" element={<div>404 Not Found</div>} />
//           </Routes>
//         </Layout>
//         <ToastContainer   position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
//   theme="colored"/>
//       </div>
//     </>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./pages/outbound";
import Layout from "./layout";
import ScanTag from "./pages/mobile";
import Read from "./pages/mobile/read";
import Clear from "./pages/mobile/clear";
import Write from "./pages/mobile/write";
import IdleTags from "./pages/mobile/idleTag";
import InuseTags from "./pages/mobile/inuseTag";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Receiving from "./pages/inbound";
import Home from "./pages/home";
import Login from "./pages/auth";
import { PrivateRoute } from "./hooks/privateRoute";
import ScanInbound from "./pages/inbound/scan";
import DetailInbound from "./pages/inbound/detail";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          {/* Login Route outside of Layout */}
          <Route path="/login" element={<Login />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/receiving" element={<Receiving />} />
              <Route path="/receiving/:id" element={<DetailInbound />} />
              <Route path="/scan/inbound" element={<ScanInbound />} />
              <Route path="/scan" element={<ScanTag />} />
              {/* RFID */}
              <Route path="/read" element={<Read />} />
              <Route path="/clear" element={<Clear />} />
              <Route path="/write" element={<Write />} />
              <Route path="/idletags" element={<IdleTags />} />
              <Route path="/inusetags" element={<InuseTags />} />
            </Route>
          </Route>

          {/* Fallback route for 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </div>
  );
}

export default App;
