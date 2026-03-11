import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Incorrect email or password.");
      return;
    }

    setSuccessMsg("Login successful!");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container">

      <br />
      <hr />

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card">

            <header className="card-header">
              <h4 className="card-title mt-2">
                Welcome to Task Tracker
              </h4>
            </header>

            <article className="card-body">

              {successMsg && (
                <div className="alert alert-success">
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleLogin}>

                <div className="form-group">
                  <label>Email address</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mt-3">

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>

                </div>

              </form>

            </article>

          </div>

        </div>

      </div>

    </div>
  );
}