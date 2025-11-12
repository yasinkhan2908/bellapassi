// app/login/page.tsx
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../actions/auth-actions';
import { LoginForm } from '../components/login/Login';
import { Header, Footer } from '../components/common';
export default function Login() {
  return (
    <div className="index-page">
        <Header />
        <main className="main">
          <div className="d-flex h-screen mt-20 justify-center p-3">
            <div>
              <div className="z-10">
                <div className="p-0 bg-white mx-auto rounded-2xl w-100">
                  <div className="mb-4 mt-5">
                    <h3 className="font-semibold text-lg text-gray-800"> 
                      Login <span className="text-gray-500 text-sm">or</span> Signup 
                    </h3>
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
}