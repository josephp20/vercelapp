export default function CreateTask(){
    return(

    <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">

            <div class="col-xl-12">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">Task registration form</h3>

                <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example8">Task Title</label>
                  <input type="text" id="form3Example8" class="form-control form-control-lg" />
                </div>

                 <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example9">Description</label>
                  <input type="text" id="form3Example9" class="form-control form-control-lg" />
                </div>

                 <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example9">Creation Date</label>
                  <input type="text" id="form3Example9" class="form-control form-control-lg" />
                </div>

                 <div data-mdb-input-init class="form-outline mb-4">
                  <label class="form-label" for="form3Example9">Due Date</label>
                  <input type="text" id="form3Example9" class="form-control form-control-lg" />
                </div>

                <label class="form-label" for="form3Example9">Status</label>
                <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">


                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label class="form-check-label" >Pending</label>
                  </div>

                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label">Finished</label>
                  </div>

                  

                </div>

                <div class="row">

                  <div class="col-md-6 mb-4">

                    <select data-mdb-select-init>
                      <option value="1">Engineering Team</option>
                      <option value="2">Marketing Team</option>
                      <option value="3">Design Team</option>
                      <option value="4">Sales Team</option>
                    </select>

                  </div>
                  <div class="col-md-6 mb-4">

                    <select data-mdb-select-init>
                      <option value="1">High Priority</option>
                      <option value="3">Medium Priority</option>
                      <option value="4">Low Priority</option>
                    </select>

                  </div>
                </div>

                <div class="d-flex justify-content-end pt-3">
                   <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-light btn-lg"><a href="/">Back</a></button>
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