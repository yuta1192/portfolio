import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "プロフィール", href: "/profiles", icon: faUserCircle },
  { name: "アプリ", href: "/apps", icon: faMobileAlt },
  { name: "Qiita", href: "/qiitas", icon: faSearch },
  { name: "スキル", href: "/skills", icon: faPencilAlt },
  { name: "経歴", href: "/careers", icon: faBriefcase },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function AdminHeader() {
  const { data: session } = useSession();
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
                Portfolio
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
                <div>
                  {/* <img className="inline-block rounded-full h-9 w-9" src="https://d33wubrfki0l68.cloudfront.net/c5b13c40dad2f6fe28f2f7f016c9d027f2a39306/afe15/images/wickedlabslogo.jpg" alt=""> */}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">ログアウト</p>
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
