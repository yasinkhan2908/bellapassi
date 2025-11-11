'use client';
import Link from 'next/link';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

//
export default function Address() {
  const router = useRouter(); // ✅ initialize router
  
  return (    
        <section id="checkout" className="checkout section">
        <div className="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

            <div className="row">
                <div className="col-lg-7">
                    <div className="checkout-container aos-init aos-animate" data-aos="fade-up">
                        <form className="checkout-form">
                            <div className="section-header">
                                <div className="add-address d-flex flat-title flex-row justify-content-between align-items-center">
                                    <h5>Select Address</h5>
                                    <Link href="/add-address" className="btn btn-primary btn-sm mb-4 text-white"><i className="bi bi-plus-lg"></i> Add Address</Link>
                                </div>
                            </div>
                             <div className="account">
                                <div className="addresses-grid w-100">
                                    <div className="address-card aos-init aos-animate active w-100" data-aos="fade-up" data-aos-delay="200">
                                        <div className="card-header">
                                            <h4>yasin khan pathan</h4>
                                        </div>
                                        <div className="card-body">
                                            <p className="address-text"><i className="bi bi-geo-alt"></i> Vijay Nagar Police Station, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh, India</p>
                                            <div className="contact-info">
                                                <div><i className="bi bi-envelope"></i> pathan.yasin98@gmail.com</div>
                                                <div><i className="bi bi-telephone"></i> 9630813268</div>
                                            </div>
                                            <Link href="/change-address" className="btn btn-primary  btn-sm mt-3 text-white"><i className="bi bi-geo-alt"></i> Change Address</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="order-summary aos-init aos-animate" data-aos="fade-left" data-aos-delay="200">
                        <div className="order-summary-header">
                            <h3>Order Summary</h3>
                            <span className="item-count">2 Items</span>
                        </div>

                        <div className="order-summary-content">
                            <div className="order-items">
                                <div className="order-item">
                                    <Link target="_blank" href="" className="sc-product-thumb">  
                                        <div className="order-item-image">
                                            <Image height={40} width={40} loading='lazy' src="/img/51.webp" alt="Product" className="img-fluid"/>
                                        </div>
                                    </Link>
                                    <div className="order-item-details">
                                            <h4>Printed, Daily wear, Georgette Saree with unstitched blouse piece</h4>
                                            <p className="order-item-variant">Size: Free</p>
                                            <div className="order-item-price">
                                                <span className="quantity">1 ×</span>
                                                <span className="price">₹ 570</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-item">
                                        <Link target="_blank" href="" className="sc-product-thumb">  
                                            <div className="order-item-image">
                                                <Image height={40} width={40} src="/img/52.webp" alt="Product" className="img-fluid"/>
                                            </div>
                                        </Link>
                                        <div className="order-item-details">
                                            <h4>Printed, Daily wear, Georgette Saree with unstitched blouse piece</h4>
                                            <p className="order-item-variant">Size: Free</p>
                                            <div className="order-item-price">
                                                <span className="quantity">1 ×</span>
                                                <span className="price">₹ 475</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="order-totals">
                                    <div className="order-subtotal d-flex justify-content-between">
                                        <span>Subtotal</span>
                                        <span>₹ 1045</span>
                                    </div>
                                    <div className="order-total d-flex justify-content-between">
                                        <span>Total</span>
                                        <span>₹ 1045</span>
                                    </div>
                                </div>
                                <div className="cart">
                                    <div className="cart-summary">
                                        <div className="checkout-button">
                                            <Link href="/checkout" className="btn btn-accent text-white w-100">
                                                Proceed to Checkout <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>

                                        <div className="continue-shopping">
                                            <Link href="#" className="btn btn-link w-100">
                                                <i className="bi bi-arrow-left"></i> Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="secure-checkout">
                                    <div className="secure-checkout-header">
                                        <i className="bi bi-shield-lock"></i>
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="payment-icons">
                                        <i className="bi bi-credit-card-2-front"></i>
                                        <i className="bi bi-credit-card"></i>
                                        <i className="bi bi-paypal"></i>
                                        <i className="bi bi-apple"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="termsModal" aria-labelledby="termsModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="termsModalLabel">Terms and Conditions</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                                <p>Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                                <p>Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="privacyModal" aria-labelledby="privacyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privacyModalLabel">Privacy Policy</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                                <p>Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                                <p>Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>  
  );
}