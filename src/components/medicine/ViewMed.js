import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";


function ViewMed() {
    var {medId} = useParams()
    var [medicine,setMedicines] = useState({name:'',company:'',expiry_date:''})
    var user = useSelector(store=>store.auth.user);
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medId,
        {
            headers:{'Authorization':"Bearer "+user.token}
        })
        .then(response=>{
            setMedicines(response.data)
        })
    },[medId,user]);
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header"><h3>{medicine.name}</h3></div>
                        <div className="card-body">{medicine.company}</div>
                        <div className="card-body">{medicine.expiry_date}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewMed);