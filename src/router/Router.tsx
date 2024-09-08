import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { CardsRoutes } from "./CardsRoutes";

export const Router:FC = memo(() => {
  return (
    <Routes>
      <Route path="/cards">
        {CardsRoutes.map((route) => (
          <Route
            key={route.path}
            index={route.index}
            path={`/cards/${route.path}`}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
})