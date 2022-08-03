import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');

class Banner_listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
        };
    }

    async componentDidMount() 
    {
        $('.example').DataTable().destroy();
        setTimeout(function () {
            $('.example').DataTable({
                "pageLength": 50
            });
        }, 1000);
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/all_image_content_get';
        }
        else 
        {
            var url = 'https://pramesh.justcodenow.com/backend/api/all_image_content_get';
        }

        const response = await fetch(url);
        const data = await response.json();
        this.setState({ banner: data.data });
    }

    deletedata(e) 
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') 
        {
            var del = 'http://localhost/pramesh/backend/api/image_content_delete';
        }
        else {
            var del = 'https://pramesh.justcodenow.com/backend/api/image_content_delete';
        }

        var iContentId = e.target.id;

        

        const fd = new FormData();
        fd.append('iContentId', iContentId);
        if (iContentId)
        {
            const dataa = axios.post(del, fd)
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
                            window.location.reload(1);
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


    render() {
        var banners = this.state.banner;

        return (
            <>

                <Sidebar />
                <div className="main-content" id="panel" >
                    <Header />
                    {/* <!-- Page content --> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Image Content</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Link to="/admin/image-add">
                                                    <a className="btn myBtn4">Add</a>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table id="example" className="table align-items-center table-flush example">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">AddedDate</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    banners.map((banner,index) =>
                                                    (
                                                        <tr>
                                                            <th>{index+1}</th>
                                                            <td><img className="h-101 w-101" src={banner.vImage} /></td>
                                                            <td>{banner.vTitle}</td>
                                                            <td>{banner.dtAddedDate}</td>
                                                            <td>{banner.eStatus}</td>
                                                            <td>
                                                                <Link to={`/admin/image-content/edit/${banner.iContentId}`}>
                                                                    <a><button className="btn myBtn3">Edit</button>
                                                                    </a>&nbsp;&nbsp;&nbsp;
                                                                </Link>
                                                               

                                                                <button id={`${banner.iContentId}`} className="btn myBtn2" onClick={this.deletedata}>Delete</button>
                                                            </td>

                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
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

                    </div>
                </div>
            </>
        );
    }

}
export default Banner_listing;