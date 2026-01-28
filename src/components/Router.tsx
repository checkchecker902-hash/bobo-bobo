import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MenusPage, menusRouteLoader } from './restaurants-menus';
import PreLandingPage from './pages/PreLandingPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LocationPage from './pages/LocationPage';
import ReviewsPage from './pages/ReviewsPage';
import FAQsPage from './pages/FAQsPage';
import BookingPage from './pages/BookingPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PreLandingPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "menus",
        element: <MenusPage />,
        loader: menusRouteLoader,
      },
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "faqs",
        element: <FAQsPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
