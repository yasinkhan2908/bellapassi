import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
// import 'aos/dist/aos.css';

import './public/assets/vendor/bootstrap/css/bootstrap.min.css';
import './public/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/assets/vendor/swiper/swiper-bundle.min.css';

import './public/assets/css/custom.css';
import './public/assets/css/color.css';
import './public/assets/css/main.css';

const inter = Inter({ subsets: ['latin'] });
import { Toaster } from 'react-hot-toast';
import AOSWrapper from "./components/AOSWrapper";


export const metadata = {
  title: 'Bella Passi - Online Fashion | Best Fashion Deals In India',
  description: 'Affordable fashion deals for all seasons and styles',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
   
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <AOSWrapper>
          {children}
        </AOSWrapper>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}