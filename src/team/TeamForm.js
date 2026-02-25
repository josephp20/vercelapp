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
    } else {
      setTeams(data);
    }
  };

  // ---------------------------
  // ADD TEAM
  const addTeam = async () => {
    const { data, error } = await supabase
      .from("team")
      .insert([
        {
          team_name: teamName,
          description: description,
          administrator: administrator,
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
    const { error } = await supabase
      .from("team")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
    } else {
      setTeams(teams.filter((team) => team.id !== id));
    }
  };

  // ---------------------------
  // LOAD INFO TEAM
  const editTeam = (team) => {
    setEditingId(team.id);
    setTeamName(team.team_name);
    setDescription(team.description);
    setAdministrator(team.administrator);
  };

  // ---------------------------
  // UPDATE TEAM
  const updateTeam = async () => {
    const { data, error } = await supabase
      .from("team")
      .update({
        team_name: teamName,
        description: description,
        administrator: administrator,
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      alert("Error updating team");
    } else {
      setTeams(
        teams.map((team) =>
          team.id === editingId ? data : team
        )
      );
      clearForm();
    }
  };

  // ---------------------------
  const clearForm = () => {
    setEditingId(null);
    setTeamName("");
    setDescription("");
    setAdministrator("");
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
              className="form-control mb-3"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Administrator"
              value={administrator}
              onChange={(e) => setAdministrator(e.target.value)}
            />


                <div class="d-flex justify-content-end pt-3">

                        

                        <button className="btn btn-light btn-lg" onClick={clearForm}>Clear </button>


                        <button type="button" className="btn btn-primary btn-lg ms-2"
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