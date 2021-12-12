import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@supabase/ui";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Wellcome to
              <br className="hidden lg:inline-block" />
              My Portfolio!
            </h1>
            <p className="mb-8 leading-relaxed">
              No pain no gain. I want to enjoy life to the fullest!
            </p>
            <div className="flex justify-center">
              <Link href="/profiles" passHref>
                <Button
                  type="primary"
                  size="medium"
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Profile
                </Button>
              </Link>
              <Link href="/contacts" passHref>
                <Button
                  type="default"
                  size="medium"
                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <div className="object-cover object-center rounded">
              <Image
                alt="hero"
                src="/background.jpg"
                layout="responsive"
                width={720}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
