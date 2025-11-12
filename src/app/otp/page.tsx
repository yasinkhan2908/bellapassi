import { Suspense } from 'react';
import OtpClient from './OtpClient';

export default function OtpPage() {
  return (
    <Suspense fallback={<OtpFallback />}>
      <OtpClient />
    </Suspense>
  );
}

function OtpFallback() {
  return (
    <div className="d-flex h-screen mt-20 justify-center">
      <div className="p-4 bg-white mx-auto rounded-2xl w-100">
        <div className="mb-4">
          <div className="d-flex justify-center">
            <div className="w-40 h-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="d-flex flex-col mt-4 text-blue text-center">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="p-4 space-y-2">
            <div className="my-4 relative flex w-full flex-wrap items-stretch">
              <div className="d-flex gap-2 justify-center mt-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="m-2 border h-10 w-12 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="mt-5">
                <div className="rounded-md bg-gray-200 mx-8 h-12 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}