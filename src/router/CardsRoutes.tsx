import { CardDetails } from "../pages/CardDetails";
import { CardRegister } from "../pages/CardRegister";
import { Cards } from "../pages/Cards";

export const CardsRoutes = [
  {
    path: "/",
    index: true,
    element: <Cards />,
  },
  {
    path: "/:id",
    index: false,
    element: <CardDetails />,
  },
  {
    path: "/register",
    index: false,
    element: <CardRegister />,
  },
];
