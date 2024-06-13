import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
function EditMed() {
    const {medId} = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    var user = useSelector(store=>store.auth.user);
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medId,
        {
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiryDate(response.data.expiry_date);
        })
    },[medId,user.token]);
    function updateMed(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+medId,{
            name: name,
            company: company,
            expiry_date:expiry_date
        },{
            headers:{'Authorization':"Bearer "+ user.token}
        }).then(response=>{
            alert(response.data.message)
        })
        navigate('/medicine');
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Medicine</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input
                        type="text"
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry_Date:</label>
                        <input
                        type="date"
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setExpiryDate(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updateMed}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}
export default checkAuth(EditMed);