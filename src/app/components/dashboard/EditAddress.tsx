'use client';

import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  useState, useEffect } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import { AccountSidebar } from './AccountSidebar';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];


interface Address {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface EditAddressProps {
  id: string; // ✅ not 'address', and type is string
}

export default function EditAddress({ id }: EditAddressProps) {
    const [buttonText, setButtonText] = useState('Update Address');
    const [isSubmitting, setIsSubmitting] = useState(false);
    //
    const router = useRouter(); // ✅ initialize router
    //toast.loading('Logging in...');
    // Just reference google.maps directly — no import needed.
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [singleaddress, setSinlgeAddress] = useState<Address | null>(null);
    //
    const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);

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


    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmitting(true);
        setButtonText('Updating...');
        //
        e.preventDefault();

        try {
            //toast.loading('Logging in...');
            // 1️⃣ Get CSRF cookie first
            await api.get('/sanctum/csrf-cookie');
            // 2️⃣ Then login
            const token = localStorage.getItem("token");
            //console.log("user" , user);
            //
            const response = await api.post(
                '/api/user/update-shipping-address',
                { id : id, name : user.name, email : user.email, phone : phone, address : address, city : city, state : state, postalcode : postalcode, country : country, landmark : user.landmark, address_line_2: user.address_line_2 },
                {
                    headers: {
                    Authorization: `Bearer ${token}`, // include login token
                    },
                }
            );
            //console.log('response:', response);
            if (response.data.success === false) {
                toast.dismiss();
                toast.error(response.data.message || 'Something went wrong!');
                return;
            }
            toast.dismiss();
            toast.success(response.data.message || 'Account successfully updated!');
            setButtonText('Update Address');
            setTimeout(() => {
                router.push('/user/my-address'); // 👈 your next page path
            }, 500);
            
        } catch (error) {
            setButtonText('Update Address');
            //console.log(error);
            toast.dismiss();
            toast.error('Failed. Please try again.');
        }
    };


    useEffect(() => {
        const fetchAddress = async () => {
        const token = localStorage.getItem('token');
        const { data } = await api.get(`/api/user/single-shipping-address/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        //console.log("data", data.data);
        setSinlgeAddress(data.data);
        setUser((prev) => ({ ...prev, ['name']: data.data.name }));
        setUser((prev) => ({ ...prev, ['email']: data.data.email }));
        setPhone(data.data.mobile);
        setAddress(data.data.address_line_1);
        setUser((prev) => ({ ...prev, ['address_line_2']: data.data.address_line_2 }));
        setState(data.data.state);
        setCity(data.data.city);
        setCountry(data.data.country);
        setPostalCode(data.data.postcode);
        setUser((prev) => ({ ...prev, ['landmark']: data.data.landmark }));
    };

    if (id) fetchAddress();
  }, [id]);

  //if (!singleaddress) return <p>Loading...</p>;

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
                                        <h2>Update Address</h2>
                                    </div>
                                    <div className="addresses-grid">
                                        <div className="address-card aos-init aos-animate active mb-3" data-aos="fade-up" data-aos-delay="200">
                                            <form className="php-email-form settings-form ajaxformfileupload" onSubmit={handleSubmit}  method="post">
                                                <div className="row g-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name " value={user.name} onChange={handleChange}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email " value={user.email} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Phone Number</label>
                                                        <input type="tel" className="form-control" id="phone_number" name="phone_number" placeholder="Enter Phone Number " value={phone} onChange={e => setPhone(e.target.value)} />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="form-label">Address</label>
                                                        
                                                        <LoadScript
                                                            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                                                            libraries={libraries}
                                                            >
                                                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>                                                                
                                                                <input type="text" className="form-control pac-target-input" id="autocomplete" name="address" placeholder="Enter Address " 
                                                                 value={address} onChange={e => setAddress(e.target.value)}/>
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
                                                        <input type="text" className="form-control" id="state" name="state" placeholder="Enter State " value={state}  onChange={e => setState(e.target.value)}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" id="city" name="city" placeholder="Enter City " value={city}  onChange={e => setCity(e.target.value)}/>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="form-label">Pin Code</label>
                                                        <input type="text" className="form-control" id="pin_code" name="pin_code" placeholder="Enter Pin Code " value={postalcode}  onChange={e => setPostalCode(e.target.value)}/>
                                                    </div>
                                                </div>

                                                <div className="form-buttons">
                                                    <button type="submit" className="btn btn-primary mt-3">{buttonText}</button>
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
