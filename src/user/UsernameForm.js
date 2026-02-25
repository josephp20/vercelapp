import { useEffect, useState } from "react";
import { supabase } from '../supabaseClient'; // Ajusta la ruta según tu carpeta


export default function UserForm(){
    const [fname, setNewFname]= useState('');
    const [lname, setNewLname]= useState('');
    const [mail, setNewMail]= useState('');
    const [password, setNewPassword]= useState('');
    const [role, setRole] = useState("user");
    //list all users
    const [users, setUsersAll]= useState([]);

    //update
    const [editingId, setEditingId] = useState(null);

 const clearForm = () => {
    setEditingId(null);
    setNewFname("");
    setNewLname("");
    setNewMail("");
    setNewPassword("");
  };

    /*Create User*/
    const addUser = async () => {
        const newUser = {
            fname: fname,
            lname: lname,
            email: mail,
            password: password,
            role: role, 
        }
        const {data, error}= await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()
        
        if(error){
            console.error('no user', error)
            alert("User created sucessfully")
        }else{
          //  console.log('new user', data)
            setUsersAll([...users,data])

            //clean data
            setNewFname("");
            setNewLname("");
            setNewMail("");
            setNewPassword("");
            setRole("user"); // start

            //---------------
            clearForm();
        }
    }



    /*List User*/

    useEffect(()=> {
        ListUser()
    },[])
    const ListUser = async () => {
        
        const {data, error}= await supabase.from('users').select('*')
        if(error){
            console.error('no user', error)
            alert("no data")
        }else{
            setUsersAll(data)
        }
    }


    /*Delete User*/
    const deleteUser = async (id) => {
        
        const {error}= await supabase.from('users')
        .delete()
        .eq('id',id)

        if(error){
            console.error('no delete', error)
        }else{
            setUsersAll(users.filter((users)=> users.id !== id));
        }
    }

   /*Update User*/

   const editUser = (user) => {
        setEditingId(user.id);
        setNewFname(user.fname);
        setNewLname(user.lname);
        setNewMail(user.email);
        setNewPassword(user.password);
        setRole(user.role);
        };

    const updateUser = async () => {
  const { data, error } = await supabase
    .from("users")
    .update({
      fname: fname,
      lname: lname,
      email: mail,
      password: password,
      role: role,
    })
    .eq("id", editingId)
    .select()
    .single();

  if (error) {
    console.error("Update error:", error);
    alert("Error updating user");
  } else {
    // actualizar estado sin recargar
    setUsersAll(
      users.map((user) =>
        user.id === editingId ? data : user
      )
    );

    // limpiar formulario
    setEditingId(null);
    setNewFname("");
    setNewLname("");
    setNewMail("");
    setNewPassword("");
    setRole("user");
  }
};
    return(  
    <div class="container-xl">
        <div class="row">

            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card card-registration my-4">
          <div class="row g-0">

            <div class="col-xl-12">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">User form</h3>

                <div class="row">
                  <div class="col-md-12 mb-12">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" value={fname} onChange={(e)=> setNewFname(e.target.value)} placeholder="First Name" class="form-control form-control-lg border-secondary"/>
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" value={lname} onChange={(e)=> setNewLname(e.target.value)}  placeholder="Last Name" class="form-control form-control-lg border-secondary" />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" value={mail} onChange={(e)=> setNewMail(e.target.value)}  placeholder="Email" class="form-control form-control-lg border-secondary" />
                </div>
                
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" value={password} onChange={(e)=> setNewPassword(e.target.value)} placeholder="Password" class="form-control form-control-lg border-secondary"  />
                </div>

                                <label class="form-label" for="form3Example9">Role</label>
                <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">


                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input border-secondary"
                    type="radio"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}/>{" "}
                    <label class="form-check-label" >User</label>
                  </div>

                  <div class="form-check form-check-inline mb-0 me-4">
                    <input class="form-check-input border-secondary"
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}/>{" "}
                    <label class="form-check-label">Admin</label>
                  </div>


                  

                           
                </div>


                <div class="d-flex justify-content-end pt-3">
                   <button  type="button"  class="btn btn-light btn-lg"  onClick={clearForm} >Clear</button>
                  <button
                        onClick={editingId ? updateUser : addUser}
                        type="button"
                        className="btn btn-primary btn-lg ms-2"
                        >
                         {editingId ? "Update User" : "Submit form"} 
                  
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
            
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
                
        <div class="table-responsive">
            
        <br></br>

        <div class="table-wrapper">

            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th># <i class="fa fa-sort"></i></th>
                        <th>Fist Name <i class="fa fa-sort"></i></th>
                        <th>Last Name <i class="fa fa-sort"></i></th>
                        <th>Email</th>
                        <th>Password <i class="fa fa-sort"></i></th>
                        <th>Role</th>
                        <th>Date<i class="fa fa-sort"></i></th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                        {users.map((addUser)=> (
                            <tr>
                            <td key={addUser.id}> {addUser.id}</td>
                            <td key={addUser.fname}> {addUser.fname}</td>
                            <td key={addUser.lname}> {addUser.lname}</td>
                            <td key={addUser.email}> {addUser.email}</td>
                            <td key={addUser.password}> {addUser.password}</td>
                            
                            <td>
                                 <span
                                    className={`badge ${
                                        addUser.role === "admin" ? "bg-success" : "bg-secondary"
                                    }`}
                                >
                                    {addUser.role ?? "User"}
                                </span>
                            </td>

                            <td key={addUser.date}> {addUser.date}</td>

                                <td>
                                    <button 
                                            onClick={() => editUser(addUser)} type="button" className="btn btn-info btn-sm">edit
                                    </button>                                    
                                </td>
                                <td>

                                    <button onClick={()=> deleteUser(addUser.id)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-sm">delete</button>                                    

                                </td>
                            </tr>

                        ))}
                        
                        
       
                </tbody>
            </table>
            
        </div>
    </div> 
             </div>
        </div>

            
     
</div>   

     )
}
