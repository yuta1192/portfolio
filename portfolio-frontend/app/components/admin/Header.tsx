import React from "react";
import { signOut } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "プロフィール", href: "/admin/profiles", icon: faUserCircle },
  { name: "アプリ", href: "/admin/apps", icon: faMobileAlt },
  { name: "Qiita", href: "/admin/qiitas", icon: faSearch },
  { name: "スキル", href: "/admin/skills", icon: faPencilAlt },
  { name: "経歴", href: "/admin/careers", icon: faBriefcase },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function AdminHeader() {
  const router = useRouter();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div
          className="
              flex flex-col flex-grow
              pt-5
              overflow-y-auto
              bg-indigo-700
              border-r
            "
        >
          <div className="flex flex-col flex-grow px-4 mt-5">
            <nav className="flex-1 space-y-1 bg-indigo-700">
              <p className="px-4 pt-4 font-medium text-white uppercase">
                <Link href="/admin/top">Portfolio</Link>
              </p>
              <ul>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className={classNames(
                          item.href === router.pathname
                            ? "bg-indigo-600"
                            : "border-indigo-800 hover:border-indigo-800 hover:bg-indigo-600",
                          "inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline"
                        )}
                        aria-current={
                          item.href === router.pathname ? "page" : undefined
                        }
                      >
                        <FontAwesomeIcon icon={item.icon} />
                        <div className="w-4 h-4"></div>
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 px-4 bg-indigo-600">
            <a href="#" className="flex-shrink-0 block w-full group">
              <div className="flex items-center">
                <div></div>
                <div className="ml-3">
                  <button onClick={() => signOut()}>ログアウト</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
