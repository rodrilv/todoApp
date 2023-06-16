import { Route, Routes } from "react-router-dom";
import { Login, Register, TodoApp } from "../pages";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
