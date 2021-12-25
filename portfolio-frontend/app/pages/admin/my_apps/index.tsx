import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import Error from "next/error";
import DefaultErrorPage from "next/error";
import Link from "next/link";
import { Button } from "@supabase/ui";

type App = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type Props = {
  errorCode: number;
  apps: App[];
};

const Apps: FC<Props> = (props) => {
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
              <Link href="/admin/my_apps/new" passHref>
                <Button>新規作成</Button>
              </Link>

              <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
                      Select App
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      自分が作成したアプリやサービスなどを表示します。
                    </p>
                  </div>
                  <div className="flex flex-wrap -m-4">
                    {props.apps?.map((app) => (
                      <div className="p-4 lg:w-1/2" key={app.id}>
                        <Link
                          href="/admin/my_apps/[id]"
                          as={`/admin/my_apps/${app.id}`}
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
                                {app.name}
                              </h2>
                              <h3 className="text-gray-500 mb-3">
                                -------------------紹介文-------------------
                              </h3>
                              <p className="mb-4">{app.description}</p>
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/my_apps`
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
      apps: json,
    },
  };
};

export default Apps;
