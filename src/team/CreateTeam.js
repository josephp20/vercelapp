export default function CreateTeam(){
    return(
 <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">

            <div class="col-xl-12">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">Team registration form</h3>


                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example8">Team Name: </label>
                  <input type="text" id="form3Example8" class="form-control form-control-lg" />
                </div>
                
                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example8">Description: </label>
                  <input type="text" id="form3Example8" class="form-control form-control-lg" />
                </div>


                <div class="d-flex justify-content-end pt-3">
                   <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-light btn-lg"><a href="/team">Back</a></button>
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