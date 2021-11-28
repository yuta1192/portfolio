import React, { FC } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Error from "next/error";

type MyApp = {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
};

type Props = {
  errorCode: number;
  my_apps: MyApp[];
};

const MyApps: FC<Props> = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {props.my_apps?.map((app) => (
              <div className="p-4 md:w-1/3" key={app.id}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <a
                    href={app.url ? app.url : "/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {/* todo hrefにはnullだめらしい、urlない場合はページ存在しないページを作成しそこに飛ばそう */}
                    <Image
                      className="lg:h-48 md:h-36 w-full object-cover object-center border-10"
                      src={!app.image ? "/no_image.png" : app.image}
                      width={720}
                      height={400}
                      alt="app_image"
                    />
                  </a>
                  <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {app.name}
                    </h1>
                    <p className="leading-relaxed mb-3">{app.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my_appsss`
  );
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
      my_apps: json,
    },
  };
};

export default MyApps;
