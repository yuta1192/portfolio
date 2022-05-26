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
import Modal from "react-modal";
import { useState } from "react";
import { Button, IconTrash, Space, Typography } from "@supabase/ui";
import { useRouter } from "next/router";

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

type App = {
  id: number;
  name: string;
  description: string;
  url: string;
};

type Props = {
  errorCode: number;
  app: App;
};

const Apps: FC<Props> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<App>({
    mode: "onSubmit",
    defaultValues: {
      id: props.app.id,
      name: props.app.name,
      description: props.app.description,
      url: props.app.url,
    },
  });

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);

  const onSubmit: SubmitHandler<App> = async (app) => {
    const result = await fetch("/api/appUpdate", {
      body: JSON.stringify(app),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setIsSuccessfullySubmitted(result.ok);
    reset();
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false);
  };

  const propDelete = async (props: any) => {
    const result = await fetch("/api/modelDestroy", {
      body: JSON.stringify({ id: props.app.id, model: "my_apps" }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (result.status === 200) {
      // pushState の場合
      router.push("/admin/my_apps");

      // replaceState の場合
      router.replace("/admin/my_apps");
    }
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
              <Button danger icon={<IconTrash />} onClick={openModal}>
                Delete
              </Button>

              <Modal
                // isOpenがtrueならモダールが起動する
                isOpen={modalIsOpen}
                // モーダルが開いた後の処理を定義
                onAfterOpen={afterOpenModal}
                // モーダルを閉じる処理を定義
                onRequestClose={closeModal}
                // スタイリングを定義
                style={{
                  overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    width: "500px",
                    height: "150px",
                    transform: "translate(-50%, -50%)",
                  },
                }}
              >
                <h2>本当に削除しますか。</h2>
                <Typography.Text>
                  一度削除した場合データを戻すことはできません。
                  削除してもよろしいでしょうか。
                </Typography.Text>
                <br />
                <Space>
                  <Button type="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    danger
                    icon={<IconTrash />}
                    onClick={() => propDelete(props)}
                  >
                    Delete
                  </Button>
                </Space>
              </Modal>

              <form className="w-full pt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
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

                <div className="flex flex-wrap mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Url
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="https://"
                      {...register("url", {
                        required: true,
                      })}
                    />
                    <span className={styles["error-message"]}>
                      {errors.url?.type === "required" &&
                        "URLが入力されていません。"}
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

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/my_apps`
  );

  const apps = await res.json();

  const paths = apps.map((app: { id: number }) => ({
    params: { id: app.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/my_apps/${params.id}/edit`
  );
  const errorCode = response.ok ? false : response.status;
  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      errorCode,
      app: {},
    };
  }

  return {
    props: {
      errorCode,
      app: json,
    },
  };
}

export default Apps;
