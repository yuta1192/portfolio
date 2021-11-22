import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const navigation = [
  { name: "プロフィール", href: "/profiles" },
  { name: "アプリ", href: "/apps" },
  { name: "Qiita", href: "/qiitas" },
  { name: "スキル", href: "/skills" },
  { name: "経歴", href: "/careers" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Layout({ children, title = "My Portfolio" }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex-grow">
        <header>
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                          <a>
                            <img
                              className="block lg:hidden h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                              alt="Workflow"
                            />
                          </a>
                        </Link>
                        <Link href="/">
                          <a>
                            <img
                              className="hidden lg:block h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                              alt="Workflow"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === router.pathname
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={
                                item.href === router.pathname
                                  ? "page"
                                  : undefined
                              }
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <a
                        className="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
                        href="/"
                      >
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.href === router.pathname
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={
                          item.href === router.pathname ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </header>

        {children}

        <footer className="footer bg-white relative pt-1 border-b-2 border-blue-700">
          <div className="container mx-auto px-6">
            <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
              <div className="sm:w-2/3 text-center py-6">
                <p className="text-sm text-blue-700 font-bold mb-2">
                  © 2020 by Pavlove BIOKOU
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Layout;