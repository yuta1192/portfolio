import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/admin/Header";
import Image from "next/image";
import Error from "next/error";
import DefaultErrorPage from "next/error";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../../styles/contact.module.css";

const nameRomajiRegExp = /^[a-zA-Z]+$/;
const birthdayRegExp = /^\d{4}-\d{2}-\d{2}$/;

type Profile = {
  id: number;
  name: string;
  name_romaji: string;
  description: string;
  address: string;
  birthday: number;
  birthplace: string;
  work: string;
  work_address: string;
  github_url: string;
  twitter_url: string;
  qiita_url: string;
  facebook_url: string;
  youtube_url: string;
  instagram_url: string;
  big_image: string;
  small_image: string;
  selected: boolean;
};

type Props = {
  errorCode: number;
  profile: Profile;
};

const Profiles: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Profile>({
    mode: "onSubmit",
    defaultValues: {
      id: props.profile.id,
      name: props.profile.name,
      name_romaji: props.profile.name_romaji,
      description: props.profile.description,
      address: props.profile.address,
      birthday: props.profile.birthday,
      birthplace: props.profile.birthplace,
      work: props.profile.work,
      work_address: props.profile.work_address,
      github_url: props.profile.github_url,
      twitter_url: props.profile.twitter_url,
      qiita_url: props.profile.qiita_url,
      facebook_url: props.profile.facebook_url,
      youtube_url: props.profile.youtube_url,
      instagram_url: props.profile.instagram_url,
      big_image: props.profile.big_image,
      small_image: props.profile.small_image,
      selected: props.profile.selected,
    },
  });

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);

  const onSubmit: SubmitHandler<Profile> = async (profile) => {
    const result = await fetch("/api/profileUpdate", {
      body: JSON.stringify(profile),
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
                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      {...register("name", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.name?.type === "required" &&
                        "名前が入力されていません。"}
                      {errors.name?.type === "maxLength" &&
                        "名前は20文字以下で入力してください。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Name Romaji
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      {...register("name_romaji", {
                        required: true,
                        maxLength: 20,
                        pattern: {
                          value: nameRomajiRegExp,
                          message: "ローマ字で記入してください。",
                        },
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.name_romaji?.type === "required" &&
                        "名前(ローマ字)が入力されていません。"}
                      {errors.name_romaji?.type === "maxLength" &&
                        "名前(ローマ字)は20文字以下で入力してください。"}
                      {errors.name_romaji?.type === "pattern" &&
                        "ローマ字で記入してください。"}
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
                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Adress
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      {...register("address", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.address?.type === "required" &&
                        "住所が入力されていません。"}
                      {errors.address?.type === "maxLength" &&
                        "住所は20文字以下で入力してください。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Work Adress
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      {...register("work_address", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.work_address?.type === "required" &&
                        "働き先が入力されていません。"}
                      {errors.work_address?.type === "maxLength" &&
                        "働き先は20文字以下で入力してください。"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Birthday
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="1999-10-10"
                      {...register("birthday", {
                        required: true,
                        pattern: {
                          value: birthdayRegExp,
                          message: "xxxx-xx-xxで記入してください。",
                        },
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.birthday?.type === "required" &&
                        "誕生日が入力されていません。"}
                      {errors.birthday?.type === "pattern" &&
                        "誕生日は、xxxx-xx-xxで記入してください。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Birthplace
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="東京都"
                      {...register("birthplace", {
                        required: true,
                        maxLength: 50,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.birthplace?.type === "required" &&
                        "出身地が入力されていません。"}
                      {errors.birthplace?.type === "maxLength" &&
                        "出身地は50文字以下で入力してください。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Work
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="営業"
                      {...register("work", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.work?.type === "required" &&
                        "仕事が入力されていません。"}
                      {errors.work?.type === "maxLength" &&
                        "仕事は20文字以下で入力してください。"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Github Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="https://"
                      {...register("github_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.github_url?.type === "required" &&
                        "Github URLが入力されていません。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Twitter Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                      {...register("twitter_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.twitter_url?.type === "required" &&
                        "Twitter URLが入力されていません。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Qiita Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                      {...register("qiita_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.qiita_url?.type === "required" &&
                        "Qiita URLが入力されていません。"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Facebook Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                      {...register("facebook_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.facebook_url?.type === "required" &&
                        "Facebook URLが入力されていません。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Youtube Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                      {...register("youtube_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.youtube_url?.type === "required" &&
                        "Youtube URLが入力されていません。"}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Instagram Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                      {...register("instagram_url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.instagram_url?.type === "required" &&
                        "Instagram URLが入力されていません。"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="flex justify-center mt-8">
                      <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                        <div className="m-4">
                          <label className="inline-block mb-2 text-gray-500">
                            Big Image
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                  Attach a file
                                </p>
                              </div>
                              <input
                                type="file"
                                className="opacity-0"
                                {...register("big_image", {})}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="flex justify-center mt-8">
                      <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                        <div className="m-4">
                          <label className="inline-block mb-2 text-gray-500">
                            Small Image
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                  Attach a file
                                </p>
                              </div>
                              <input
                                type="file"
                                className="opacity-0"
                                {...register("small_image", {})}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/2"></div>
                  <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      {...register("selected", {})}
                    />
                    <span className="text-sm">profileを選択する</span>
                  </label>
                </div>
                <div className="p-2 w-full">
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

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles`
  );

  const profiles = await res.json();

  const paths = profiles.map((profile: { id: number }) => ({
    params: { id: profile.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles/${params.id}/edit`
  );
  const errorCode = response.ok ? false : response.status;
  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      errorCode,
      profile: {},
    };
  }

  return {
    props: {
      errorCode,
      profile: json,
    },
  };
}

export default Profiles;