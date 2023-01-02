import React from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { signIn, signOut, useSession } from "next-auth/react";

import MyDropdown from "../components/DropDown";

function Loginwith() {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <div className="pt-6 text-1xl text-blue-500 flex justify-center items-center">
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
              <button onClick={() => signOut()}>-Logout</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div>
            <button onClick={() => signIn("discord")}>
              <SocialIcon network="discord" style={{ height: 25, width: 25 }} />
            </button>

            <button onClick={() => signIn("google")}>
              <SocialIcon network="google" style={{ height: 25, width: 25 }} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default Loginwith;
