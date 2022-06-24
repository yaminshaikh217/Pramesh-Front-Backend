import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Country, State, City } from 'country-state-city';

import { gsap } from "gsap";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../../css/home.css";
import axios from "axios";
import {
    setAddtocartpage,
    setAddtocartsavedata,
    setAddtocartsubtotal,
} from "../../../redux/actions/productActions";


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const __DEV__ = document.domain === 'localhost'

const Checkout = () => {
    let history = useHistory();
    var iUserId = localStorage.getItem("iUserId");
    // ****************Payment Method****************************
    const [Price, setPrice]                         = useState('');

    const SubTotal = useSelector((state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray);
    // console.log(SubTotal);
    // setPrice(SubTotal);


    const [Image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhaEtwdVj9mwAFuc8HPoTVcYvUr8fhiwXXYl9WA9g0_73sb1NX9tzgW-TlU2f25cgBQ&usqp=CAU');

    const displayRazorpay = () => {
        var MainPrice = SubTotal * 100;
        const options = {
            key: 'rzp_test_OBiDTQQEnduoRx',
            currency: 'INR',
            // amount: MainPrice.toString(),
            amount: '100',
            name: 'Pramesh',
            description: 'Pramesh Shopping',
            image: Image,
            handler(response) 
            {
                
                localStorage.setItem("razorpay_payment_id", response.razorpay_payment_id);

                PaymentsuccessProccess();
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
              
            },
            theme: {
                color: '#40A9FF',
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const PaymentsuccessProccess = () => 
    {
        
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/paymentsuccessproccess';
        }
        else {
            var url = 'https://pramesh.justcodenow.com/backend/api/paymentsuccessproccess';
        }

        var iCheckoutDetailId   = localStorage.getItem("iCheckoutDetailId");
        var iPaymentId          = localStorage.getItem("razorpay_payment_id");
        

        const fd = new FormData();
        fd.append('iPaymentId', iPaymentId);
        fd.append('iCheckoutDetailId', iCheckoutDetailId);
        fd.append('iUserId', iUserId);

        
        const dataa = axios.post(url, fd)
            .then(res => {
                if (res.data.Status == '0') 
                {
                    localStorage.removeItem("iPaymentId");
                    localStorage.removeItem("iCheckoutDetailId");

                    setTimeout(function () {
                        history.push("/paymentsuccess");
                    }, 2000);
                }
                else 
                {
                   
                }
            })
            .catch(error => {
            })
    }

    var country                         = Country.getAllCountries();
    var state                           = State.getAllStates();
    var city                            = City.getAllCities();

    state.sort((a, b) => a.name.localeCompare(b.name));
    city.sort((a, b) => a.name.localeCompare(b.name));
    

    var cookie                          = localStorage.getItem("cookie");
    const [hideinfos, sethideinfos]     = useState(false);
    const [Gif, setGif]                 = useState(false);
    const [vFirstName, setvFirstName]   = useState("");
    const [vLastName, setvLastName]     = useState("");
    const [vPhone, setvPhone]           = useState("");
    const [tAddress, settAddress]       = useState("");
    const [vCity, setvCity]             = useState("");
    const [vState, setvState]           = useState("");
    const [vChangeState, setvChangeState] = useState("");
    const [vChangeState1, setvChangeState1] = useState("");
    const [vCountry, setvCountry]       = useState("");
    const [vChangeCountry, setvChangeCountry] = useState("");
    const [vChangeCountry1, setvChangeCountry1] = useState("");


    const [vZipcode, setvZipcode]       = useState("");
    // ********************************BILLING ADDRESS ALL STATE********************************
    const [vBillingFirstName, setvBillingFirstName] = useState("");
    const [vBillingLastName, setvBillingLastName]   = useState("");
    const [vBillingPhone, setvBillingPhone]         = useState("");
    const [vBillingAddress, setvBillingAddress]     = useState("");
    const [vBillingCity, setvBillingCity]           = useState("");
    const [vBillingState, setvBillingState]         = useState("");
    const [vBillingCountry, setvBillingCountry]     = useState("");
    const [vBillingZipcode, setvBillingZipcode]     = useState("");
    const [EmailDone, setEmailDone]                 = useState("0");
    const [ErrorEmail, setErrorEmail]               = useState("");
    // **********************Email Verify *********************************
    const emailverify = (e) =>
    {
        var emailText = e.target.value;
        var emailText = document.getElementById('vEmail').value;
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(emailText)) 
        {
            if (answer_array[2] == 'localhost:3000') {
                var email_verify = 'http://localhost/pramesh/backend/api/email_varify';
            }
            else {
                var email_verify = 'https://pramesh.justcodenow.com/backend/api/email_varify';
            }

            const fd = new FormData();
            fd.append('vEmail', emailText);
            
            const dataa = axios.post(email_verify, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        setErrorEmail('');
                        setEmailDone(2);
                        return 2;
                    }
                    else {
                        setEmailDone(1);
                        setErrorEmail('email address already exists');
                        return 1;
                    }
                })
                .catch(error => {
                })
        } 
        else 
        {   
            if (emailText.length > 3)
            {
                setErrorEmail("Invalid email address:" + emailText);
                setEmailDone(1);
                return 1;
            }
        }

    }

    const Checkoutdatasave = (event) => 
    {
        displayRazorpay();
        // var Emaildata = validateEmail();
        
        event.preventDefault();
        const data = new FormData(event.target);
        
        var vFirstName  = document.getElementById('vFirstName').value;
        var vLastName   = document.getElementById('vLastName').value;
        var vPhone      = document.getElementById('vPhone').value;
        var tAddress    = document.getElementById('tAddress').value;
        var vCity       = document.getElementById('vCity').value;
        var vState      = document.getElementById('vState').value;
        var vCountry    = document.getElementById('vCountry').value;
        var vZipcode    = document.getElementById('vZipcode').value;
        // *********************************BILLING ADDRESS***************
        var vBillingFirstName   = document.getElementById('vBillingFirstName').value;
        var vBillingLastName    = document.getElementById('vBillingLastName').value;
        var vBillingPhone       = document.getElementById('vBillingPhone').value;
        var vBillingAddress     = document.getElementById('vBillingAddress').value;
        var vBillingCity        = document.getElementById('vBillingCity').value;
        var vBillingState       = document.getElementById('vBillingState').value;
        var vBillingCountry     = document.getElementById('vBillingCountry').value;
        var vBillingZipcode     = document.getElementById('vBillingZipcode').value;
        
        if (hideinfos==false)
        {
            if (vBillingFirstName) {
                setvBillingFirstName('');
            }
            else {
                setvBillingFirstName('Please Enter FirstName');
            }
            if (vBillingLastName) {
                setvBillingLastName('');
            }
            else {
                setvBillingLastName('Please Enter Lastname');
            }
            if (vBillingPhone) {
                setvBillingPhone('');
            }
            else {
                setvBillingPhone('Please Enter Phone No');
            }
            if (vBillingAddress) {
                setvBillingAddress('');
            }
            else {
                setvBillingAddress('Please Enter Address');
            }
            if (vBillingCity) {
                setvBillingCity('');
            }
            else {
                setvBillingCity('Please Enter City');
            }
            if (vBillingState) {
                setvBillingState('');
            }
            else {
                setvBillingState('Please Select State');
            }
            if (vBillingCountry) {
                setvBillingCountry('');
            }
            else {
                setvBillingCountry('Please Select Country');
            }
            if (vBillingZipcode) {
                setvBillingZipcode('');
            }
            else {
                setvBillingZipcode('Please Enter Zipcode');
            }
        }

        var error = false;
        if (vFirstName)
        {
            setvFirstName('');
        }
        else{
            setvFirstName('Please Enter FirstName');
              var error = true;
        }
        if (vLastName) {
            setvLastName('');
        }
        else {
            setvLastName('Please Enter Lastname');
            var error = true;
        }
        if (vPhone) {
            setvPhone('');
        }
        else {
            setvPhone('Please Enter Phone No');
            var error = true;
        }
        if (tAddress) {
            settAddress('');
        }
        else {
            settAddress('Please Enter Address');
             var error = true;
        }
        if (vCity) {
            setvCity('');
        }
        else {
            setvCity('Please Enter City');
            var error = true;
        }
        if (vState) {
            setvState('');
        }
        else {
            setvState('Please Select State');
            var error = true;
        }
        if (vCountry) {
            setvCountry('');
        }
        else {
            setvCountry('Please Select Country');
             var error = true;
        }
        if (vZipcode) {
            setvZipcode('');
        }
        else {
            setvZipcode('Please Enter Zipcode');
            var error = true;
        }
        

    if (error == false && EmailDone == 0 || EmailDone == 2) 
        {
            var answer = window.location.href;
            const answer_array = answer.split('/');
            if (answer_array[2] == 'localhost:3000') {
                var url = 'http://localhost/pramesh/backend/api/checkoutdata';
            }
            else {
                var url = 'https://pramesh.justcodenow.com/backend/api/checkoutdata';
            }
                const dataa = axios.post(url, data)
                    .then(res => {
                        if (res.data.Status == '0') 
                        {
                            localStorage.setItem("iCheckoutDetailId", res.data.iCheckoutDetailId);
                            displayRazorpay();

                            // Swal.fire(
                            //     'Good job!',
                            //     res.data.message,
                            //     'success'
                            // )

                            // setTimeout(function () {
                            //     history.push("/");
                            // }, 2000);
                        }
                        else {
                            setGif(false);
                            // Swal.fire(
                            //     'Error',
                            //     res.data.message,
                            //     'error'
                            // )
                        }
                    })
                    .catch(error => {
                    })
            
        }
        
    }

    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    const AddtocartProduct = async () => {
        if (answer_array[2] == "localhost:3000") 
        {
            var cartdatasave = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
        } 
        else 
        {
            var cartdatasave = `https://pramesh.justcodenow.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
        }
        // *********************ADD TO CART DATA ********************
        const addtocart = await axios.get(cartdatasave);

        if (addtocart.data.data) 
        {
            dispatch(setAddtocartsavedata(addtocart.data.data));
            dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
        }
    };
    useEffect(() => {
        AddtocartProduct();
    }, []);
    
    window.onload = () => {
        gsap.fromTo(
            ".leftcheck",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
        gsap.fromTo(
            ".rightcheck",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
    }

    const hideinfo = () => {
        if (hideinfos == false) {
            sethideinfos(true);
        }
        if (hideinfos == true) {
            sethideinfos(false)
        }
    };

    const Addtocart = useSelector((state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray);
   
    


    return (
        <>  
            <form onSubmit={Checkoutdatasave}>
                <input type="hidden" name="cookie" value={cookie} />
                <input type="hidden" name="iUserId" value={iUserId} />
                <section className="checkoutp">
                    <h1 className="text-center my-4">CHECKOUT</h1>
                        <div className="row justify-content-center">
                            {/* LEFT CHECK */}

                            <div className="leftcheck   col-xl-6 col-lg-8 mx-auto ">
                                <h1>SHIPPING ADDRESS</h1>
                                <div className="loginoption">
                                    <h3>Login Options</h3>
                                <input type="text" onKeyUp={emailverify} name="vEmail" id="vEmail" placeholder="Email Address" />
                                <span className="red">{ErrorEmail}</span>
                                    <p>You can create an account after Checkout</p>
                                </div>
                                <hr />
                                <div className="contactdetails">
                                    <h3 className="mb-2">Contact Details</h3>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <input
                                                type="text"
                                                id="vFirstName"
                                                name="vFirstName"
                                                className="form-control"
                                                placeholder="First name"
                                            />
                                        <span className="red">{vFirstName}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <input
                                                type="text"
                                                id="vLastName"
                                                name="vLastName"nu
                                                className="form-control"
                                                placeholder="Last name"
                                            />
                                        <span className="red">{vLastName}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <input
                                                type="number"
                                                id="vPhone"
                                                name="vPhone"
                                                className="form-control"
                                                placeholder="Phone Number"
                                            />
                                        <span className="red">{vPhone}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <input
                                                type="text"
                                                id="tAddress"
                                                className="form-control"
                                                placeholder="Address "
                                                name="tAddress"
                                            />
                                        <span className="red">{tAddress}</span>
                                        </div>
                                        
                                        <div className="col-md-6 mt-3">
                                        <select onChange={(e) => setvChangeCountry(e.target.value)} id="vCountry" name="vCountry" className="form-control">
                                            <option value=''>Please Select Country</option>
                                                {
                                                  country.map(function(coun,index)
                                                  {
                                                      return <option value={coun.isoCode}>{coun.name}</option>
                                                  })
                                                }
                                        </select>
                                        <span className="red">{vCountry}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                        <select id="vState" onChange={(e) => setvChangeState(e.target.value)} name="vState" className="form-control">
                                            <option value=''>Please Select State</option>
                                                {
                                                state.map(function(st,index)
                                                     { 
                                                        if (st.countryCode == vChangeCountry)
                                                        {
                                                            return <option value={st.isoCode}>{st.name}</option> 
                                                        }
                                                         
                                                     })
                                                }
                                            </select>
                                        <span className="red">{vState}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <select id="vCity" name="vCity" className="form-control">
                                            <option value=''>Please Select City </option>
                                                {
                                                    city.map(function (ct, index) 
                                                    {
                                                        if (ct.stateCode == vChangeState)
                                                        {
                                                           return <option value={ct.stateCode}>{ct.name}</option>
                                                        }
                                                    })
                                                }
                                            </select>
                                        <span className="red">{vCity}</span>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vZipcode"
                                                id="vZipcode"
                                                placeholder="Zip/Postal code"
                                            />
                                        <span className="red">{vZipcode}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pay">
                                    <h1>PAYMENT METHOD</h1>
                                    <p>How would you like to pay for your order?</p>
                                <div className="pretty p-icon p-smooth mt-3" onClick={hideinfo}>
                                        <input type="checkbox" name="bill" id="bill" />
                                    <div className="state p-maroon">
                                        <i className="icon fa fa-check"></i>
                                            <label htmlFor="bill">
                                                My billing and shipping addresses are the same
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={`row hideinfo ${hideinfos ? "hide" : " "}  mt-4 `}>
                                    <input
                                        type="text"
                                        id="vBillingFirstName"
                                        name="vBillingFirstName"
                                        className="col-xl-8 col-lg-7 col-md-10 col-sm-8   mb-2 "
                                        placeholder="First name"
                                    />
                                    <span className="red">{vBillingFirstName}</span>
                                    <input
                                        type="text"
                                        id="vBillingLastName"
                                        name="vBillingLastName"
                                        className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 "
                                        placeholder="Last name"
                                    />
                                    <span className="red">{vBillingLastName}</span>
                                    <input
                                        type="number"
                                        id="vBillingPhone"
                                        name="vBillingPhone"
                                        className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                                        placeholder="Phone Number"
                                    />
                                    <span className="red">{vBillingPhone}</span>
                                    <input
                                        type="text"
                                        id="vBillingAddress"
                                        className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                                        placeholder="Address "
                                        name="vBillingAddress"
                                    />
                                    <span className="red">{vBillingAddress}</span>
                                        <select onChange={(e) => setvChangeCountry1(e.target.value)} id="vBillingCountry" name="vBillingCountry" className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 ">
                                            <option value=''>Please Select Country</option>
                                            {
                                                country.map(function (coun, index) {
                                                    return <option value={coun.isoCode}>{coun.name}</option>
                                                })
                                            }
                                        </select>

                                    <span className="red">{vBillingCountry}</span>
                                        <select id="vBillingState" onChange={(e) => setvChangeState1(e.target.value)}  name="vBillingState" className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 ">
                                            <option value=''>Please Select State</option>
                                            {
                                                state.map(function (st, index) {
                                                    if (st.countryCode == vChangeCountry1) 
                                                    {
                                                        return <option value={st.isoCode}>{st.name}</option>
                                                    }

                                                })
                                            }
                                        </select>
                                    <span className="red">{vBillingState}</span>
                                  

                                <select id="vBillingCity" name="vBillingCity" className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2">
                                    <option value=''>Please Select City</option>
                                    {
                                        city.map(function (ct, index) {
                                            if (ct.stateCode == vChangeState1) {
                                                return <option value={ct.stateCode}>{ct.name}</option>
                                            }
                                        })
                                    }
                                </select>





                                    <span className="red">{vBillingCity}</span>
                                    <input
                                        type="text"
                                        id="vBillingZipcode"
                                        className="col-xl-8 col-lg-7 col-md-10 col-sm-8  "
                                        name="vBillingZipcode"
                                        placeholder="Zip/Postal code"
                                    />
                                    <span className="red">{vBillingZipcode}</span>
                                </div>

                                <div className="shipping mt-5">
                                    <h1>SHIPPING METHOD</h1>
                                    <p>₹200 Shipping Charges</p>
                                </div>
                            </div>

                            {/* RIGHT CHECK  */}

                            <div className="rightcheck  col-xl-5  col-lg-8 mx-auto">
                                <h1>ORDER SUMMARY</h1>
                            <h3>{Addtocart.length} ITEM IN CART</h3>
                                <hr />

                                <div className="scroll">
                                    {
                                        Addtocart.length > 0 ?
                                        Addtocart.map(function(add,index){
                                            return <div className="mycards d-flex mb-4">
                                                <div className="cardimg mr-4">
                                                    <img
                                                        className="img"
                                                        src={add.vImage}
                                                        alt="img"
                                                    />
                                                </div>
                                                <div className="cartinfo">
                                                    <div className="d-flex justify-content-between">
                                                        <h2>{add.vProductName}</h2>
                                                        <h2>र {add.vTotal}</h2>
                                                    </div>
                                                    <p>Qty : {add.vQty}</p>
                                                    {
                                                        add.vSize.length > 0 ?
                                                            <p>Size : {add.vSize}</p>
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </div>
                                        })
                                        :
                                        <div className="col-md-4">Record Not Found!</div>
                                    }
                                </div>

                                <div className="cartTotal">
                                    <div className="d-flex justify-content-between">
                                        <h5>CART SUBTOTAL</h5>
                                    <h5>र {SubTotal}</h5>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5>SHIPPING</h5>
                                        <h5>र 0</h5>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <h5>ORDER TOTAL </h5>
                                        <h5>र {SubTotal}</h5>
                                    </div>
                                </div>

                                <div className="discount mt-4">
                                    <h3>Apply Discount Code</h3>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            name="coupon"
                                            className="discode"
                                            placeholder="ENTER DISCOUNT CODE"
                                        />{" "}
                                        <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                                    </div>

                                <div className="pretty p-icon p-smooth mt-5">
                                        <input type="checkbox" name="bill" id="bill" />
                                    <div className="state p-maroon">
                                        <i className="icon fa fa-check"></i>
                                            <label htmlFor="bill">Sign up for our Newsletter</label>
                                        </div>
                                    </div>
                                    <div className="comment mt-3">
                                        <h3>Order Comment</h3>
                                        <textarea
                                            id="tOrderComment"
                                            name="tOrderComment"
                                            style={{
                                                width: "100%",
                                                height: "10rem",
                                                border: "3px solid #efeae6",
                                            }}
                                        ></textarea>
                                    </div>
                                    <div className="loaderDiv">
                                        <button type="submit" className="checkoutbtn" >
                                            {
                                                Gif == true ?
                                                    <img className="loding_gif_product" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                    :
                                                    'CONTINUE CHECKOUT'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
            </form>
        </>
    );
};

export default Checkout;
