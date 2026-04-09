//import { useNavigate } from "react-router-dom";

export default function AboutPage(){

  //const navigate = useNavigate();

  return (
    <div className="container mt-4">

      <hr />

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow">

            <header className="card-header bg-primary text-white">
              <h4 className="card-title mt-2 mb-0">
                About This Project
              </h4>
            </header>

            <div className="card-body">

              <h5 className="mb-3">Task Management System</h5>

              <p>
                This project is a modern web application built using React, Supabase, and Bootstrap.
                It is designed to help users manage tasks efficiently through a clean and responsive interface.
              </p>

              <p>
                The system allows users to create, edit, view, and delete tasks, as well as manage users,
                teams, and roles. It also includes authentication features such as login and signup,
                ensuring secure access to the application.
              </p>

              <p>
                Throughout the development of this project, key concepts such as CRUD operations,
                route protection, state management, and input validation were implemented to create
                a complete and functional solution.
              </p>

              <hr />

              <h6 className="text-secondary">Technologies Used:</h6>
              <ul>
                <li>React (Frontend)</li>
                <li>Supabase (Backend & Database)</li>
                <li>Bootstrap (UI Design)</li>
              </ul>

              <hr />

              <p className="text-muted mb-0">
                This project demonstrates practical experience in full-stack development,
                combining frontend design, backend integration, and real-world problem solving.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}