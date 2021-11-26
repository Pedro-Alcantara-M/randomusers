import Home from "../pages/home"
import ViewUser from "../pages/viewUser";
import MainLayout from "../layout/mainLayout";

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home/> },
      { path: '/:id', element: <ViewUser/> },
    ]
  },
]
    
export default routes;