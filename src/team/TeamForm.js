import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function TeamForm() {
  // ---------------------------
  // FORM STATE
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [administrator, setAdministrator] = useState("");

  // ---------------------------
  // data
  const [teams, setTeams] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // validation errors
  const [errors, setErrors] = useState({});

  // ---------------------------
  // helpers
  const cleanText = (text) => text.trim();

  const onlyValidText = (text) => {
    return /^[a-zA-Z0-9\s.,\-_/()#&]+$/.test(text);
  };

  const validateForm = () => {
    const newErrors = {};

    const cleanTeamName = cleanText(teamName);
    const cleanDescription = cleanText(description);
    const cleanAdministrator = cleanText(administrator);

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

    // Administrator
    if (!cleanAdministrator) {
      newErrors.administrator = "Administrator is required.";
    } else if (cleanAdministrator.length < 2) {
      newErrors.administrator = "Administrator must have at least 2 characters.";
    } else if (cleanAdministrator.length > 50) {
      newErrors.administrator = "Administrator cannot be longer than 50 characters.";
    } else if (!onlyValidText(cleanAdministrator)) {
      newErrors.administrator = "Administrator contains invalid characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------
  // grab information teams
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
      alert("Error loading teams");
    } else {
      setTeams(data);
    }
  };

  // ---------------------------
  // ADD TEAM
  const addTeam = async () => {
    if (!validateForm()) return;

    const { data, error } = await supabase
      .from("team")
      .insert([
        {
          team_name: teamName.trim(),
          description: description.trim(),
          administrator: administrator.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      alert("Error creating team");
    } else {
      setTeams([...teams, data]);
      clearForm();
    }
  };

  // ---------------------------
  // DELETE TEAM
  const deleteTeam = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("team").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Error deleting team");
    } else {
      setTeams(teams.filter((team) => team.id !== id));
    }
  };

  // ---------------------------
  // LOAD INFO TEAM
  const editTeam = (team) => {
    setEditingId(team.id);
    setTeamName(team.team_name || "");
    setDescription(team.description || "");
    setAdministrator(team.administrator || "");
    setErrors({});
  };

  // ---------------------------
  // UPDATE TEAM
  const updateTeam = async () => {
    if (!validateForm()) return;

    const { data, error } = await supabase
      .from("team")
      .update({
        team_name: teamName.trim(),
        description: description.trim(),
        administrator: administrator.trim(),
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      alert("Error updating team");
    } else {
      setTeams(teams.map((team) => (team.id === editingId ? data : team)));
      clearForm();
    }
  };

  // ---------------------------
  const clearForm = () => {
    setEditingId(null);
    setTeamName("");
    setDescription("");
    setAdministrator("");
    setErrors({});
  };

  // ---------------------------
  return (
    <div className="container mt-5">
      <div className="row">
        {/* FORM */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h3 className="mb-4">
              {editingId ? "Update Team" : "Add Team"}
            </h3>

            <input
              type="text"
              className={`form-control mb-3 ${errors.teamName ? "is-invalid" : ""}`}
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            {errors.teamName && (
              <div className="invalid-feedback d-block">{errors.teamName}</div>
            )}

            <textarea
              className={`form-control mb-3 ${errors.description ? "is-invalid" : ""}`}
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">{errors.description}</div>
            )}

            <input
              type="text"
              className={`form-control mb-3 ${errors.administrator ? "is-invalid" : ""}`}
              placeholder="Administrator"
              value={administrator}
              onChange={(e) => setAdministrator(e.target.value)}
            />
            {errors.administrator && (
              <div className="invalid-feedback d-block">{errors.administrator}</div>
            )}

            <div className="d-flex justify-content-end pt-3">
              <button className="btn btn-light btn-lg" onClick={clearForm}>
                Clear
              </button>

              <button
                type="button"
                className="btn btn-primary btn-lg ms-2"
                onClick={editingId ? updateTeam : addTeam}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Administrator</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.team_name}</td>
                  <td>{team.description}</td>
                  <td>{team.administrator}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editTeam(team)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTeam(team.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {teams.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No teams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}