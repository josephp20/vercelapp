import { useEffect, useState } from "react";
import { supabase } from '../supabaseClient'; 

export default function TaskForm() {
  // data of each field
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo"); 
  const [team, setTeam] = useState("");
  const [creation, setCreation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // tastk status
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // -------------------------------
  // create task
  const addTask = async () => {
    const newTask = {
      title,
      status,
      team,
      creation,
      priority,
      description,
      due_date: dueDate
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      alert("Error creating task");
    } else {
      setTasks([...tasks, data]);
      clearForm();
    }
  };

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

  // -------------------------------
  // delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // -------------------------------
  // edit task
  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setStatus(task.status);
    setTeam(task.team);
    setCreation(task.creation);
    setPriority(task.priority);
    setDescription(task.description);
    setDueDate(task.due_date);
  };

  // -------------------------------
  // UPDATE
  const updateTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title,
        status,
        team,
        creation,
        priority,
        description,
        due_date: dueDate
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error);
      alert("Error updating task");
    } else {
      setTasks(tasks.map((task) => (task.id === editingId ? data : task)));
      clearForm();
    }
  };

  // -------------------------------
  const clearForm = () => {
    setEditingId(null);
    setTitle("");
    setStatus("todo");
    setTeam("");
    setCreation("");
    setPriority("medium");
    setDescription("");
    setDueDate("");
  };

  // -------------------------------
  return (
    <div className="container-xl">
      <div className="row">

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-12">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 text-uppercase">Task Form</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

                  

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Team"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>
{/*------------------------------Type Date---------------------------------*/}
                  <label className="form-label">Creation</label>
                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      value={creation}
                      onChange={(e) => setCreation(e.target.value)}
                      placeholder="Creation Date"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

                  <label className="form-label">Due Date</label>
                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="Due Date"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

{/*---------------------------------------------------------------*/}


{/*---------------------------Radio Buttons------------------------------------*/}
<label className="form-label">Status</label>
                  <div className="d-md-flex mb-4">
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="todo"
                        checked={status === "todo"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label">To Do</label>
                    </div>
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="in_progress"
                        checked={status === "in_progress"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label">In Progress</label>
                    </div>
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="done"
                        checked={status === "done"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label">Done</label>
                    </div>
                  </div>


{/*---------------------------Radio Buttons------------------------------------*/}
                  <label className="form-label">Priority</label>
                  <div className="d-md-flex mb-4">
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="low"
                        checked={priority === "low"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="medium"
                        checked={priority === "medium"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="high"
                        checked={priority === "high"}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                      <label className="form-check-label">High</label>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className="form-control form-control-lg border-secondary"
                      rows="3"
                    ></textarea>
                  </div>

                 

                  {/* Buttons */}
                  <div className="d-flex justify-content-end pt-3">
                    <button type="button" className="btn btn-light btn-lg me-2" onClick={clearForm}>
                      Clear
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={editingId ? updateTask : addTask}
                    >
                      {editingId ? "Update Task" : "Add Task"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="table-responsive">
            <br />
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
                  <th></th>
                  <th></th>
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
                    <td>
                      <button type="button" className="btn btn-info btn-sm" onClick={() => editTask(task)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>

      </div>
    </div>
  );
}
