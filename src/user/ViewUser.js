export default function ViewUser(){
    return(

    <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">

            <div class="col-xl-12">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">View User Registration </h3>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <label class="form-label" for="form3Example1m1">First Name</label>
                      <input type="text" id="form3Example1m1" class="form-control form-control-lg" />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <label class="form-label" for="form3Example1n1">Last Name</label>
                      <input type="text" id="form3Example1n1" class="form-control form-control-lg" />
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example8">Email</label>
                  <input type="text" id="form3Example8" class="form-control form-control-lg" />
                </div>
                
                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example8">Password</label>
                  <input type="text" id="form3Example8" class="form-control form-control-lg" />
                </div>

                <label class="form-label" for="form3Example9">Role</label>
                <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">


                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label class="form-check-label" >User</label>
                  </div>

                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label">Admin</label>
                  </div>

                  

                </div>


                <div class="d-flex justify-content-end pt-3">
                   <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-light btn-lg"><a href="/user">Back</a></button>
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg ms-2">Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

       
    )
}