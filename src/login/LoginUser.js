export default function Login(){
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
              <form>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" />
                </div>
                

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" />
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