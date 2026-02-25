import { useState } from "react";
import { supabase } from "../supabaseClient";


export default function SignUser(){

const [fname, setFname]= useState('');
const [lname, setLname]= useState('');
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

//---messages
const [successMsg, setSuccessMsg] = useState("");
const [errorMsg, setErrorMsg] = useState("");
const [loading, setLoading] = useState(false);


//--click
const registerUser = async (e) => { e.preventDefault();


  const cleanEmail = email.trim().toLowerCase();

  //--clean forms
setSuccessMsg("");
setErrorMsg("");

//--validation
if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
  setErrorMsg("Please fill in all fields.");
  return;
}
//--activate
setLoading(true);

//------------------------------------------------
  //--validate the email
const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (checkError) {
    setLoading(false);
    setErrorMsg("Error verificando el correo.");
    return;
  }

  if (existingUser) {
    setLoading(false);
    setErrorMsg("Este correo ya está registrado.");
    return;
  }
//--add data supabase
const { data, error } = await supabase
  .from("users")
  .insert([
    {
      fname: fname,
      lname: lname,
      email: cleanEmail,
      password: password
    },
  ])
  .select()
  .single();

//-----------------------------------------------
  setLoading(false);

  if (error) {
  console.error("Register error:", error);
  setErrorMsg("Registration failed. Check console for details.");
  return;
}
 setSuccessMsg(`User registered successfully (ID: ${data.id})`);
  
 //--clearform
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
              <h4 className="card-title mt-2">Task Tracker Sign up</h4>
            </header>

            <article className="card-body">
              {/* Messages */}
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
                  <small className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
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

                <div className="form-group">
                  <button type="submit"
                    disabled={loading} className="btn btn-primary btn-block">
                    {/*setting the state*/}
                    {loading ? "Registering..." : "Register"}

                  </button>
                </div>

                <small className="text-muted">
                  By clicking the 'Sign Up' button, you confirm that you accept
                  our Terms of use and Privacy Policy.
                </small>
              </form>
            </article>

            <div className="border-top card-body text-center">
              Have an account? <a href="/login">Log In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
       
    );
}