import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function TaskForm() {
  // form fields
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [team, setTeam] = useState("");
  const [creation, setCreation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // task data
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // validation errors
  const [errors, setErrors] = useState({});

  // -------------------------------
  // helpers
  const cleanText = (text) => text.trim();

  const onlyValidText = (text) => {
    // letters, numbers, spaces and basic punctuation
    return /^[a-zA-Z0-9\s.,\-_/()#&]+$/.test(text);
  };

  //new constant for filter
  const [statusFilter, setStatusFilter] = useState("all")

  //new constant for CREATION Dates
  const [creationDateFilter, setcreationDateFilter] = useState("")



  const validateForm = () => {
    const newErrors = {};

    const cleanTitle = cleanText(title);
    const cleanTeam = cleanText(team);
    const cleanDescription = cleanText(description);

    // Title
    if (!cleanTitle) {
      newErrors.title = "Title is required.";
    } else if (cleanTitle.length < 3) {
      newErrors.title = "Title must have at least 3 characters.";
    } else if (cleanTitle.length > 50) {
      newErrors.title = "Title cannot be longer than 50 characters.";
    } else if (!onlyValidText(cleanTitle)) {
      newErrors.title = "Title contains invalid characters.";
    }

    // Team
    if (!cleanTeam) {
      newErrors.team = "Team is required.";
    } else if (cleanTeam.length < 2) {
      newErrors.team = "Team must have at least 2 characters.";
    } else if (cleanTeam.length > 30) {
      newErrors.team = "Team cannot be longer than 30 characters.";
    } else if (!onlyValidText(cleanTeam)) {
      newErrors.team = "Team contains invalid characters.";
    }

    // Creation date
    if (!creation) {
      newErrors.creation = "Creation date is required.";
    }

    // Due date
    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    // Date comparison
    if (creation && dueDate) {
      const creationDate = new Date(creation);
      const due = new Date(dueDate);

      if (due < creationDate) {
        newErrors.dueDate = "Due date cannot be earlier than creation date.";
      }
    }

    // Description
    if (!cleanDescription) {
      newErrors.description = "Description is required.";
    } else if (cleanDescription.length < 5) {
      newErrors.description = "Description must have at least 5 characters.";
    } else if (cleanDescription.length > 200) {
      newErrors.description = "Description cannot be longer than 200 characters.";
    } else if (!onlyValidText(cleanDescription)) {
      newErrors.description = "Description contains invalid characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------
  // create task
  const addTask = async () => {
    if (!validateForm()) return;

    const newTask = {
      title: title.trim(),
      status,
      team: team.trim(),
      creation,
      priority,
      description: description.trim(),
      due_date: dueDate,
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
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // -------------------------------
  // edit task
  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title || "");
    setStatus(task.status || "todo");
    setTeam(task.team || "");
    setCreation(task.creation || "");
    setPriority(task.priority || "medium");
    setDescription(task.description || "");
    setDueDate(task.due_date || "");
    setErrors({});
  };

  // -------------------------------
  // update task
  const updateTask = async () => {
    if (!validateForm()) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: title.trim(),
        status,
        team: team.trim(),
        creation,
        priority,
        description: description.trim(),
        due_date: dueDate,
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
    setErrors({});
  };

  // -------------------------------
  //main filter
  let filterTasks = [];


if(statusFilter === "all"){
  filterTasks = tasks;
}else{
filterTasks = tasks.filter((task)=> task.status === statusFilter);
}


if(creationDateFilter !== ""){
  filterTasks = filterTasks.filter((task)=> task.creation === creationDateFilter);
}


  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-12">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 text-uppercase">Task Form</h3>

                  {/* Title */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      className={`form-control form-control-lg border-secondary ${errors.title ? "is-invalid" : ""}`}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </div>

                  {/* Team */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Team"
                      className={`form-control form-control-lg border-secondary ${errors.team ? "is-invalid" : ""}`}
                    />
                    {errors.team && <div className="invalid-feedback">{errors.team}</div>}
                  </div>

                  {/* Creation Date */}
                  <label className="form-label">Creation</label>
                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      value={creation}
                      onChange={(e) => setCreation(e.target.value)}
                      className={`form-control form-control-lg border-secondary ${errors.creation ? "is-invalid" : ""}`}
                    />
                    {errors.creation && <div className="invalid-feedback">{errors.creation}</div>}
                  </div>

                  {/* Due Date */}
                  <label className="form-label">Due Date</label>
                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className={`form-control form-control-lg border-secondary ${errors.dueDate ? "is-invalid" : ""}`}
                    />
                    {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
                  </div>

                  {/* Status */}
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

                  {/* Priority */}
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

                  {/* Description */}
                  <div className="form-outline mb-4">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className={`form-control form-control-lg border-secondary ${errors.description ? "is-invalid" : ""}`}
                      rows="3"
                    ></textarea>
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-end pt-3">
                    <button
                      type="button"
                      className="btn btn-light btn-lg me-2"
                      onClick={clearForm}
                    >
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
          
          
          {/* Filter by status */}

          <div className="my-4">

            <p>filter by STATUS</p>
              <select 

              class="form-select border-secondary" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              >


                <option value="all">All the Status</option>
                <option value="done">Done</option>
                <option value="in_progress">In progress</option>
                <option value="todo">To do</option>
              </select>
          </div>
          {/* ----------------- */}


          {/* Filter by CREATION DATE */}

          <div className="my-4">

            <p>filter by CREATION DATE</p>
            <input
                type="date"
                value={creationDateFilter}
                onChange={(e) => setcreationDateFilter (e.target.value)}
                className={`form-control form-control border-secondary`}
              />
              <button
                      type="button"
                      className="btn btn-primary btn-lg me-2"
                      onClick={() => setcreationDateFilter("")}
                    >
                      Clear
                    </button>

          </div>
          {/* ----------------- */}

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
                {filterTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>
                      <span
                        className={`badge ${
                          task.status === "done"
                            ? "bg-success"
                            : task.status === "in_progress"
                            ? "bg-warning"
                            : "bg-secondary"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>{task.team}</td>
                    <td>{task.creation}</td>
                    <td>
                      <span
                        className={`badge ${
                          task.priority === "high"
                            ? "bg-danger"
                            : task.priority === "medium"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => editTask(task)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {tasks.length === 0 && (
              <p className="text-center mt-3">No tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}