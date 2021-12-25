import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import Error from "next/error";
import DefaultErrorPage from "next/error";
import Link from "next/link";
import { Button } from "@supabase/ui";

type Profile = {
  id: number;
  name: string;
  work: string;
  description: string;
  image: string;
};

type Props = {
  errorCode: number;
  profiles: Profile[];
};

const Profile: FC<Props> = (props) => {
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
              <Link href="/admin/profiles/new" passHref>
                <Button>新規作成</Button>
              </Link>

              <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
                      Select Profile
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      いくつかプロフィールを作れて、その中で選択したものが選ばれます。
                      選択していないプロフィールはポートフォリオに表示されません。
                    </p>
                  </div>
                  <div className="flex flex-wrap -m-4">
                    {props.profiles?.map((profile) => (
                      <div className="p-4 lg:w-1/2" key={profile.id}>
                        <Link
                          href="/admin/profiles/[id]"
                          as={`/admin/profiles/${profile.id}`}
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
                                {profile.name}
                              </h2>
                              <h3 className="text-gray-500 mb-3">
                                {profile.work}
                              </h3>
                              <h3 className="text-gray-500 mb-3">
                                -------------------紹介文-------------------
                              </h3>
                              <p className="mb-4">{profile.description}</p>
                              <span className="inline-flex">
                                <a className="text-gray-500">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                  </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                  </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                  </svg>
                                </a>
                              </span>
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles`
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
      profiles: json,
    },
  };
};

export default Profile;
