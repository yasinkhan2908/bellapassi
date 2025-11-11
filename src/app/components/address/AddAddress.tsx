'use client';
import Link from 'next/link';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

//
export default function AddAddress() {
  const router = useRouter(); // ✅ initialize router
  
  return (    
       <section id="checkout" className="checkout section">
            <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="checkout-container aos-init aos-animate" data-aos="fade-up">
                            <div className="section-header">
                                <div className="add-address d-flex flat-title flex-row justify-content-between align-items-center">
                                    <div className="text-left">
                                        <h5>Add New Address</h5>
                                    </div>
                                    <div className="text-right">
                                        <Link href="/change-address" className="btn btn-primary btn-sm mb-4 text-white"><i className="bi bi bi-arrow-left-short"></i> Back</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="account">
                                <div className="addresses-grid">                                       
                                    <div className="address-card aos-init aos-animate active mb-3" data-aos="fade-up" data-aos-delay="200">
                                        <form className="php-email-form settings-form ajaxformfileupload" method="post" action="" data-parsley-validate="parsley">
                                            <div className="row g-3">
                                                <div className="col-md-12">
                                                    <label className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name "/>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email " />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Phone Number</label>
                                                    <input type="tel" className="form-control" id="phone_number" name="phone_number" placeholder="Enter Phone Number " />
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label">Address</label>
                                                    <input type="tel" className="form-control pac-target-input" id="autocomplete" name="address" placeholder="Enter Address "/>
                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <label className="form-label">Address Line 2</label>
                                                    <input type="tel" className="form-control" id="address_line_2" name="address_line_2" placeholder="Enter Address Line 1 " />
                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <label className="form-label">Landmark</label>
                                                    <input type="tel" className="form-control" id="landmark" name="landmark" placeholder="Enter Landmark "/>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">State</label>
                                                    <input type="tel" className="form-control" id="state" name="state" placeholder="Enter State "/>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">City</label>
                                                    <input type="text" className="form-control" id="city" name="city" placeholder="Enter City " />
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label">Pin Code</label>
                                                    <input type="text" className="form-control" id="pin_code" name="pin_code" placeholder="Enter Pin Code " />
                                                </div>
                                            </div>

                                            <div className="form-buttons">
                                                <button type="submit" className="btn btn-primary mt-3">Save Address</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
  );
}