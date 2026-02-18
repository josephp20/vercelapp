export default function SignUser(){
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
              <form>
                <div className="form-row">
                  <div className="col form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="col form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" />
                  <small className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>


                

                <div className="form-group">
                  <label>Create password</label>
                  <input type="password" className="form-control" />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
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