import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TeamForm(){

    //writing a promise catching the data from our server
const[teams,setTeam]=useState([]);

//writing a promise catching the data from our server
useEffect(() => {
    fetch('http://localhost:8000/team')
        .then((res) => res.json())   // ← aquí estaba el error
        .then((data) => 
            setTeam(data)).catch((err)=>
                console.log(err.message))
    },[])


    return(  
        <div class="container-xl">
    <div class="table-responsive">
            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">

            <Link to="/team/create" class="text-light btn btn-primary">Add new Team </Link>
            
        </div>

        <br></br>

        <div class="table-wrapper">

            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Id <i class="fa fa-sort"></i></th>
                        <th>Team Name <i class="fa fa-sort"></i></th>
                        <th>Description</th>
                        <th>Administrator <i class="fa fa-sort"></i></th>

                    </tr>
                </thead>
                <tbody>
                    {
                      teams &&  teams.map((item)=>(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.email}</td>
                        <td>
                            <a href="/team/view/1" className="btn btn-info btn-sm">View</a>
                            <a href="/team/edit/1" className="btn btn-warning btn-sm">Edit</a>
                            <a href="/team" className="btn btn-danger btn-sm">Delete</a>
                        </td>
                    </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
    </div>  
</div>   

     )
}