import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const News_Edit = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    var iNewsLetterId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    const [Email, setEmail] = useState("");
    const [EmailError, setEmailError] = useState("");

    const [Gif, setGif] = useState(false);

    function Editcolor() 
    {

        if (Email) {
            setEmailError('');
        }
        else {
            setEmailError("Please Enter Email Address");
        }

        if (answer_array[2] == 'localhost:3000') {
            var url = `http://localhost/pramesh/backend/api/News_letter_add?iNewsLetterId=${iNewsLetterId}`;
        }
        else {
            var url = `https://pramesh.justcodenow.com/backend/api/News_letter_add?iNewsLetterId=${iNewsLetterId}`;
        }
        const fd = new FormData();
        fd.append('vEmail', Email);
        if (Email) {
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
                            history.push("/admin/newsletter");
                            // window.location.reload(1);
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

   
    if (answer_array[2] == 'localhost:3000') {
        var url = `http://localhost/pramesh/backend/api/all_news_letter_get?iNewsLetterId=${iNewsLetterId}`;
    }
    else {
        var url = `https://pramesh.justcodenow.com/backend/api/all_news_letter_get?iNewsLetterId=${iNewsLetterId}`;
    }

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setEmail(res.data.data.vEmail);
             
            })
            .catch(err => {
                
            })

    }, [])

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
                                            <h3 className="mb-0">News Letter Edit</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">News Letter information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Color</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setEmail(e.target.value)} value={Email} className="form-control" placeholder="Email" />
                                                        <span className="red">{EmailError}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={Editcolor} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to='/admin/newsletter'>
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

export default News_Edit;