import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Ajusta la ruta según tu carpeta

export default function UserForm() {
  const [fname, setNewFname] = useState("");
  const [lname, setNewLname] = useState("");
  const [mail, setNewMail] = useState("");
  const [password, setNewPassword] = useState("");
  const [role, setRole] = useState("user");

  // list all users
  const [users, setUsersAll] = useState([]);

  // update
  const [editingId, setEditingId] = useState(null);

  // messages
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const clearForm = () => {
    setEditingId(null);
    setNewFname("");
    setNewLname("");
    setNewMail("");
    setNewPassword("");
    setRole("user");
    setErrorMsg("");
    setSuccessMsg("");
  };

  const validateForm = () => {
    setErrorMsg("");
    setSuccessMsg("");

    const cleanFname = fname.trim();
    const cleanLname = lname.trim();
    const cleanEmail = mail.trim().toLowerCase();
    const cleanPassword = password.trim();

    // required fields
    if (!cleanFname || !cleanLname || !cleanEmail || !cleanPassword) {
      setErrorMsg("All fields are required.");
      return false;
    }

    // first name validation
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(cleanFname)) {
      setErrorMsg("First name can only contain letters.");
      return false;
    }

    // last name validation
    if (!nameRegex.test(cleanLname)) {
      setErrorMsg("Last name can only contain letters.");
      return false;
    }

    // min/max lengths
    if (cleanFname.length < 2 || cleanFname.length > 30) {
      setErrorMsg("First name must be between 2 and 30 characters.");
      return false;
    }

    if (cleanLname.length < 2 || cleanLname.length > 30) {
      setErrorMsg("Last name must be between 2 and 30 characters.");
      return false;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg("Invalid email format.");
      return false;
    }

    // password validation
    if (cleanPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return false;
    }

    if (cleanPassword.length > 20) {
      setErrorMsg("Password cannot be longer than 20 characters.");
      return false;
    }

    // avoid spaces-only password
    if (cleanPassword.includes(" ")) {
      setErrorMsg("Password cannot contain spaces.");
      return false;
    }

    // duplicate email validation
    const emailExists = users.some(
      (user) =>
        user.email?.toLowerCase() === cleanEmail &&
        user.id !== editingId
    );

    if (emailExists) {
      setErrorMsg("Email already exists.");
      return false;
    }

    return true;
  };

  /* List User */
  const ListUser = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("no user", error);
      setErrorMsg("Could not load users.");
    } else {
      setUsersAll(data || []);
    }
  };

  useEffect(() => {
    ListUser();
  }, []);

  /* Create User */
  const addUser = async () => {
    if (!validateForm()) return;

    const newUser = {
      fname: fname.trim(),
      lname: lname.trim(),
      email: mail.trim().toLowerCase(),
      password: password.trim(),
      role: role,
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error("no user", error);
      setErrorMsg("Error creating user.");
    } else {
      setUsersAll([...users, data]);
      setSuccessMsg("User created successfully.");
      clearForm();
    }
  };

  /* Delete User */
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("no delete", error);
      setErrorMsg("Error deleting user.");
    } else {
      setUsersAll(users.filter((user) => user.id !== id));
      setSuccessMsg("User deleted successfully.");
    }
  };

  /* Edit User */
  const editUser = (user) => {
    setEditingId(user.id);
    setNewFname(user.fname || "");
    setNewLname(user.lname || "");
    setNewMail(user.email || "");
    setNewPassword(user.password || "");
    setRole(user.role || "user");
    setErrorMsg("");
    setSuccessMsg("");
  };

  /* Update User */
  const updateUser = async () => {
    if (!validateForm()) return;

    const { data, error } = await supabase
      .from("users")
      .update({
        fname: fname.trim(),
        lname: lname.trim(),
        email: mail.trim().toLowerCase(),
        password: password.trim(),
        role: role,
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      setErrorMsg("Error updating user.");
    } else {
      setUsersAll(users.map((user) => (user.id === editingId ? data : user)));
      setSuccessMsg("User updated successfully.");
      clearForm();
    }
  };

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-12">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-4 text-uppercase">User form</h3>

                  {errorMsg && (
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  {successMsg && (
                    <div className="alert alert-success" role="alert">
                      {successMsg}
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          value={fname}
                          onChange={(e) => setNewFname(e.target.value)}
                          placeholder="First Name"
                          className="form-control form-control-lg border-secondary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      value={lname}
                      onChange={(e) => setNewLname(e.target.value)}
                      placeholder="Last Name"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      value={mail}
                      onChange={(e) => setNewMail(e.target.value)}
                      placeholder="Email"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Password"
                      className="form-control form-control-lg border-secondary"
                    />
                  </div>

                  <label className="form-label">Role</label>
                  <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                    <div className="form-check form-check-inline mb-0 me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="user"
                        checked={role === "user"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label">User</label>
                    </div>

                    <div className="form-check form-check-inline mb-0 me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="admin"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label">Admin</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button
                      type="button"
                      className="btn btn-light btn-lg"
                      onClick={clearForm}
                    >
                      Clear
                    </button>

                    <button
                      onClick={editingId ? updateUser : addUser}
                      type="button"
                      className="btn btn-primary btn-lg ms-2"
                    >
                      {editingId ? "Update User" : "Submit form"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="table-responsive">
            <br />

            <div className="table-wrapper">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {user.role ?? "user"}
                          </span>
                        </td>
                        <td>{user.date}</td>
                        <td>
                          <button
                            onClick={() => editUser(user)}
                            type="button"
                            className="btn btn-info btn-sm"
                          >
                            edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteUser(user.id)}
                            type="button"
                            className="btn btn-danger btn-sm"
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}