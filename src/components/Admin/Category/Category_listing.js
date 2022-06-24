import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class Category_listing extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            category: [],
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
            var url = 'http://localhost/pramesh/backend/api/all_category_get';
        }
        else {
            var url = 'https://pramesh.justcodenow.com/backend/api/all_category_get';
        }
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ category: data.data });
    }

    deletedata(e)
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/delete_category';
        }
        else {
            var del = 'https://pramesh.justcodenow.com/backend/api/delete_category';
        }

        var iCategoryId = e.target.id;
        const fd = new FormData();
        fd.append('iCategoryId', iCategoryId);
        if (iCategoryId != 'undefined')
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
                        }, 1000);
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
   
    render()
    {
        var categorys = this.state.category;
        return(
            <>
                <Sidebar />
                <div className="main-content" id="panel" >
                    <Header />
                    {/* <!-- Page content --> */}
                    <div class="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Category Listing</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Link to='/admin/category/add'>
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
                                                    <th scope="col">Show Type</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    categorys.map((cat,index) => 
                                                    (
                                                        <tr>
                                                            <th>{index+1}</th>
                                                            <td><Link to='/admin/subcategory/listing'><img className="h-101 w-101" src={cat.vImage} /></Link></td>
                                                            <td><Link to='/admin/subcategory/listing'>{cat.vTitle}</Link></td>
                                                            <td>{cat.dtAddedDate}</td>
                                                            <td>{cat.eStatus}</td>
                                                            <td>{
                                                                cat.vProductType == '0' ? 'No' : 'YES'}
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/category/edit/${cat.iCategoryId}`}>
                                                                    <a><button className="btn myBtn3">Edit</button>
                                                                    </a>&nbsp;&nbsp;&nbsp;
                                                                </Link>
                                                                
                                                                <button id={`${cat.iCategoryId}`} class="btn myBtn2" onClick={this.deletedata}>Delete</button>
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
export default Category_listing; 