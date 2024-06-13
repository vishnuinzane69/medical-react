import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListMed from "./components/medicine/ListMed";
import CreateMed from "./components/medicine/CreateMed";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import ViewMed from "./components/medicine/ViewMed";
import EditMed from "./components/medicine/EditMed";

const router = createBrowserRouter([
    { path: '', element:<Login/>},
    { path: '/register', element:<Register/>},
    { path: '/home', element: <App/> },
    { path: '/medicine', element: <ListMed/> },
    { path: '/medicine/create', element: <CreateMed/> },
    { path: '/medicine/view/:medId', element:<ViewMed/>},
    { path: '/medicine/edit/:medId', element:<EditMed/>},
]);

export default router;