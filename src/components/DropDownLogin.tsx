import { Menu, Transition } from "@headlessui/react";
import { SocialIcon } from "react-social-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
function DropDownLogin() {
  const { data: session, status } = useSession();

  return (
    <div className="text-center ">
      <Menu as="div" className="relative inline-block text-center">
        <Menu.Button className="inline-flex w-32 justify-center rounded-md bg-stone-800 bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {session?.user?.image && (
            <div className="flex items-center ">
              <Image
                src={session?.user.image}
                alt=""
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
              />
              {session.user.name}
            </div>
          )}
          {!session?.user?.image && <>Login</>}
        </Menu.Button>

        <Menu.Items className="mt- absolute right-0 w-32 origin-center justify-center divide-gray-100  rounded-md bg-white align-middle shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <>
                {session ? (
                  <div>
                    {session?.user?.image && (
                      <button onClick={() => signOut()}>Logout</button>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className={`${
                        active &&
                        "justify-center rounded bg-amber-200 align-middle"
                      }`}
                    >
                      <Menu.Item>
                        <button onClick={() => signIn("discord")}>
                          <SocialIcon
                            network="discord"
                            style={{ height: 25, width: 25 }}
                          />
                        </button>
                      </Menu.Item>
                    </div>

                    <div
                      className={`${
                        active &&
                        "justify-center rounded bg-amber-200 align-middle"
                      }`}
                    >
                      <Menu.Item>
                        <button onClick={() => signIn("google")}>
                          <SocialIcon
                            network="google"
                            style={{ height: 25, width: 25 }}
                          />
                        </button>
                      </Menu.Item>
                    </div>
                  </>
                )}
              </>
            )}
          </Menu.Item>
          {session?.user?.image && (
            <Menu.Item>
              <button>My Profile</button>
            </Menu.Item>
          )}

          {session?.user?.image && (
            <Menu.Item>
              <button>Settings</button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default DropDownLogin;
