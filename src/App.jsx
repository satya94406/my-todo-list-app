import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "./context/todoSlice";
import Login from "./userAuthentication/Login";
import AddTodo from "./components/AddTodo";
import TodoItemShow from "./components/TodoItemShow";
import Header from "./components/Header";
import { auth } from "./components/Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

function TodoPage() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full lg:w-4/5 text-center bg-white shadow-lg rounded-lg p-6">
        <Header />
        <h2 className="text-xl font-bold mb-4">Welcome {auth.currentUser?.email}</h2>
        <AddTodo />
        <TodoItemShow
          TodoElements={todos}
          onDelete={(id) => dispatch(deleteTodo(id))}
        />
      </div>
    </div>
  );
}

function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <p>Loading...</p>;
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

\        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
