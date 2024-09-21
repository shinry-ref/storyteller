import { MemoryDetails } from "../pages/MemoryDetails";
import { MemoryHome } from "../pages/MemoryHome";
import { MemoryRegister } from "../pages/MemoryRegister";
import { Top } from "../pages/Top";

export const MemoriesRoutes = [
  {
    path: "/",
    index: true,
    element: <Top />,
  },
  {
    path: "/home",
    index: false,
    element: <MemoryHome />,
  },
  {
    path: "/:id",
    index: false,
    element: <MemoryDetails />,
  },
  {
    path: "/register",
    index: false,
    element: <MemoryRegister />,
  },
];
