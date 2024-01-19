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
import ListeCarburant from "pages/carburant/ListeCarburant";
import ModifierCarburant from "pages/carburant/ModifierCarburant";
import ModifierMarque from "pages/marque/ModifierMarque";
import ValiderAnnonce from "pages/annonce/ValiderAnnonce";
import DetailAnnonce from "pages/annonce/DetailAnnonce";
import Login from "views/examples/Login";
import ListeCommission from "pages/commission/ListeCommission";
import ModifierCommission from "pages/commission/ModifierCommission";
import ListePays from "pages/pays/ListePays";
import ModifierPays from "pages/pays/ModifierPays";
import ListeCategorie from "pages/categorie/ListeCategorie";
import ModifierCategorie from "pages/categorie/ModifierCategorie";
import ListeType from "pages/type/ListeType";
import ModifierType from "pages/type/ModifierType";

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
    path: "/listeCarburant",
    name: "Carburant",
    icon: "ni ni-delivery-fast text-blue",
    component: <ListeCarburant/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/listeCommission",
    name: "Commission",
    icon: "ni ni-money-coins text-yellow",
    component: <ListeCommission/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/modifierCommission/:id",
    name: "ModifierCarburant",
    icon: "ni ni-check-bold text-blue",
    component: <ModifierCommission/>,
    layout: "/admin",
    showInSidebar:false,
  },
  {
    path: "/modifierCarburant/:id",
    name: "ModifierCarburant",
    icon: "ni ni-check-bold text-blue",
    component: <ModifierCarburant/>,
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
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-check-bold text-blue",
    component: <Login/>,
    layout: "/auth",
    showInSidebar:false,
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
    path: "/modifierMarque/:id",
    name: "ModifierMarque",
    icon: "ni ni-planet text-blue",
    component: <ModifierMarque/>,
    layout: "/admin",
    showInSidebar:false,
  },

  {
    path: "/listePays",
    name: "ListePays",
    icon: "ni ni-pin-3 text-blue",
    component: <ListePays/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/modifierPays/:id",
    name: "ModifierPays",
    icon: "ni ni-planet text-blue",
    component: <ModifierPays/>,
    layout: "/admin",
    showInSidebar:false,
  },

  {
    path: "/listeCategorie",
    name: "ListeCategorie",
    icon: "ni ni-spaceship text-blue",
    component: <ListeCategorie/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/modifierCategorie/:id",
    name: "ModifierCategorie",
    icon: "ni ni-planet text-blue",
    component: <ModifierCategorie/>,
    layout: "/admin",
    showInSidebar:false,
  },

  {
    path: "/listeType",
    name: "ListeType",
    icon: "ni ni-box-2 text-blue",
    component: <ListeType/>,
    layout: "/admin",
    showInSidebar:true,
  },
  {
    path: "/modifierType/:id",
    name: "ModifierType",
    icon: "ni ni-planet text-blue",
    component: <ModifierType/>,
    layout: "/admin",
    showInSidebar:false,
  },


];
export default routes;
