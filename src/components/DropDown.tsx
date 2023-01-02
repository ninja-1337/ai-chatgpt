import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
function MyDropdown() {
  return (
    <div className="text-center ">
      <Menu as="div" className="relative inline-block text-center">
        <Menu.Button className="inline-flex  w-32   justify-center rounded-md bg-stone-800 bg-opacity-20   text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div>About</div>
        </Menu.Button>

        <Menu.Items className="mt- absolute right-0 w-32 origin-center justify-center divide-gray-100  rounded-md bg-white align-middle shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link href="/about">Tech School</Link>
          </Menu.Item>
          <div>
            <Menu.Item>
              <Link href="/faq">FAQ</Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default MyDropdown;
