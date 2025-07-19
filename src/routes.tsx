import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// lazy imports for faster imports
const Home = lazy(() => import('./pages/Home'));
const Templates = lazy(() => import('./pages/Templates'));
const Preview = lazy(() => import('./pages/Preview'));
const Login = lazy(() => import('./pages/Login'));
import Footer from './components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from './components/Loader';

const RouteComponent = () => {
  const location = useLocation();

  // Define the paths where the footer should be shown
  const showFooter = !location.pathname.startsWith('/preview');

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <Preview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
    </>
  );
};

export default RouteComponent;