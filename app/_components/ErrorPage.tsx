"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";

export default function ErrorPage({ message }: { message: string }) {
  const router = useRouter();

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-lg font-medium text-purple-500 ">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">{message}</h1>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border gap-x-2 sm:w-auto hover:bg-gray-100 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>
                <FormattedMessage id="back-btn" />
              </span>
            </button>

            <Link
              href={"/"}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-purple-700 shrink-0 sm:w-auto hover:bg-purple-800"
            >
              <FormattedMessage id="home" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
