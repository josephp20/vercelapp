import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TaskDashboard() {

  //bring the data from the table tasks, and user
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
  //bring the data from the table tasks, and user
    const [pending, setPending] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [completed, setCompleted] = useState(0);

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

      //new code to bring the data from the tasks
      const pendingCount = data.filter((task) => task.status === "todo").length;
      const inProgressCount = data.filter((task) => task.status === "in_progress").length;
      const completedCount = data.filter((task) => task.status === "done").length;

      setPending(pendingCount);
      setInProgress(inProgressCount);
      setCompleted(completedCount);
    }
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
          <div className="card bg-primary-subtle text-primary border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="card-title">Pending Tasks</h5>
                      
              {/* Task summary cards */}
                      <p className="card-text">{pending}</p>
              {/* Task summary cards */}

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-info bg-info-subtle shadow-sm  border-0 rounded-3">
            <div className="card-body">
              <h5 className="card-title">In Progress</h5>
              {/* Task summary cards */}
                      <p className="card-text">{inProgress}</p>
              {/* Task summary cards */}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-sucess bg-success-subtle border-0 rounded-3">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              {/* Task summary cards */}
                      <p className="card-text">{completed}</p>
              {/* Task summary cards */}
            </div>
          </div>
        </div>

      </div>


      {/* Task table */}

      <div className="row">

        <div className="col-md-12">

          <h4>My Tasks</h4>
        
         {/*table responsive */}
         <div class="table-responsive">
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
            {/*table responsive */}

        </div>

      </div>

    </div>

  );
}