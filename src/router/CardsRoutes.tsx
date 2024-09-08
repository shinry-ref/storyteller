import { CardDetails } from "../pages/CardDetails";
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
];
