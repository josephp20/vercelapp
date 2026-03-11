import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TaskDashboard() {

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    const getSession = async () => {

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      if (data.session) {
        setUserEmail(data.session.user.email);
      }

    };

    getSession();

  }, []);

  //list task

    const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  // -------------------------------
  // listing tasks
  useEffect(() => {
    listTasks();
  }, []);

  const listTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks:", error);
      alert("No data");
    } else {
      setTasks(data);
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (

    <div className="container">

      <div className="row mb-4">

        <div className="col-md-12">

          <h2>
            Dashboard
          </h2>

          <p>
            Welcome <strong>{userEmail}</strong>
          </p>


        </div>

      </div>


      {/* Task summary cards */}

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Pending Tasks</h5>
              <p className="card-text">5</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">In Progress</h5>
              <p className="card-text">3</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              <p className="card-text">8</p>
            </div>
          </div>
        </div>

      </div>


      {/* Task table */}

      <div className="row">

        <div className="col-md-12">

          <h4>My Tasks</h4>

         <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Team</th>
                  <th>Creation</th>
                  <th>Priority</th>
                  <th>Description</th>
                  <th>Due Date</th>

                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>
                      <span className={`badge ${task.status === "done" ? "bg-success" : task.status === "in_progress" ? "bg-warning" : "bg-secondary"}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>{task.team}</td>
                    <td>{task.creation}</td>
                    <td>
                      <span className={`badge ${task.priority === "high" ? "bg-danger" : task.priority === "medium" ? "bg-primary" : "bg-secondary"}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    
                  </tr>
            ))}
            </tbody>
        </table>

        </div>

      </div>

    </div>

  );
}