import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { supabase } from "./supabaseClient";
import ProtectedRoute from "./ProtectedRoute";

import TaskForm from './task/taskForm';
import CreateTask from './task/CreateTask';
import EditTask from './task/EditTask';
import ViewTask from './task/ViewTask';

import UserForm from './user/UsernameForm';
import UserCreate from './user/CreateUser';
import EditUser from './user/EditUser';
import ViewUser from './user/ViewUser';

import SignUser from './login/SignupUser';
import LoginUser from './login/LoginUser';

// Team
import TeamForm from './team/TeamForm';
import CreateTeam from './team/CreateTeam';
import ViewTeam from './team/ViewTeam';
import EditTeam from './team/EditTeam';

// Role
import RoleForm from './role/RoleForm';
import CreateRole from './role/CreateRole';
import ViewRole from './role/ViewRole';
import EditRole from './role/EditRole';

import TaskDashboard from './dashboard';
import { useEffect, useState } from 'react';

import './App.css';


function App() {
  //Session permission-------------------------------------------------
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    //-------------------------------------------------
    getSession();
    
    //Session verify-------------------------------------------------
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    //-------------------------------------------------

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5 py-4">
        <div className="container-fluid">


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            {/*---------------Adding the menu Permission---------------*/}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {session && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Task Manager</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/user">Users</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/task">Tasks</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/role">Roles</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/team">Team</Link>
                    </li>
                  </>
                )}

                {!session && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  </>
                )}

              </ul>
            {/*------------------------------*/}

           {/* Logout */}

            {/*------------------------------*/}
            {session && (
              <button
              className="btn btn-danger"
              onClick={handleLogout}
              >
                Exit
              </button>
            )}
            {/*------------------------------*/}

          </div>
        </div>
      </nav>


      

      {/* Routes */}
      <div className="container">

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route path="/signup" element={<SignUser />} />
          <Route path="/login" element={<LoginUser />} />

          {/* PROTECTED ROUTES */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/task/create"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/task/edit/:taskid"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/task/view/:taskid"
            element={
              <ProtectedRoute>
                <ViewTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/create"
            element={
              <ProtectedRoute>
                <UserCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/view/1"
            element={
              <ProtectedRoute>
                <ViewUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/edit/1"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <TeamForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/create"
            element={
              <ProtectedRoute>
                <CreateTeam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/view/1"
            element={
              <ProtectedRoute>
                <ViewTeam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/edit/1"
            element={
              <ProtectedRoute>
                <EditTeam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/role"
            element={
              <ProtectedRoute>
                <RoleForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/role/create"
            element={
              <ProtectedRoute>
                <CreateRole />
              </ProtectedRoute>
            }
          />

          <Route
            path="/role/view/1"
            element={
              <ProtectedRoute>
                <ViewRole />
              </ProtectedRoute>
            }
          />

          <Route
            path="/role/edit/1"
            element={
              <ProtectedRoute>
                <EditRole />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;