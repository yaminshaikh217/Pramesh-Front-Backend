import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMainproductimage } from "../../../redux/actions/productActions";
import { Link } from "react-router-dom";
const Maincategory = () => {
    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
        var urls = `http://localhost/pramesh/backend/api/product_listing_image`;
    } else {
        var urls = `https://pramesh.justcodenow.com/backend/api/product_listing_image`;
    }
    const mainproductdata = async () => {
        // ****************iamge****************
        const imagedata = await axios.get(urls).catch((err) => {
            
        });
        if (imagedata.data.data) {
            dispatch(setMainproductimage(imagedata.data.data));
        }
    };
    useEffect(() => {
        mainproductdata();
    }, []);

    const maindata = useSelector(
        (state) => state.Mainproductlisting.MainproductArray
    );
    const Banner_image = useSelector(
        (state) => state.Mainproductimage.MainproductimageArray
    );

    return (
        <>
            <Navbar />
            {/* *********** SAREE Banner****************  */}
            <section className="banner mb-5">
                <div className="img">
                    {Banner_image.map(function (img, index) {
                        if (img.vImageType == "4") {
                            return (
                                <img
                                    src={img.vImage}
                                    class="img-fluid"
                                    alt="Responsive image"
                                />
                            );
                        }
                    })}
                </div>
            </section>

            {/* ***************** SAREES SECTION*********** */}

            <section className=" container-fluid saree mb-5">
                <div className="row justify-content-center">
                    {
                        maindata.map((sarees, index) => (
                            <div className=" customCol customcol col-xl-3  col-lg-4 col-md-5 col-sm-10 my-3 ">
                                <h1 className="text mb-5">{sarees.vTitle}</h1>
                                    <Link style={{display : 'contents'}} to={`/product-listing/${btoa(sarees.iCategoryId)}`}>
                                        <div className="img flex">
                                            <img src={sarees.vImage} />
                                        </div>
                                    </Link>
                                
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* *********** SAREE Banner 2****************  */}

            <section className="banner mb-5">
                <div className="img">
                    {Banner_image.map(function (img, index) {
                        if (img.vImageType == "5") {
                            return (
                                <img
                                    src={img.vImage}
                                    class="img-fluid"
                                    alt="Responsive image"
                                />
                            );
                        }
                    })}
                </div>
                {/* <button className="sareeBtn">
          SHOP NOW<i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button> */}
            </section>
            <Footer />
        </>
    );
};

export default Maincategory;
