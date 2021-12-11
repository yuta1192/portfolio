import { useSession } from "next-auth/react";

function Footer() {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <footer className="fixed inset-x-0 sticky bottom-0 mt-auto">
          <div className="footer bg-white relative pt-3 border-b-2 border-blue-700">
            <div className="container mx-auto px-6">
              <div className="mt-10 border-t-2 border-gray-300 flex flex-col items-center">
                <div className="sm:w-2/3 text-center py-6">
                  <p className="text-sm text-blue-700 font-bold mb-2">
                    © 2021 by KITHUNE_KONNO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
