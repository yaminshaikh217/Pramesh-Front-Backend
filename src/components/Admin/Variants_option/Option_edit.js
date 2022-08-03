import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";

const Option_edit = () => {
    var iOptionId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var urls = `http://localhost/pramesh/backend/api/all_option_get?iOptionId=${iOptionId}`;
        var url  = 'http://localhost/pramesh/backend/api/option_add';
    }
    else {
        var urls = `https://pramesh.justcodenow.com/backend/api/all_option_get?iOptionId=${iOptionId}`;
        var url  = 'https://pramesh.justcodenow.com/backend/api/option_add';
    }

    let history                     = useHistory();
    const [Variants, setVariants]   = useState("");

    const [OptionName, setOptionName]       = useState("");
    const [Status, setStatus]           = useState("");
    const [TitleError, setTitleError]   = useState("");
  


    function addoption()
    {
        if (OptionName) {
            setTitleError('');
        }
        else {
            setTitleError("Please Enter Option Name");
        }
        
       
        const fd = new FormData();
     
        fd.append('vOptions', OptionName);
        fd.append('eStatus', Status);
        fd.append('iOptionId', iOptionId);
    
        if (OptionName) {
            const dataa = axios.post(url, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        setTimeout(function () {
                            history.push("/admin/variant_option/listing");
                        }, 2000);
                    }
                    else {
                        toast.error(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(error => {
                })
        }

    }

    
    useEffect(()=>{
        axios.get(urls)
        .then(res=>{
            setOptionName(res.data.data.vOptions);
            setVariants(res.data.data.vLabel);
            setStatus(res.data.data.eStatus)
        })
        .catch(err =>{
            
        })
        
    },[])
    


    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Option Edit {Variants}</h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Variants Option information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Variants Name</label>
                                                        <input type="text" id="vTitle" className="form-control" placeholder="Title" value={Variants} readOnly />
                                                      
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Option Name(Red,Black)</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setOptionName(e.target.value)} className="form-control" placeholder="Title" value={OptionName} />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option selected={
                                                                Status=='Inactive' ?
                                                                'selected'
                                                                :
                                                                ''
                                                            } value="inActive">Inactive</option>
                                                            <option selected={
                                                                Status == 'Active' ?
                                                                    'selected'
                                                                    :
                                                                    ''
                                                            }
                                                            value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={addoption} className="btn  btn-primary">Submit</button>
                                                        <Link to='/admin/variant_option/listing'>
                                                            <a><button type="button" className="btn btn-warning">Back</button></a>
                                                        </Link>
                                                       
                                                    </div>
                                                    <ToastContainer
                                                        position="top-right"
                                                        autoClose={5000}
                                                        hideProgressBar={false}
                                                        newestOnTop={false}
                                                        closeOnClick
                                                        rtl={false}
                                                        pauseOnFocusLoss
                                                        draggable
                                                        pauseOnHover
                                                    />
                                                </div>


                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}


export default Option_edit;