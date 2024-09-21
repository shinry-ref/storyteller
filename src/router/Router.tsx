import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { MemoriesRoutes } from "./MemoriesRoutes";
import { Top } from "../pages/Top";

export const Router:FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/memories">
        {MemoriesRoutes.map((route) => (
          <Route
            key={route.path}
            index={route.index}
            path={`/memories/${route.path}`}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
})