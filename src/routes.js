/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import ListeMarque from "pages/marque/ListeMarque";
import ModifierMarque from "pages/marque/ModifierMarque";
import ValiderAnnonce from "pages/annonce/ValiderAnnonce";
import DetailAnnonce from "pages/annonce/DetailAnnonce";

var routes = [
  {
    path: "/index",
    name: "Statistiques",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/listeMarque",
    name: "Marque",
    icon: "ni ni-planet text-blue",
    component: <ListeMarque/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/modifierMarque",
    name: "ModifierMarque",
    component: <ModifierMarque/>,
    layout: "/admin",
    showInSidebar:false,
  },
  {
    path: "/validerAnnonce",
    name: "ValiderAnnonce",
    icon: "ni ni-check-bold text-blue",
    component: <ValiderAnnonce/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/detailAnnonce/:id",
    name: "DetailAnnonce",
    icon: "ni ni-check-bold text-blue",
    component: <DetailAnnonce/>,
    layout: "/admin",
    showInSidebar:false,
  },


];
export default routes;
