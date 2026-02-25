import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login(){

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

    setLoading(false);

    if (error) {
      console.error("Login error:", error);
      setErrorMsg("Error verifying user.");
      return;
    }

    if (!user) {
      setErrorMsg("User does not exist.");
      return;
    }

    if (user.password !== cleanPassword) {
      setErrorMsg("Incorrect password.");
      return;
    }

    // Login sucess
    setSuccessMsg(`Welcome ${user.fname} ${user.lname}!`);
  };
    return(

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
              {/*Confirmation Messages*/}
              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
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