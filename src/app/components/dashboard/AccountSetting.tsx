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
import Swal from 'sweetalert2';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
}

interface FormErrors {
    [x: string]: string | undefined;
    first_name?: string;
    last_name?: string;
}

export default function AccountSetting() {
    const router = useRouter(); // ✅ initialize router
    //toast.loading('Logging in...');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [result, setResult] = useState<{ error?: string; data?: any } | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        email: ''
    });

    const MobileNumber = localStorage.getItem("user_mobile");

    // Custom validation function to replace Parsley.js
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                            cache: 'no-store', // ensures fresh data each time
                        });
            const responseData = await data.json();
            console.log('data', responseData.data);
            setUser(responseData.data);
            setFormData(responseData.data);
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            // Swal.fire({
            //   title: 'Validation Error',
            //   text: 'Please fill in all required fields correctly',
            //   icon: 'error',
            //   confirmButtonText: 'OK'
            // });
            return;
        }

        setIsSubmitting(true);
       
        // 1️⃣ Get CSRF cookie first
        // 2️⃣ Then login
        const token = localStorage.getItem("token");
        //console.log("user" , user);
        //
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update-profile`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`, // include login token
                                },
                                body: JSON.stringify(formData),
                            });
        const result = await response.json();   
        //console.log('Login success:', response);
        if (!result.success) {
            throw new Error(result.message || 'Something went wrong!');
        }
        
            
        Swal.fire({
            title: 'Success',
            text: result.message || 'Account successfully updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#2ee44cff',
            cancelButtonColor: 'rgba(222, 41, 50, 1)',
            confirmButtonText: 'Ok'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Redirect to dashboard
                localStorage.setItem("user_first_name",formData.first_name);
                localStorage.setItem("user_last_name",formData.last_name);
                setIsSubmitting(false);
                // Reset form
                // setFormData({
                //     first_name: '',
                //     last_name: '',
                //     email: ''
                // });
                // router.push('/user/dashboard');
            }
        });
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
                                                            <input type="text" className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} id="first_name" name="first_name" placeholder='Enter first name' value={formData.first_name} onChange={handleChange}/>
                                                            {errors.first_name && <div className="invalid-feedback d-block">{errors.first_name}</div>}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Last Name</label>
                                                            <input type="text" className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} id="last_name" name="last_name" placeholder='Enter Last name' value={formData.last_name} onChange={handleChange}/>
                                                            {errors.last_name && <div className="invalid-feedback d-block">{errors.last_name}</div>}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Email</label>
                                                            <input type="email" className="form-control" id="email" name="email"  placeholder='Enter email' value={formData.email} onChange={handleChange}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Phone</label>
                                                            <input type="tel" className="form-control" id="mobile" name="mobile"  maxLength={10}  placeholder='Enter phone number' value={MobileNumber || ''} readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="form-buttons">
                                                        <button 
                                                        type="submit" 
                                                        className="btn btn-primary mt-3"
                                                        disabled={isSubmitting}
                                                        >
                                                        {isSubmitting ? 'Update...' : 'Update Account'}
                                                        </button>
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