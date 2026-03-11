import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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

    // Buscar usuario
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (error) {
      console.error("Login error:", error);
      setErrorMsg("Error verifying user.");
      setLoading(false);
      return;
    }

    if (!user) {
      setErrorMsg("User does not exist.");
      setLoading(false);
      return;
    }

    if (user.password !== cleanPassword) {
      setErrorMsg("Incorrect password.");
      setLoading(false);
      return;
    }

    // Login success
    setSuccessMsg(`Welcome ${user.fname} ${user.lname}!`);

    // Redirect to the page user tried to open
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 600);

    setLoading(false);
  };

  return (
    <div className="container">
      <br />
      <hr />

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <header className="card-header">
              <h4 className="card-title mt-2">Welcome to Task Tracker</h4>
            </header>

            <article className="card-body">
              {/* Confirmation Messages */}
              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Log In
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