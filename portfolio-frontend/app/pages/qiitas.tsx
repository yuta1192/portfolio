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
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
              {qiita.name}
            </h2>
            <div className="md:w-3/5 md:pl-6">
              {qiita.publish_date}
              <p className="leading-relaxed text-base">{qiita.description}</p>
              <div className="flex md:mt-4 mt-6">
                <Link href={qiita.url}>
                  <a>
                    <Button block>記事を見る</Button>
                  </a>
                </Link>
              </div>
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
