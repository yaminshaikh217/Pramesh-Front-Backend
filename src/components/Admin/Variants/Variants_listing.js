import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class Variants_listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variants: [],
    };
  }

  async componentDidMount() {
    $(".example").DataTable().destroy();
    setTimeout(function () {
      $(".example").DataTable({
        pageLength: 50,
      });
    }, 1000);

    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/pramesh/backend/api/all_variants_get";
    } else {
      var url = "https://pramesh.justcodenow.com/backend/api/all_variants_get";
    }
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ variants: data.data });
  }

  deletedata(e) {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var del = "http://localhost/pramesh/backend/api/delete_variants";
    } else {
      var del = "https://pramesh.justcodenow.com/backend/api/delete_variants";
    }

    var iVariantId = e.target.id;
    const fd = new FormData();
    fd.append("iVariantId", iVariantId);
    if (iVariantId != "undefined") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            const dataa = axios.post(del, fd);
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
            setTimeout(() => {
              window.location.reload(1);
            }, 1000);
          }
        })
        .then((res) => {
          if (res.data.Status == "0") {
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
          } else {
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
        .catch((error) => {});
    }
  }

  render() {
    var variants = this.state.variants;
    return (
      <>
        <Sidebar />
        <div className="mai
        n-content" id="panel">
          <Header />
          {/* <!-- Page content --> */}
          <div class="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Variants Listing</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/variants/add">
                          <a className="btn myBtn4">Add</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table align-items-center table-flush example"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">AddedDate</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((vari, index) => (
                          <tr>
                            <th>{index + 1}</th>

                            <td>{vari.vLabel}</td>
                            <td>{vari.dtAddedDate}</td>
                            <td>{vari.eStatus}</td>
                            <td>
                              <Link
                                to={`/admin/variants/edit/${vari.iVariantId}`}
                              >
                                <a>
                                  <button className="btn myBtn3">Edit</button>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                              </Link>

                              <button
                                id={`${vari.iVariantId}`}
                                class="btn myBtn2"
                                onClick={this.deletedata}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
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
export default Variants_listing;
