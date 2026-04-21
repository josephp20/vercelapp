import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust our path

export default function RoleForm() {
  // setting all the data
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [administrator, setAdministrator] = useState("no");

  const [roles, setRoles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // validation errors
  const [errors, setErrors] = useState({});

  // -------------------------------
  // helpers
  const cleanText = (text) => text.trim();

  const onlyValidText = (text) => {
    return /^[a-zA-Z0-9\s.,\-_/()#&]+$/.test(text);
  };

  const validateForm = () => {
    const newErrors = {};

    const cleanTeamName = cleanText(teamName);
    const cleanDescription = cleanText(description);

    // Team Name
    if (!cleanTeamName) {
      newErrors.teamName = "Team name is required.";
    } else if (cleanTeamName.length < 2) {
      newErrors.teamName = "Team name must have at least 2 characters.";
    } else if (cleanTeamName.length > 40) {
      newErrors.teamName = "Team name cannot be longer than 40 characters.";
    } else if (!onlyValidText(cleanTeamName)) {
      newErrors.teamName = "Team name contains invalid characters.";
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
  // create user role
  const addRole = async () => {
    if (!validateForm()) return;

    const newRole = {
      team_name: teamName.trim(),
      description: description.trim(),
      administrator,
    };

    const { data, error } = await supabase
      .from("role")
      .insert([newRole])
      .select()
      .single();

    if (error) {
      console.error("Error adding role:", error);
      alert("Error creating role");
    } else {
      setRoles([...roles, data]);
      clearForm();
    }
  };

  // -------------------------------
  // bring all the data
  useEffect(() => {
    listRoles();
  }, []);

  const listRoles = async () => {
    const { data, error } = await supabase.from("role").select("*");
    if (error) {
      console.error("Error fetching roles:", error);
      alert("No data");
    } else {
      setRoles(data);
    }
  };

  // -------------------------------
  // function of delete
  const deleteRole = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this role?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("role").delete().eq("id", id);

    if (error) {
      console.error("Error deleting role:", error);
      alert("Error deleting role");
    } else {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  // -------------------------------
  const editRole = (role) => {
    setEditingId(role.id);
    setTeamName(role.team_name || "");
    setDescription(role.description || "");
    setAdministrator(role.administrator || "no");
    setErrors({});
  };

  // -------------------------------
  // UPDATE
  const updateRole = async () => {
    if (!validateForm()) return;

    const { data, error } = await supabase
      .from("role")
      .update({
        team_name: teamName.trim(),
        description: description.trim(),
        administrator,
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Error updating role:", error);
      alert("Error updating role");
    } else {
      setRoles(roles.map((role) => (role.id === editingId ? data : role)));
      clearForm();
    }
  };

  // -------------------------------
  const clearForm = () => {
    setEditingId(null);
    setTeamName("");
    setDescription("");
    setAdministrator("no");
    setErrors({});
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
                  <h3 className="mb-5 text-uppercase">Role Form</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                      className={`form-control form-control-lg border-secondary ${errors.teamName ? "is-invalid" : ""}`}
                    />
                    {errors.teamName && (
                      <div className="invalid-feedback">{errors.teamName}</div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className={`form-control form-control-lg border-secondary ${errors.description ? "is-invalid" : ""}`}
                      rows="3"
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </div>

                  <label className="form-label">Administrator</label>
                  <div className="d-md-flex mb-4">
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="yes"
                        checked={administrator === "yes"}
                        onChange={(e) => setAdministrator(e.target.value)}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline me-4">
                      <input
                        className="form-check-input border-secondary"
                        type="radio"
                        value="no"
                        checked={administrator === "no"}
                        onChange={(e) => setAdministrator(e.target.value)}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                  </div>

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
                      onClick={editingId ? updateRole : addRole}
                    >
                      {editingId ? "Update Role" : "Add Role"}
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
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Description</th>
                  <th>Administrator</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.team_name}</td>
                    <td>{role.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          role.administrator === "yes"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {role.administrator}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => editRole(role)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRole(role.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {roles.length === 0 && (
              <p className="text-center mt-3">No roles found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}