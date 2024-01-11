import { lazy } from "react";
// import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const ListeMarque = lazy(() => import("../pages/ListeMarque.js"));
const InsererMarque = lazy(() => import("../pages/InsererMarque.js"))
const ValiderAnnonce = lazy(() => import("../pages/ValiderAnnonce.js"))

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Starter/> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/listeMarque", exact: true, element: <ListeMarque /> },
      { path: "/insererMarque", exact: true, element: <InsererMarque /> },
      { path: "/validerAnnonce", exact: true, element: <ValiderAnnonce /> }
    ],
  },
];

export default ThemeRoutes;
