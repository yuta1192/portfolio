import React, { FC } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Error from "next/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import {
  faBirthdayCake,
  faBriefcase,
  faBuilding,
  faGlobe,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

type Profile = {
  id: number;
  name: string;
  name_romaji: string;
  description: string;
  facebook_url: string;
  github_url: string;
  twitter_url: string;
  qiita_url: string;
  instagram_url: string;
  youtube_url: string;
  address: string;
  work: string;
  work_address: string;
  birthday: number;
  birthplace: string;
  big_image: string;
  small_image: string;
};

type Props = {
  profile: Profile;
};

const Profiles: FC<Props> = (props) => {
  return (
    <>
      <div
        className="max-w-4xl flex items-center h-auto lg:max-h-screen flex-wrap mx-auto my-24"
        key={props.profile.id}
      >
        {/*Main Col*/}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Image for mobile view*/}
            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
              <Image
                src={
                  !props.profile.small_image
                    ? "/profile_image.jpg"
                    : props.profile.small_image
                }
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                height={190}
                width={190}
                alt="profile_small_image"
              />
            </div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {props.profile.name}
            </h1>
            <h2>{props.profile.name_romaji}</h2>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faBriefcase} />
              </svg>{" "}
              {props.profile.work}
            </p>
            {/* 勤務地・現在地 */}
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faBuilding} />
              </svg>
              勤務地：{props.profile.work_address}
              <svg
                className="h-4 fill-current text-green-700 pr-4 ml-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </svg>
              現在地：{props.profile.address}
            </p>
            {/* 誕生日・出身地 */}
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faBirthdayCake} />
              </svg>
              誕生日：{props.profile.birthday}
              <svg
                className="h-4 fill-current text-green-700 pr-4 ml-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faHome} />
              </svg>
              出身地：{props.profile.birthplace}
            </p>
            {/* プロフィール */}
            <p className="pt-8 text-sm">{props.profile.description}</p>
            {/* facebook */}
            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
              <a
                className="link"
                href={
                  props.profile.facebook_url ? props.profile.facebook_url : "#"
                }
                data-tippy-content="@facebook_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Facebook</title>
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </svg>
              </a>
              {/* twitter */}
              <a
                className="link"
                href={
                  props.profile.twitter_url ? props.profile.twitter_url : "#"
                }
                data-tippy-content="@twitter_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter</title>
                  <FontAwesomeIcon icon={faTwitter} />
                </svg>
              </a>
              {/* github */}
              <a
                className="link"
                href={props.profile.github_url ? props.profile.github_url : "#"}
                data-tippy-content="@github_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <FontAwesomeIcon icon={faGithub} />
                </svg>
              </a>
              {/* qiita */}
              <a
                className="link"
                href={props.profile.qiita_url ? props.profile.qiita_url : "#"}
                data-tippy-content="@unsplash_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Qiita</title>
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon icon={faSearch} color={"white"} />
                </svg>
              </a>
              {/* instagram */}
              <a
                className="link"
                href={
                  props.profile.instagram_url
                    ? props.profile.instagram_url
                    : "#"
                }
                data-tippy-content="@instagram_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Instagram</title>
                  <FontAwesomeIcon icon={faInstagram} />
                </svg>
              </a>
              {/* youtube */}
              <a
                className="link"
                href={
                  props.profile.youtube_url ? props.profile.youtube_url : "#"
                }
                data-tippy-content="@youtube_handle"
              >
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>YouTube</title>
                  <FontAwesomeIcon icon={faYoutube} />
                </svg>
              </a>
            </div>
            {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
          </div>
        </div>
        {/*Img Col*/}
        <div className="w-full lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          <div className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block">
            <Image
              src={
                !props.profile.big_image
                  ? "/profile_image.jpg"
                  : props.profile.big_image
              }
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              height={960}
              width={640}
              alt="profile_big_image"
            />
          </div>
        </div>
        {/* Pin to top right corner */}
        <div className="absolute top-0 right-0 h-12 w-18 p-4">
          <button className="js-change-theme focus:outline-none">🌙</button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles`
  );
  const errorCode = response.ok ? false : response.status;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const json = await response.json();

  // jsonが存在しない場合
  if (!json) {
    return {
      props: {},
    };
  }

  return {
    props: {
      profile: json,
    },
  };
};

export default Profiles;
