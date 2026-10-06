//    import {
//        BrowserRouter,
//        Routes,
//        Route,
//        Navigate,
//    } from "react-router-dom";
//    
//    import Layout from "./components/Layout";
//    
//    import HomePage from "./pages/HomePage";
//    //import HashEntryPage from "./pages/HashEntryPage";
//    //import RevenueForecastPage from "./pages/RevenueForecastPage";
//    //import CostForecastPage from "./pages/CostForecastPage";
//    //import DupCostPage from "./pages/DupCostPage";
//    //import AuthProvider from "./auth/AuthProvider";
//    //import ProtectedRoute from "./auth/ProtectedRoute";
//    //import AccessDeniedPage from "./pages/AccessDeniedPage";
//    //import { useAuth } from "./auth/AuthProvider";
//    
//    
//    const DynamicIndexRedirect = () => {
//        return <Navigate to="/main" replace />
//    //  const { revenueFrc, costsFrc, isDup } = useAuth();
//    //  if (revenueFrc && revenueFrc.length > 0) {
//    //    return <Navigate to="revenues" replace />;
//    //  }
//    //  if (costsFrc && costsFrc.length > 0) {
//    //    return <Navigate to="costs" replace />;
//    //  }
//    //  if (isDup) {
//    //    return <Navigate to="dup" replace />;
//    //  }
//    //  return <Navigate to="/access-denied" replace />;
//    };
//    
//    
//    export default function App() {
//      return (
//        <BrowserRouter>
//          <Routes>
//            <Route element={<Layout />} >
//              <Route
//                path="main"
//                element={<HomePage/>}
//              />
//            </Route>
//          </Routes>
//        </BrowserRouter>
//    
//      )
//    }
//    
//    
//    //export default function App() {
//    //    return (
//    //        <BrowserRouter>
//    //          <Routes>
//    //            <Route
//    //              path="/"
//    //              element={<Navigate to="/access-denied" replace />}
//    //            />
//    //            <Route
//    //              path="*"
//    //              element={<HashEntryPage />}
//    //            />
//    //            <Route
//    //              path="/user"
//    //              element={
//    //                <AuthProvider>
//    //                  <ProtectedRoute />
//    //                </AuthProvider>
//    //              }
//    //            >
//    //              <Route 
//    //                element={<Layout />}
//    //              >
//    //                <Route index 
//    //                  element={<DynamicIndexRedirect />}
//    //                />
//    //
//    //                <Route 
//    //                  path="revenues"
//    //                  element={<RevenueForecastPage/>} 
//    //                />
//    //                <Route
//    //                  path="costs"
//    //                  element={<CostForecastPage/>}
//    //                />
//    //                <Route
//    //                  path="dup"
//    //                  element={<DupCostPage/>}
//    //                />
//    //              </Route>
//    //            </Route>
//    //            <Route 
//    //              path="access-denied" 
//    //              element={<AccessDeniedPage/>}
//    //            />
//    //          </Routes>
//    //        </BrowserRouter>
//    //    );
//    //}
//

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import Layout from "./components/Layout";

import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PROTECTED ROUTES */}

          <Route element={<Layout />} >
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            {/* PROTECTED ROUTES */}

            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<DashboardPage />}
              />

              <Route
                path="/settings"
                element={
                  <div className="text-black-500">
                    Settings
                  </div>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
