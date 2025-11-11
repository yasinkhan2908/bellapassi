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
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import api from '../lib/axios';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}