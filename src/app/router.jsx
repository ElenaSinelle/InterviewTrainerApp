import { createBrowserRouter } from "react-router-dom";
import {
  RootLayout,
  Home,
  LoginIn,
  SignIn,
  ResetPassword,
  ContentLesson,
  Error,
  GradingFirst,
  GradingSecond,
  GradingThird,
  Instructions,
  Profile,
  VideoFirst,
  VideoFirstItem,
  // TheoryFirst,
  AutoTestsFirst,
  AutoTestsSlider,
  AutoTestsResults,
  AutoTestsResultsCheck,
} from "../Pages";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginIn />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      // {
      //   path: "autotests",
      //   element: <AutoTests/>
      // },
      {
        path: "contentlesson",
        element: <ContentLesson />,
      },
      {
        path: "gradingfirst",
        element: <GradingFirst />,
        children: [
          {
            path: "videofirst",
            element: <VideoFirst />,
            children: [
              {
                path: ":id",
                element: <VideoFirstItem />,
              },
            ],
          },
          // {
          //   path: "thoryfirst",
          //   element: <TheoryFirst />,
          // },
          {
            path: "testsfirst",
            element: <AutoTestsFirst />,
            children: [
              {
                path: ":id",
                element: <AutoTestsSlider />,
              },
              {
                path: "testsresults",
                element: <AutoTestsResults />,
              },
              {
                path: "resultscheck",
                element: <AutoTestsResultsCheck />,
              },
            ],
          },
        ],
      },
      {
        path: "gradingsecond",
        element: <GradingSecond />,
      },
      {
        path: "gradingthird",
        element: <GradingThird />,
      },
      {
        path: "instructions",
        element: <Instructions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
    errorElement: <Error />,
  },
]);
