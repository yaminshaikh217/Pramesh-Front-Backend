import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";

const Subcategory_edit = () => {
    let history = useHistory();
    const [FabricArray, setFabricArray] = useState([]);

    const [Title, setTitle]             = useState("");
    const [SubTitle, setSubTitle]       = useState("");
    const [ProductType, setProductType] = useState("0");
    const [Status, setStatus]           = useState("");
    const [TitleError, setTitleError]   = useState("");
    const [Fabric, setFabric]           = useState("");
    const [ErrorFabric, setErrorFabric] = useState("");
    const [iFabricId, setiFabricId]     = useState("");
    const [Gif, setGif]                 = useState(false);
    const [Image, setImage]             = useState("");
    const [ImageError, setImageError]   = useState("");
   
    var iSubcategoryId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    function addcategory() 
    {
        if (Title) {
            setTitleError('');
        }
        else {
            setTitleError("Please Enter Title");
        }
        if (Fabric) {
            setErrorFabric('');
        }
        else {
            setErrorFabric('Please Select Main Category');
        }
        if (Image) {
            setImageError('');
        }
        else {
            setImageError("Please Select Image");
        }

        var answer = window.location.href;
        const answer_array = answer.split('/');

        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/subcategory_add';
        }
        else {
            var url = 'https://pramesh.justcodenow.com/backend/api/subcategory_add';
        }
        const fd = new FormData();
        fd.append('iSubcategoryId', iSubcategoryId);
        fd.append('vTitle', SubTitle);
        fd.append('vImage', Image);
        fd.append('ProductType', ProductType);
        fd.append('iFabricId', Fabric);
        fd.append('eStatus', Status);
    
        if (Title && iSubcategoryId && Fabric && Image) {
            setGif(true);
            const dataa = axios.post(url, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        setGif(false);
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
                            history.push("/admin/subcategory/listing/0");
                        }, 2000);
                    }
                    else {
                        setGif(false);
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

    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') 
    {
        var urls = `http://localhost/pramesh/backend/api/all_subcategory_get?iSubcategoryId=${iSubcategoryId}`;
    } 
    else 
    {
        var urls = `https://pramesh.justcodenow.com/backend/api/all_subcategory_get?iSubcategoryId=${iSubcategoryId}`;
    }
    useEffect(()=>{
        axios.get(urls)
        .then(res=>{
            
            setTitle(res.data.data.vTitle);
            setSubTitle(res.data.data.vSubTitle);
            setStatus(res.data.data.eStatus);
            setProductType(res.data.data.vProductType);
            setiFabricId(res.data.data.iFabricId);
            setImage(res.data.data.vImage)
            setFabric(res.data.data.iFabricId);
            setFabricArray(res.data.fabric);
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
                                            <h3 className="mb-0">Sub Category Edit</h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Sub Category information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Category</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" value={Title} readOnly />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Main Category</label>
                                                        <select className="form-control" onChange={(e) => setFabric(e.target.value)}>
                                                            <option value="">Select Main Category</option>
                                                            {FabricArray.map((cat, index) => (
                                                                <option 
                                                                    selected={cat.iFabricId == iFabricId ? 'selected' : ''}
                                                                value={cat.iFabricId}>{cat.vTitle}</option>
                                                            ))}
                                                        </select>

                                                        <span className="red">{ErrorFabric}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">SubCategory Title</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setSubTitle(e.target.value)} className="form-control" placeholder="Title" value={SubTitle} />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vImage">Sub Category Image</label>
                                                        <input type="file" id="vImage" onChange={(e) => setImage(e.target.files[0])} className="form-control vImage" />
                                                        <img src={Image} className="img1 h-101" />
                                                        {
                                                            Image ?
                                                                (<span className="red"></span>)
                                                                :
                                                                (<span className="red">{ImageError}</span>)
                                                        }

                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Select type</label>
                                                        <select className="form-control" onChange={(e) => setProductType(e.target.value)}>
                                                            <option 
                                                                selected={ ProductType == '0' ? 'selected' : '' }
                                                            value="0">Other</option>
                                                            <option 
                                                                selected={ ProductType == '1' ? 'selected' : '' }
                                                            value="1">Main ProductPage Show </option>
                                                        </select>
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
                                                        <button type="button" onClick={addcategory} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to='/admin/subcategory/listing/0'>
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


export default Subcategory_edit;