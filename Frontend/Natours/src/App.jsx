import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from "react";

import GlobalStyles from "./styles/GlobalStyle";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './features/ProtectedRoute';
import PublicRoute from './features/PublicRoute';
import { Navigate } from 'react-router-dom';
import FullSpinner from "./ui/FullSpinner";

const ManageAccount = lazy(() => import("./ui/User/Account/ManageAccount"));
const VerifyEmail = lazy(() => import("./components/Model/VerifyEmail"));
const BookMarkTour = lazy(
  () => import("./ui/User/Account/BookmarkTour/BookmarkTour"),
);

const TourInformation = lazy(() => import("./ui/Booking/TourInformation"));
const PersonalInfromation = lazy(
  () => import("./ui/Booking/PersonalInfromation"),
);
const BookingDetailsFinal = lazy(
  () => import("./ui/Booking/BookingDetailsFinal"),
);
const BookingTearms = lazy(() => import("./ui/Booking/BookingTerms"));
const TermsAndPolicy = lazy(() => import("./ui/Policy/TermsAndPolicy"));
const Payment = lazy(() => import("./ui/Booking/Payment"));
const MyBookings = lazy(
  () => import("./ui/User/Account/BookedTours/MyBookings"),
);
const MyBookingDetails = lazy(
  () => import("./ui/User/Account/BookedTours/MyBookingDetails"),
);
const Asistance = lazy(() => import("./ui/User/Account/Asistance/Asistance"));
const AllQueries = lazy(() => import("./ui/User/Account/Asistance/AllQueries"));
const Review = lazy(() => import("./ui/User/Account/Review/Review"));
const AllReview = lazy(() => import("./ui/User/Account/Review/AllReview"));

const Tours = lazy(() => import("./pages/Tours"));
const Form = lazy(() => import("./components/Form/Form"));
const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const LoginUI = lazy(() => import("./ui/LoginUI/LoginUI"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const User = lazy(() => import("./pages/User"));
const TourDetails = lazy(() => import("./pages/TourDetails"));
const Search = lazy(() => import("./pages/Search"));
const Booking = lazy(() => import("./pages/Booking"));

const ONE_HOUR = 1000 * 60 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});




const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            element: <LoginUI />,
            children: [
              {
                path: "/user/login",
                element: <Form type="login" />,
              },
              {
                path: "/user/signup",
                element: <Form type="signup" />,
              },
              {
                path: "/user/forgot-password",
                element: <Form type="forgetPassword" />,
              },
              {
                path: "/user/reset-password/:token",
                element: <Form type="resetPassword" />,
              },
            ],
          },
        ],
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/tour/:slug",
        element: <TourDetails />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/user",
        element: <User />,
        children: [
          {
            index: true,
            element: <Navigate to="/user/manage-account" replace />,
          },
          {
            path: "manage-account",
            element: <ManageAccount />,
          },
          {
            path: "my-bookings",
            element: <MyBookings />,
          },
          {
            path: "bookmarked-tours",
            element: <BookMarkTour />,
          },
          {
            path: "booking/:slug/:bookingid",
            element: <MyBookingDetails />,
          },
          {
            path: "assistance",
            element: <Asistance />,
          },
          {
            path: "all-queries",
            element: <AllQueries />,
          },
          {
            path: "reviews",
            element: <Review />
          }, {
            path: "all-review",
            element: <AllReview />
          }
        ],
      },
    ],
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/user/booking/:slug",
        element: <Booking />,
        children: [
          {
            index: true,
            element: <Navigate to="tour-information" replace />,
          },
          {
            path: "tour-information",
            element: <TourInformation />,
          },
          {
            path: "personal-info",
            element: <PersonalInfromation />,
          },
          {
            path: "review-details",
            element: <BookingDetailsFinal />,
          },
          {
            path: "terms-conditions",
            element: <BookingTearms />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "policy",
            element: <TermsAndPolicy />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            top: 24,
          }}
          toastOptions={{
            duration: 5000,

            style: {
              minWidth: "420px",
              maxWidth: "560px",

              background: "#171717",
              color: "#fff",

              border: "1px solid #2d2d2d",
              borderRadius: "16px",

              padding: "18px 22px",

              fontSize: "15px",
              fontWeight: "500",
              lineHeight: "1.6",

              textAlign: "center",

              boxShadow: "0 12px 30px rgba(0,0,0,.35)",
            },

            success: {
              duration: 6000,

              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },

            error: {
              duration: 6000,

              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Suspense fallback={<FullSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App
