import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";

const Variants_edit = () => {
    var iVariantId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    var answer      = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var urls = `http://localhost/pramesh/backend/api/all_variants_get?iVariantId=${iVariantId}`;
        var url  = 'http://localhost/pramesh/backend/api/variants_add';
    }
    else {
        var urls = `https://pramesh.justcodenow.com/backend/api/all_variants_get?iVariantId=${iVariantId}`;
        var url  = 'https://pramesh.justcodenow.com/backend/api/variants_add';
    }

   
    let history                         = useHistory();
    const [Title, setTitle]             = useState("");
    const [Status, setStatus]           = useState("");
    const [TitleError, setTitleError]   = useState("");
    

    function addcategory() 
    {
        if (Title) {
            setTitleError('');
        }
        else {
            setTitleError("Please Enter Title");
        }
      
    
        const fd = new FormData();
        fd.append('vLabel', Title);
        fd.append('eStatus', Status);
        fd.append('iVariantId', iVariantId);
        if (Title && Status && iVariantId) {
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
                            history.push("/admin/variants/listing");
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
            console.log(res);
            setTitle(res.data.data.vLabel);
            setStatus(res.data.data.eStatus)
        })
        .catch(err =>{
            console.log(err);
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
                                            <h3 className="mb-0">Variant Edit</h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Variants information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Variant Name(Size,Color)</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" value={Title} />
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
                                                        <button type="button" onClick={addcategory} className="btn  btn-primary">Submit</button>
                                                        <Link to='/admin/variants/listing'>
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


export default Variants_edit;