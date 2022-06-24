import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { gsap } from "gsap/all";
import LoginPopup from "./Login/LoginPopup";
import { GoogleLogout } from "react-google-login";
import Swal from "sweetalert2";

// import Logout  from '../Front/Login/Logout';
import {
  setMainheader,
  setProductListing,
  setMainproductdata,
  setAddtocartsavedata,
  setAddtocartsubtotal,
  setAllstories,
  setAllfabric,
  setSearchdata,
  setWishlist,
  setTermsCondition,
} from "../../redux/actions/productActions";

const Navbar = () => {
  let history = useHistory();
  var cookie = localStorage.getItem("cookie");
  var iUserId = localStorage.getItem("iUserId");
  var Name = localStorage.getItem("Name");
  var vGoogleId = localStorage.getItem("vGoogleId");
  const clientId =
    "3076278999-d3dc119t0ircn8573inrgl6inivo6mrg.apps.googleusercontent.com";

  const [slide, setSlide] = useState(false);
  const [search, setsearch] = useState(false);
  const [pop, setpop] = useState(false);
  const [logpop, setlogpop] = useState(false);
  const [stick, setstick] = useState(false);
  const [image_zooming, setimage_zooming] = useState("");
  const [SingleProductSearch, setSingleProductSearch] = useState("");
  const [Calorcategory, setCalorcategory] = useState([]);

  const poped = () => {
    if (pop == false) {
      setpop(true);
    }
    if (pop == true) {
      setpop(false);
    }
  };



  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      setstick(true);
    } else {
      setstick(false);
    }
  });

  const AllSearchData = (e) => {
    var keyword = e.target.value;
    if (answer_array[2] == "localhost:3000") {
      var search_url = `http://localhost/pramesh/backend/api/search`;
    } else {
      var search_url = `https://pramesh.justcodenow.com/backend/api/search`;
    }

    const fd = new FormData();
    fd.append("keyword", keyword);

    if (keyword.length > 1) {
      const dataa = axios
        .post(search_url, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            dispatch(setSearchdata(res.data.data));

            setCalorcategory(res.data.alldata);
          } else {
            setCalorcategory(res.data.alldata);
            dispatch(setSearchdata(res.data.data));
          }
        })
        .catch((error) => {});
    } else {
      dispatch(setSearchdata([]));
      setCalorcategory([]);
    }
  };

  const Logout = () => {
    localStorage.removeItem("iUserId");
    localStorage.removeItem("vFirstName");
    localStorage.removeItem("vLastName");
    localStorage.removeItem("Name");
    localStorage.removeItem("vGoogleId");

    setTimeout(function () {
      history.push("/login");
      window.location.reload(1);
    }, 100);

    console.clear();
    Swal.fire("Good job!", "You have been logged out successfully", "success");
  };
  const logPop = () => {
    if (logpop == false) {
      setlogpop(true);
    }
    if (logpop == true) {
      setlogpop(false);
    }
  };

  function mouse_hover(e) {
    var image = e.target.getAttribute("data-id");
    setimage_zooming(image);
  }

  function searching() {
    if (search == false) {
      setsearch(true);
      gsap.fromTo(
        ".searched",
        { y: -50, opacity: 0, display: "none" },
        { y: 0, opacity: 1, display: "flex", duration: 0.5 }
      );
    }

    if (search == true) {
      gsap.fromTo(
        ".searched",
        { y: 0, opacity: 1, display: "flex" },
        { y: -50, opacity: 0, display: "none", duration: 0.5 }
      );
      setsearch(false);
    }
  }

  const dispatch = useDispatch();
  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var header = `http://localhost/pramesh/backend/api/header`;
    var srories = `http://localhost/pramesh/backend/api/stories`;
    var url = `http://localhost/pramesh/backend/api/main_product_listing`;
    var cartdatasave = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    var terms = "http://localhost/pramesh/backend/api/all_terms_condition_get";
  } else {
    var header = `https://pramesh.justcodenow.com/backend/api/header`;
    var srories = `https://pramesh.justcodenow.com/backend/api/stories`;
    var url = `https://pramesh.justcodenow.com/backend/api/main_product_listing`;
    var cartdatasave = `https://pramesh.justcodenow.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    var terms =
      "https://pramesh.justcodenow.com/backend/api/all_terms_condition_get";
  }
  const mainNavbar = async () => {
    // ***************HEADER***************
    const headerdata = await axios.get(header).catch((err) => {
    });
    if (headerdata.data.data) {
      dispatch(setMainheader(headerdata.data.data));
      dispatch(setAllfabric(headerdata.data.fabric));
    }
    // *********************ADD TO CART DATA ******************
    const addtocart = await axios.get(cartdatasave);

    if (addtocart.data.data) {
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
    if (addtocart.data.wishlist) {
      dispatch(setWishlist(addtocart.data.wishlist));
    }
    // *********************ALL STORIES DATA ******************
    const StoriesArray = await axios.get(srories);

    if (StoriesArray.data.data) {
      dispatch(setAllstories(StoriesArray.data.data));
    }
    // *********************ALL Terms DATA ******************
    const TermsArray = await axios.get(terms);

    if (TermsArray.data.data) {
      dispatch(setTermsCondition(TermsArray.data.data));
    }
  };

  useEffect(() => {
    mainNavbar();
  }, []);

  const Remove_addtocart = (e) => {
    var iAddtocartId = e.target.id;

    if (answer_array[2] == "localhost:3000") {
      var remove_product = `http://localhost/pramesh/backend/api/addtocartdelete`;
    } else {
      var remove_product = `https://pramesh.justcodenow.com/backend/api/addtocartdelete`;
    }

    const fd = new FormData();
    fd.append("iAddtocartId", iAddtocartId);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);
    if (iAddtocartId != "undefined") {
      const dataa = axios
        .post(remove_product, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            dispatch(setAddtocartsavedata(res.data.data));
            dispatch(setAddtocartsubtotal(res.data.subtotal));
          } else {
          }
        })
        .catch((error) => {});
    }
  };

  const Header_data = useSelector((state) => state.Mainheader.MainheaderArray);
  const Addtocart = useSelector(
    (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  );
  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );
  const AllFabricData = useSelector(
    (state) => state.MainMiniallfabricdata.AllFabricdataArray
  );
  const SearchData = useSelector(
    (state) => state.MainMiniallsearchdata.AllSearchdataArray
  );
  const WishlistData = useSelector(
    (state) => state.MainMiniallwishdata.AllWishlistArray
  );

  if (SearchData.length == 1) {
  }

  var c_size = "";
  if (window.screen.width <= "991") {
    var c_size = "hiding";
  } else {
    var c_size = "show";
  }

  const SubcategortClick = async (e) => {
    var SubCategoryId = e.target.id;
    var Filter =
      "" + "/" + "" + "/" + "" + "/" + "" + "/" + "" + "/" + SubCategoryId;

    if (answer_array[2] == "localhost:3000") {
      var product_listing = `http://localhost/pramesh/backend/api/product_listing?Filter=${Filter}`;
    } else {
      var product_listing = `https://pramesh.justcodenow.com/backend/api/product_listing?Filter=${Filter}`;
    }
    const productdata = await axios.get(product_listing);
    if (productdata.data.data) {
      dispatch(setProductListing(productdata.data.data));
    }
  };

  const mainproductdata = async () => {
    const maindata = await axios.get(url).catch((err) => {
      console.log("error", err);
    });
    if (maindata.data.data) {
      dispatch(setMainproductdata(maindata.data.data));
    }
  };

  const show_addtocart_data = () => {
    setSlide(true);
  };
  const sliding = () => {
    setSlide(false);
  };

  useEffect(() => {
    mainproductdata();
  }, []);

  document.onclick = function (e) {
    if (e.target.id != "test" && e.target.id != "test2" && search == true) {
      setsearch(false);
      gsap.fromTo(
        ".searched",
        { y: 0, opacity: 1, display: "flex" },
        { y: -50, opacity: 0, display: "none", duration: 0.3 }
      );
    }
  };

  return (
    <>
      <nav
        className={`navbar ${
          stick ? "sticked" : ""
        } navbar-expand-lg navbar-light bg-light`}
      >
        <div className="nav-div">
          <Link to="/">
            <div className="navbar-brand" href="/">
              <img
                src={process.env.PUBLIC_URL + "/Images/Animated_pramesh.svg"}
                alt="logo"
              />
            </div>
          </Link>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div className="  collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav">
            {Header_data.map(function (header, index) {
              if (header.sub.length > 0) {
                var x = header.sub.length;
                if (x > 20) {
                  var p = "col-xl-2  col-lg-4 col-md-6 col-sm-6";
                  var size = "left_size1";
                } else if (x < 5) {
                  var p = "col-xl-12";
                  var size = "left_size3";
                } else if (x < 10) {
                  var p = "col-xl-3 col-lg-4 col-md-4 col-sm-6";
                  var size = "left_size4";
                } else if (x < 15 && x != 3) {
                  var p = "col-xl-3 col-lg-4 col-md-4 col-sm-6";
                  var size = "left_size2";
                }
                return (
                  <li className={`nav-item  ${c_size} dropdown`}>
                    <Link to={header.iCategoryId == 1 ? "/category" : ""}>
                      {header.vTitle}
                    </Link>

                    <div
                      className={`dropdown-menu custm  ${header.vTitle} ${c_size}`}
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div className="row nItem pl-5">
                        {AllFabricData.map(function (fabric, ids) {
                          if (fabric.iCategoryId == header.iCategoryId) {
                            return (
                              <>
                                <div
                                  className="col-xl-3  col-lg-4 col-md-6 col-sm-6"
                                  id="maincate"
                                >
                                  {fabric.vTitle_fabric}
                                </div>
                                <div className="pl-4">
                                  {header.sub.map(function (sub1, idss) {
                                    if (sub1.iFabricId == fabric.iFabricId) {
                                      var subcatname = "";
                                      var subcatname = sub1.vSubTitle;
                                      var name = subcatname.replace(/ /g, "");
                                      return (
                                        <div className={p}>
                                          <Link
                                            to={`/product-listing/${name}/${sub1.iSubcategoryId}`}
                                          >
                                            <a
                                              onMouseOver={mouse_hover}
                                              data-id={`${sub1.vImage}`}
                                              id={`${sub1.iSubcategoryId}`}
                                              onClick={SubcategortClick}
                                              className="dropdown-item"
                                            >
                                              {sub1.vSubTitle}
                                            </a>
                                          </Link>
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>

                      <div className=" previewImg">
                        {image_zooming != "" ? (
                          <img src={image_zooming} alt="Image" />
                        ) : (
                          <img src={header.vImage} alt="Image" />
                        )}
                      </div>
                    </div>
                  </li>
                );
              } else {
                if (header.vTitle == "STORIES") {
                  return (
                    <Link to="/stories">
                      <li className={`nav-item ${c_size}`}>
                        <a className="nav-link">{header.vTitle}</a>
                      </li>
                    </Link>
                  );
                } else {
                  return (
                    <Link to="/product-listing">
                      <li className={`nav-item ${c_size}`}>
                        <a className="nav-link">{header.vTitle}</a>
                      </li>
                    </Link>
                  );
                }
              }
            })}
          </ul>
        </div>
        <div className="d-flex iconBox">
          <div className="icons ">
            <span onClick={searching}>
              <i className="fa fa-search" id="test" aria-hidden="true"></i>
            </span>
            <span>
              <i onClick={poped} className="fa fa-heart-o" aria-hidden="true">
                {/* {WishlistData.length} */}
              </i>
            </span>
            <span className="position-relative ">
              {iUserId ? (
                <span className="luser" onClick={logPop}>
                  {Name}
                </span>
              ) : (
                <Link to="/register">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </Link>
              )}
              <span className={`logout ${logpop ? "d-inline-flex" : "d-none"}`}>
                {vGoogleId ? (
                  <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={Logout}
                    className="google_logout"
                  >
                    <span>
                      Logout
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </span>
                  </GoogleLogout>
                ) : (
                  <>
                    <span onClick={Logout}>Logout</span>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </>
                )}
              </span>
            </span>
          </div>
          <div className="cart position-relative" onClick={show_addtocart_data}>
            <i className="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
            <span id="cartNum">{Addtocart.length}</span>
          </div>
          <div className="inr">
            <span>
              <i className="fa fa-chevron-down mr-2" aria-hidden="true"></i>INR
            </span>
          </div>
        </div>
        <div className="searched ">
          <div className="search" id="test2">
            <div className="position-relative" id="test2">
              <input
                type="text"
                placeholder="Search"
                onChange={AllSearchData}
                id="test2"
              />
              {SingleProductSearch ? (
                <></>
              ) : (
                // <a href={`/product-listing/${'search/' + SingleProductSearch}`}>
                //     <i className="fa fa-search"></i>
                // </a>
                <i className="fa fa-search">{SingleProductSearch}</i>
              )}

              <div
                className={`drop ${
                  SearchData.length >= 7 ? "dropdownshow" : ""
                }`}
              >
                {SearchData.map(function (sea, index) {
                  return (
                    <a
                      href={`/product-listing/${btoa(
                        "search/" + sea.vProductName
                      )}`}
                    >
                      <div className="items">
                        <h3 id={`${sea.vProductName}`}>{sea.vProductName}</h3>

                        {/* <p>{sea.count}</p> */}
                      </div>
                    </a>
                  );
                })}
                {/* ***********************************COLOR********************************** ****** */}
                {Calorcategory.map(function (color_category, index) {
                  return (
                    <a
                      href={`/product-listing/${btoa(
                        "color/" + color_category
                      )}`}
                    >
                      <div className="items">
                        <h3 id={`${color_category}`}>{color_category}</h3>

                        {/* <p>{sea.count}</p> */}
                      </div>
                    </a>
                  );
                })}
                {/* ******************* ********************** COLOR ********** ************* ******* ****/}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* <a href={`/product-listing/${btoa('search/' + sea.vProductName)}`}>
                <h3 id={`${sea.vProductName}`}>{sea.vProductName}</h3>
            </a> */}

      {/* ******************************* */}
      {/* Add on Cart section   */}

      <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
        <button className="closed" onClick={sliding}>
          <i className="fa fa-close"></i>
        </button>

        <div className="scroll">
          {Addtocart.length > 0 ? (
            Addtocart.map(function (addtoct, index) {
              return (
                <>
                  <div className="mycards">
                    <button
                      id={`${addtoct.iAddtocartId}`}
                      onClick={Remove_addtocart}
                      className="close"
                    >
                      X
                    </button>
                    <div className="cardimg mr-4">
                      <img className="img" src={addtoct.vImage} alt="img" />
                    </div>
                    <div className="cartinfo">
                      <h2>{addtoct.vProductName}</h2>
                      {addtoct.vSize != "" ? (
                        <p>
                          
                          SIZE : <span>{addtoct.vSize}</span>
                        </p>
                      ) : (
                        <></>
                      )}
                      <p>
                        Qty : <span>{addtoct.vQty}</span>
                      </p>
                      <h4>र {addtoct.vTotal}</h4>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <hr></hr>
              <h1 className="text-center">Record Not Found!</h1>
              <hr></hr>
            </>
          )}
        </div>

        <div className="total p-3">
          <h2>CART SUBTOTAL :</h2>
          <h3>र {SubTotal}</h3>
        </div>
        <div className="checkout">
          <Link style={{ display: "contents" }} to="/viewcart">
            <button className="cbtn">VIEW CART</button>
          </Link>
          {iUserId ? (
            <Link style={{ display: "contents" }} to="/checkout">
              <button className="pbtn">PROCEED TO CHECKOUT</button>
            </Link>
          ) : (
            <Link style={{ display: "contents" }} to="/login">
              <button className="pbtn">PROCEED TO CHECKOUT</button>
            </Link>
          )}
        </div>
      </div>
      {/* login popup  */}

      <LoginPopup classes={`d-none  ${pop ? "d-block" : ""}`} remove={poped} />
    </>
  );
};

export default Navbar;
