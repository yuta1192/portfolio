import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import Error from "next/error";
import DefaultErrorPage from "next/error";
import Link from "next/link";
import { Button } from "@supabase/ui";

type Qiita = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type Props = {
  errorCode: number;
  qiitas: Qiita[];
};

const Qiitas: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

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
              <Link href="/admin/qiitas/new" passHref>
                <Button>新規作成</Button>
              </Link>

              <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
                      Select Qiita
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      自分が作成したQiitaを表示します。
                    </p>
                  </div>
                  <div className="flex flex-wrap -m-4">
                    {props.qiitas?.map((qiita) => (
                      <div className="p-4 lg:w-1/2" key={qiita.id}>
                        <Link
                          href="/admin/qiitas/[id]"
                          as={`/admin/qiitas/${qiita.id}`}
                          passHref
                        >
                          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <Image
                              alt="team"
                              className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                              src="/no_image.png"
                              width={200}
                              height={200}
                            />
                            <div className="flex-grow sm:pl-8">
                              <h2 className="title-font font-medium text-lg text-gray-900">
                                {qiita.name}
                              </h2>
                              <h3 className="text-gray-500 mb-3">
                                -------------------紹介文-------------------
                              </h3>
                              <p className="mb-4">{qiita.description}</p>
                            </div>
                          </div>
                        </Link>
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/qiitas`
  );
  const errorCode = response.ok ? false : response.status;
  const json = await response.json();

  // jsonが存在しない場合
  if (!json || response.status !== 200) {
    return {
      errorCode: response.status ? response.status : 404,
      props: {},
    };
  }

  return {
    props: {
      errorCode,
      qiitas: json,
    },
  };
};

export default Qiitas;
