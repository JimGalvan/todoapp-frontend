import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage";
import ListsPage from "./components/pages/ListsPage";
import TodoPage from "./components/pages/TodoPage";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  <Route path="/" element={<LoginPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/profile" element={<ProfilePage/>}/>
                  <Route path="/lists" element={<ListsPage/>}/>
                  <Route path="/lists/:id" element={<TodoPage/>}/>
              </Routes>
          </Router>
      </QueryClientProvider>
  );
}

export default App;
