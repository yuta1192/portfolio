import React, { FC } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import CareerNavBer from "../components/CareerNavBer";
import Error from "next/error";

type Career = {
  id: number;
  year: number;
  month: number;
  title: string;
  description: string;
};

type Props = {
  careers: Career[];
};

const Careers: FC<Props> = (props) => {
  return (
    <>
      <div className="flex overflow-hidden bg-white rounded-lg">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div
              className="
              flex flex-col flex-grow
              pt-5
              overflow-y-auto
              bg-white
              border-r border-gray-50
            "
            >
              <div className="flex flex-col items-center flex-shrink-0 px-4">
                <h2
                  className="
                    block
                    p-2
                    text-xl
                    font-medium
                    tracking-tighter
                    text-gray-900
                    transition
                    duration-500
                    ease-in-out
                    transform
                    cursor-pointer
                    hover:text-gray-900
                  "
                >
                  経歴
                </h2>
              </div>
              <div className="flex flex-col flex-grow px-4 mt-5">
                <nav className="flex-1 space-y-1 bg-white">
                  <CareerNavBer careers={props.careers}></CareerNavBer>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                {props.careers?.map((career) => (
                  <h1
                    className="text-lg text-neutral-600"
                    key={career.id}
                    id={"career" + career.id}
                  >
                    <div className="container w-full px-5 py-24 mx-auto lg:px-32">
                      <div className="flex flex-col w-full mx-auto mb-2 prose text-left prose-md">
                        <div className="mb-5 border-b border-gray-200">
                          <div className="flex flex-wrap items-baseline -mt-2">
                            <h5>{career.month + "/" + career.year}</h5>
                            <p className="mt-1 ml-2">{career.title}</p>
                          </div>
                        </div>
                        <h1>{career.description}</h1>
                      </div>
                    </div>
                  </h1>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/careers`
  );
  const errorCode = response.ok ? false : response.status;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      props: {},
    };
  }

  return {
    props: {
      careers: json,
    },
  };
};

export default Careers;
