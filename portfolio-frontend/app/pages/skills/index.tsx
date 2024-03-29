import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SkillNavBer from "../../components/SkillNavBer";
import Error from "next/error";

type Skill = {
  id: number;
  name: string;
  kind: number;
  image: string;
};

type Props = {
  errorCode: number;
  skills: Skill[];
};

const Skills: FC<Props> = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  return (
    <>
      <div className="flex overflow-hidden bg-white rounded-lg">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div
              className="
              flex flex-col flex-grow
              pt-5
              overflow-y-auto
              border-r border-gray-50
            "
            >
              <div className="flex flex-col items-center flex-shrink-0 px-4">
                <h2
                  className="
                    block
                    p-2
                    text-xl
                    font-medium
                    tracking-tighter
                    text-gray-900
                    transition
                    duration-500
                    ease-in-out
                    transform
                    cursor-pointer
                    hover:text-gray-900
                  "
                >
                  スキル
                </h2>
              </div>
              <div className="flex flex-col flex-grow px-4 mt-5">
                <nav className="flex-1 space-y-1">
                  <SkillNavBer></SkillNavBer>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="text-gray-600 body-font w-full">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
                ALL MY SKILLS!
              </h1>
            </div>
            <div className="flex flex-wrap m-4">
              {props.skills?.map((skill) => (
                <div className="lg:p-4 lg:w-1/4 md:w-1/2" key={skill.id}>
                  <div className="h-full flex flex-col items-center text-center">
                    <div className="hidden lg:block">
                      <Image
                        className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                        src={!skill.image ? "/no_image.png" : skill.image}
                        width={200}
                        height={200}
                        alt="skill_image"
                      />
                    </div>
                    <div className="block lg:hidden">
                      <Image
                        className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                        src={!skill.image ? "/no_image.png" : skill.image}
                        width={150}
                        height={150}
                        alt="skill_image"
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        {skill.name}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skills`);
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
      skills: json,
    },
  };
};

export default Skills;
