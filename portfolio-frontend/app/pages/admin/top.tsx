import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Header from "../../components/admin/Header";
import Link from "next/link";
import TopCountLink from "../../components/admin/TopCountLink";
import DefaultErrorPage from "next/error";

type Counts = {
  name: string;
  count: number;
};

type Props = {
  counts: Counts[];
};

const Top: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      {!session && (
        <>
          {loading ? <>Loading ...</> : <DefaultErrorPage statusCode={404} />}
        </>
      )}
      {session && (
        <div className="flex h-screen overflow-hidden bg-white rounded-lg">
          <Header />
          <div className="flex flex-col flex-1 w-0 overflow-hidden">
            <main className="relative flex-1 overflow-y-auto focus:outline-none">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Portfolio
                      <br />
                      Dashbord
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      ファイル数、閲覧数などを表示します。
                    </p>
                  </div>
                  <div className="flex flex-wrap -m-4 text-center">
                    {props.counts?.map((count) => (
                      <div
                        className="p-4 md:w-1/4 sm:w-1/2 w-full"
                        key={count.name}
                      >
                        <TopCountLink item={count}></TopCountLink>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/top`
  );
  const json = await response.json();

  // jsonが存在しない場合
  if (!json || response.status !== 200) {
    return {
      props: {},
    };
  }

  return {
    props: {
      counts: json,
    },
  };
};

export default Top;
