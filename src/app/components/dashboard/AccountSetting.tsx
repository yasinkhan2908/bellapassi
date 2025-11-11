'use client';
import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import { AccountSidebar } from './AccountSidebar';
//
export default function AccountSetting() {
    const router = useRouter(); // ✅ initialize router
    //toast.loading('Logging in...');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [result, setResult] = useState<{ error?: string; data?: any } | null>(null);

    const [user, setUser] = useState({
                                first_name: '',
                                last_name: '',
                                email: '',
                                phone: ''
                            });
    
    // ✅ Fetch current profile on page load
    useEffect(() => {
        //console.log("local token",localStorage.getItem('token'))
        const fetchProfile = async () => {
        try {
            const { data } = await api.get('/api/user/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            //console.log('data', data.data);
            setUser(data.data);
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
        };
        fetchProfile();
    }, []);

    // ✅ Handle input changes dynamically
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            toast.loading('Logging in...');
            // 1️⃣ Get CSRF cookie first
            await api.get('/sanctum/csrf-cookie');
            // 2️⃣ Then login
            const token = localStorage.getItem("token");
            //console.log("user" , user);
            const firstname    = user.first_name;
            const lastname     = user.last_name;
            const email        = user.email;
            const mobilenumber = user.email;
            //
            const response = await api.post(
                '/api/user/update-profile',
                { first_name : user.first_name, last_name : user.last_name, email : user.email },
                {
                    headers: {
                    Authorization: `Bearer ${token}`, // include login token
                    },
                }
            );
            //console.log('Login success:', response);
            if (response.data.success === false) {
                toast.dismiss();
                toast.error(response.data.message || 'Something went wrong!');
                return;
            }
            toast.dismiss();
            toast.success(response.data.message || 'Account successfully updated!');
            
        } catch (error) {
            //console.log(error);
            toast.dismiss();
            toast.error('Login failed. Please try again.');
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
                                        <h2>Account Setting</h2>
                                        
                                    </div>

                                    <div className="addresses-grid">                                        
                                        <div className="settings-content">
                                            <div className="settings-section aos-init aos-animate" data-aos="fade-up">
                                                <h3>Personal Information</h3>
                                                <form className="php-email-form settings-form ajaxformfileupload" onSubmit={handleSubmit}  method="post">
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label">First Name</label>
                                                            <input type="text" className="form-control" id="first_name" name="first_name" placeholder='Enter first name' value={user.first_name} onChange={handleChange}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" id="last_name" name="last_name" placeholder='Enter Last name' value={user.last_name} onChange={handleChange}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Email</label>
                                                            <input type="email" className="form-control" id="email" name="email"  placeholder='Enter email' value={user.email} onChange={handleChange}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Phone</label>
                                                            <input type="tel" className="form-control" id="phone_number" name="phone_number"  maxLength={10}  placeholder='Enter phone number'  value={user.phone} onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className="form-buttons">
                                                        <button type="submit" className="btn btn-primary" >Save Changes</button>
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
            </div>
        </section>
    </main>
  );
}