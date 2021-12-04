import React, { FC } from "react";
import Link from "next/link";
import Error from "next/error";
import { Button } from "@supabase/ui";

type Qiita = {
  qiita_id: string;
  id: number;
  name: string;
  description: string;
  publish_date: number;
  url: string;
};

type Props = {
  errorCode: number;
  qiitas: Qiita[];
};

const Qiitas: FC<Props> = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  return (
    <>
      {props.qiitas?.map((qiita) => (
        <section className="text-gray-600 body-font" key={qiita.qiita_id}>
          <div className="container px-5 py-12 mx-auto items-center">
            <div className="md:py-8 mb-10 md:mb-0 pb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                {qiita.name}
              </h1>
              <h2 className="border-b border-gray-200">
                投稿日：{qiita.publish_date}
              </h2>
              <br />
              <p className="leading-relaxed text-base">{qiita.description}</p>
              <Link href={qiita.url}>
                <a className="text-indigo-500 inline-flex items-center mt-4">
                  <Button block>記事を見る</Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/qiitas`);
  const errorCode = response.ok ? false : response.status;
  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      errorCode,
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
