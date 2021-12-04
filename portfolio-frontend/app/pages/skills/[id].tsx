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
  skill_type: number;
  skills: Skill[];
};

const Skills: FC<Props> = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  // function SkillTitle(props: { skill_type: number }) {
  //   if (props.skill_type == 1) {
  //     return (
  //       <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
  //         FrontEnd
  //       </h1>
  //     );
  //   } else if (props.skill_type == 2) {
  //     return (
  //       <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
  //         ServerSide
  //       </h1>
  //     );
  //   } else if (props.skill_type == 3) {
  //     return (
  //       <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
  //         BackEnd
  //       </h1>
  //     );
  //   } else {
  //     return (
  //       <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
  //         Another
  //       </h1>
  //     );
  //   }
  // }

  function SkillTitle(props: { skill_type: number }) {
    if (props.skill_type == 1) {
      return <>FrontEnd</>;
    } else if (props.skill_type == 2) {
      return <>ServerSide</>;
    } else if (props.skill_type == 3) {
      return <>BackEnd</>;
    } else {
      return <>Another</>;
    }
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
                <SkillTitle skill_type={props.skill_type} />
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              {props.skills?.map((skill) => (
                <div className="p-4 lg:w-1/4 md:w-1/2" key={skill.id}>
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

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skills`);

  const skill_list = await res.json();

  const paths = skill_list.map((skill: { kind: number }) => ({
    params: { id: skill.kind.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/skills/${params.id}`
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

  const skill_type = `${params.id}`;

  return {
    props: {
      errorCode,
      skill_type,
      skills: json,
    },
  };
}

export default Skills;
