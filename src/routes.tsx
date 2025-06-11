import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Preview from './pages/Preview';
import Footer from './components/Footer';

const RouteComponent = () => {
  const location = useLocation();

  // Define the paths where the footer should be shown
  const showFooter = !location.pathname.startsWith('/preview');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

export default RouteComponent;