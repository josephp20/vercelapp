import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // needed for collapse

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

// Only Team
import TeamForm from './team/TeamForm';
import CreateTeam from './team/CreateTeam';
import ViewTeam from './team/ViewTeam';
import EditTeam from './team/EditTeam';

// Only Role
import RoleForm from './role/RoleForm';
import CreateRole from './role/CreateRole';
import ViewRole from './role/ViewRole';
import EditRole from './role/EditRole';


import './App.css';
//import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5 py-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Task Manager</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/user">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/role">Roles</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/team">Team</Link>
              </li>
             

              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>


            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container">
        <Routes>
          <Route path="/" element={<TaskForm />} />
          <Route path="/task/create" element={<CreateTask />} />
          <Route path="/task/edit/:taskid" element={<EditTask />} />
          <Route path="/task/view/:taskid" element={<ViewTask />} />

          <Route path="/user" element={<UserForm />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/view/1" element={<ViewUser />} />
          <Route path="/user/edit/1" element={<EditUser />} />
          <Route path="/signup" element={<SignUser />} />
          <Route path="/login" element={<LoginUser />} />

          <Route path="/team" element={<TeamForm />} />
          <Route path="/team/create" element={<CreateTeam />} />
          <Route path="/team/view/1" element={<ViewTeam />} />
          <Route path="/team/edit/1" element={<EditTeam />} />

          <Route path="/role" element={<RoleForm />} />
          <Route path="/role/create" element={<CreateRole />} />
          <Route path="/role/view/1" element={<ViewRole />} />
          <Route path="/role/edit/1" element={<EditRole />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;