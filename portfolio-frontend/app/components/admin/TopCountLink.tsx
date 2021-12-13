import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

function TopCountLink(item: any) {
  return (
    <>
      {item.item.name === "profile" && (
        <Link href="/admin/profiles" passHref>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <FontAwesomeIcon icon={faUserCircle} size="4x" />
            <div className="pb-3"></div>
            <h2 className="title-font font-medium text-3xl text-gray-900">
              {item.item.count}件
            </h2>
            <p className="leading-relaxed">{item.item.name}</p>
          </div>
        </Link>
      )}
      {item.item.name === "app" && (
        <Link href="/admin/profiles" passHref>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <FontAwesomeIcon icon={faMobileAlt} size="4x" />
            <div className="pb-3"></div>
            <h2 className="title-font font-medium text-3xl text-gray-900">
              {item.item.count}件
            </h2>
            <p className="leading-relaxed">{item.item.name}</p>
          </div>
        </Link>
      )}
      {item.item.name === "qiita" && (
        <Link href="/admin/profiles" passHref>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <FontAwesomeIcon icon={faSearch} size="4x" />
            <div className="pb-3"></div>
            <h2 className="title-font font-medium text-3xl text-gray-900">
              {item.item.count}件
            </h2>
            <p className="leading-relaxed">{item.item.name}</p>
          </div>
        </Link>
      )}
      {item.item.name === "skill" && (
        <Link href="/admin/profiles" passHref>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <FontAwesomeIcon icon={faPencilAlt} size="4x" />
            <div className="pb-3"></div>
            <h2 className="title-font font-medium text-3xl text-gray-900">
              {item.item.count}件
            </h2>
            <p className="leading-relaxed">{item.item.name}</p>
          </div>
        </Link>
      )}
      {item.item.name === "career" && (
        <Link href="/admin/profiles" passHref>
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <FontAwesomeIcon icon={faBriefcase} size="4x" />
            <div className="pb-3"></div>
            <h2 className="title-font font-medium text-3xl text-gray-900">
              {item.item.count}件
            </h2>
            <p className="leading-relaxed">{item.item.name}</p>
          </div>
        </Link>
      )}
    </>
  );
}

export default TopCountLink;
