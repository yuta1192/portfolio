import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import Error from "next/error";
import DefaultErrorPage from "next/error";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../../styles/contact.module.css";

const yearRegExp = /[0-9]{4}/;
const monthRegExp = /0[1-9]|1[0-2]/;

type Career = {
  id: number;
  description: string;
  year: number;
  month: number;
};

type Props = {
  errorCode: number;
  career: Career;
};

const Careers: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Career>();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);

  const onSubmit: SubmitHandler<Career> = async (career) => {
    const result = await fetch("/api/careerNew", {
      body: JSON.stringify(career),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setIsSuccessfullySubmitted(result.ok);
    reset();
  };

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
              <form className="w-full pt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      year
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="2020"
                      {...register("year", {
                        required: true,
                        pattern: {
                          value: yearRegExp,
                          message: "数値:xxxxで記入してください。",
                        },
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.year?.type === "required" &&
                        "Yearが入力されていません。"}
                      {errors.year?.type === "pattern" &&
                        "xxxxで記入してください。"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      month
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="08"
                      {...register("month", {
                        required: true,
                        pattern: {
                          value: monthRegExp,
                          message: "01~12で記入してください。",
                        },
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.month?.type === "required" &&
                        "MONTHが入力されていません。"}
                      {errors.month?.type === "pattern" &&
                        "01~12で記入してください。"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-gray-200 bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:outline-none focus:bg-white focus:border-gray-500"
                      rows={3}
                      placeholder="Your message"
                      {...register("description", {
                        required: true,
                        maxLength: 1000,
                      })}
                    ></textarea>
                    <span className={styles["error-message"]}>
                      {errors.description?.type === "required" &&
                        "説明文が入力されていません。"}
                      {errors.description?.type === "maxLength" &&
                        "説明文は1000文字以下で入力してください。"}
                    </span>
                  </div>
                </div>

                <div className="p-2 w-full pt-12">
                  <div className="flex flex-col text-center">
                    <input type="submit" />
                  </div>
                </div>
                {isSuccessfullySubmitted && (
                  <div className="text-center text-green-700">
                    更新が完了しました。
                  </div>
                )}
              </form>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ params }: { params: any }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/careers/new`
  );
  const errorCode = response.ok ? false : response.status;
  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      errorCode,
      career: {},
    };
  }

  return {
    props: {
      errorCode,
      career: json,
    },
  };
}

export default Careers;
