import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/admin/Header";

export const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen overflow-hidden bg-white rounded-lg">
      <Header />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-lg text-neutral-600">profile</h1>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <div className="py-4">
                <div className="rounded-lg bg-gray-50 h-96"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
