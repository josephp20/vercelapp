import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignUser(){

const [fname, setFname]= useState('');
const [lname, setLname]= useState('');
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [successMsg, setSuccessMsg] = useState("");
const [errorMsg, setErrorMsg] = useState("");
const [loading, setLoading] = useState(false);

const registerUser = async (e) => {
  e.preventDefault();

  const cleanFname = fname.trim();
  const cleanLname = lname.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  setSuccessMsg("");
  setErrorMsg("");

  if (!cleanFname || !cleanLname || !cleanEmail || !cleanPassword) {
    setErrorMsg("Please fill in all fields.");
    return;
  }

  setLoading(true);

  const { error: authError } = await supabase.auth.signUp({
    email: cleanEmail,
    password: cleanPassword,
  });

  if (authError) {
    setLoading(false);
    setErrorMsg(authError.message);
    return;
  }

  const { error } = await supabase
  .from("users")
  .insert([
    {
      fname: cleanFname,
      lname: cleanLname,
      email: cleanEmail
    }
  ]);

  setLoading(false);

  if (error) {
    setErrorMsg("Error saving user profile.");
    return;
  }

  setSuccessMsg("User registered successfully!");

  setFname("");
  setLname("");
  setEmail("");
  setPassword("");
};

return(
<div className="container">

<br />
<hr />

<div className="row justify-content-center">

<div className="col-md-6">

<div className="card">

<header className="card-header">
<h4 className="card-title mt-2">
Task Tracker Sign up
</h4>
</header>

<article className="card-body">

{successMsg && <div className="alert alert-success">{successMsg}</div>}
{errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

<form onSubmit={registerUser}>

<div className="form-row">

<div className="col form-group">
<label>First name</label>
<input
type="text"
className="form-control"
value={fname}
onChange={(e) => setFname(e.target.value)}
/>
</div>

<div className="col form-group">
<label>Last name</label>
<input
type="text"
className="form-control"
value={lname}
onChange={(e) => setLname(e.target.value)}
/>
</div>

</div>

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

<label>Create password</label>

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
disabled={loading}
className="btn btn-primary btn-block"
>

{loading ? "Registering..." : "Register"}

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