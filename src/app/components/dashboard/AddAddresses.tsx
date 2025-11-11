'use client';
import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SetStateAction, useState, useEffect,useRef  } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import { AccountSidebar } from './AccountSidebar';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

import Swal from 'sweetalert2';
import $ from "jquery";
import "parsleyjs";

const libraries: ('places')[] = ['places'];
//
export default function AddAddresses() {
    const router = useRouter(); // ✅ initialize router
    //toast.loading('Logging in...');
    // Just reference google.maps directly — no import needed.
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    //
    const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);

    const formRef = useRef(null);

    useEffect(() => {
        $(formRef.current!).parsley();
    }, []);


    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            //console.log('Full Place Object:', place);

            setAddress(place.formatted_address || '');

            const addressComponents = place.address_components || [];

            // Helper function to extract by type
            const getComponent = (type: string) =>
                addressComponents.find((component) => component.types.includes(type))?.long_name || '';

            setCity(getComponent('locality') || getComponent('administrative_area_level_2')); // fallback
            setState(getComponent('administrative_area_level_1'));
            setPostalCode(getComponent('postal_code'));
            setCountry(getComponent('country'));
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address_line_2, setAddressLine2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    

    const [result, setResult] = useState<{ error?: string; data?: any } | null>(null);

    const [user, setUser] = useState({
                                name: '',
                                email: '',
                                phone: '',
                                address: '',
                                address_line_2: '',
                                city: '',
                                state: '',
                                postalcode: '',
                                country: '',
                                landmark:''
                            });
    
    // ✅ Handle input changes dynamically
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const form = $(formRef.current!);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.parsley().isValid()) {
            //alert("Form is valid!");
        
            try {
                //toast.loading('Logging in...');
                // 1️⃣ Get CSRF cookie first
                await api.get('/sanctum/csrf-cookie');
                // 2️⃣ Then login
                const token = localStorage.getItem("token");
                //console.log("user" , user);
                //
                const response = await api.post(
                    '/api/user/add-shipping-address',
                    { name : user.name, email : user.email, phone : phone, address : address, city : city, state : state, postalcode : postalcode, country : country, landmark : user.landmark, address_line_2: user.address_line_2 },
                    {
                        headers: {
                        Authorization: `Bearer ${token}`, // include login token
                        },
                    }
                );
                //console.log('response:', response);
                if (response.data.success === false) {
                    // toast.dismiss();
                    // toast.error(response.data.message || 'Something went wrong!');
                    Swal.fire({
                        title: 'error',
                        text: response.data.message || 'Something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
                // toast.dismiss();
                // toast.success(response.data.message || 'Account successfully updated!');
                Swal.fire({
                    title: 'Success',
                    text: response.data.message || 'Address successfully added!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#2ee44cff',
                    cancelButtonColor: 'rgba(222, 41, 50, 1)',
                    confirmButtonText: 'Ok'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        router.push('/user/my-address'); // 👈 your next page path
                    }
                });
                
                
            } catch (error) {
                //console.log(error);
                // toast.dismiss();
                // toast.error('Failed. Please try again.');
                Swal.fire({
                        title: 'error',
                        text: 'Failed. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
            }
        } else {
            //alert("Please fix validation errors.");
            Swal.fire({
                        title: 'error',
                        text: 'Please fix validation errors.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
        }
    };

  return (
    <main className="main">
        <section id="account" className="account section">
            <div className='container'>
                <div className="row g-4">
                    <div className="col-lg-3">
                        <AccountSidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="content-area">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="addresses" role="tabpanel">
                                    <div className="section-header aos-init aos-animate" data-aos="fade-up">
                                        <h2>Add New Address</h2>
                                    </div>
                                    <div className="addresses-grid">
                                        <div className="address-card aos-init aos-animate active mb-3" data-aos="fade-up" data-aos-delay="200">
                                            <form ref={formRef} className="php-email-form settings-form ajaxformfileupload" onSubmit={handleSubmit}  method="post">
                                                <div className="row g-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name " value={user.name} onChange={handleChange} required data-parsley-type-message="Please enter your name." data-parsley-required-message="Name cannot be blank."/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email " value={user.email} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Phone Number</label>
                                                        <input type="tel" className="form-control" id="phone_number" name="phone_number" placeholder="Enter Phone Number " value={phone} onChange={e => setPhone(e.target.value)}  required data-parsley-type-message="Please enter your name." data-parsley-required-message="Name cannot be blank."/>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="form-label">Address</label>
                                                        
                                                        <LoadScript
                                                            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                                                            libraries={libraries}
                                                            >
                                                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>                                                                
                                                                <input type="text" className="form-control pac-target-input" id="autocomplete" name="address" placeholder="Enter Address " 
                                                                 value={address} onChange={e => setAddress(e.target.value)}  required data-parsley-type-message="Please enter your address." data-parsley-required-message="Address cannot be blank."/>
                                                            </Autocomplete>
                                                        </LoadScript>
                                                        <input type='hidden' name='country' id='country' value={user.country} />
                                                    </div>
                                                    
                                                    <div className="col-md-12">
                                                        <label className="form-label">Address Line 2</label>
                                                        <input type="text" className="form-control" id="address_line_2" name="address_line_2" placeholder="Enter Address Line 1" value={user.address_line_2} onChange={handleChange} />
                                                    </div>
                                                    
                                                    <div className="col-md-12">
                                                        <label className="form-label">Landmark</label>
                                                        <input type="text" className="form-control" id="landmark" name="landmark" placeholder="Enter Landmark " value={user.landmark} onChange={handleChange}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">State</label>
                                                        <input type="text" className="form-control" id="state" name="state" placeholder="Enter State " value={state}  onChange={e => setState(e.target.value)}  required data-parsley-type-message="Please select your state." data-parsley-required-message="State cannot be blank."/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" id="city" name="city" placeholder="Enter City " value={city}  onChange={e => setCity(e.target.value)} required data-parsley-type-message="Please select city address." data-parsley-required-message="City cannot be blank."/>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="form-label">Pin Code</label>
                                                        <input type="text" className="form-control" id="pin_code" name="pin_code" placeholder="Enter Pin Code " value={postalcode}  onChange={e => setPostalCode(e.target.value)} required data-parsley-type-message="Please enter your pin code." data-parsley-required-message="Pincode cannot be blank."/>
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
            </div>
        </section>
    </main>
  );
}