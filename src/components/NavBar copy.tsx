// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import MyDropdown from "./DropDown";
import Loginwith from "./Login";
import DropDownLogin from "./DropDownLogin";
import souvla from "/images/xsushi-sign.png";
import Link from "next/link";
import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { useState, useRef } from "react";
function NavBar() {
  const { data: session, status } = useSession();
  const navbarToggleRef = useRef();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const HandleSideMenu = () => {
    isSideMenuOpen && navbarToggleRef.current.click();
  };
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Settings",
    "About",
    "Help & Feedback",
  ];
  return (
    <Navbar className="from-[#0b3bd6] to-[#f8a221]">
      <Navbar.Toggle
        ref={navbarToggleRef}
        onChange={(isSelected: boolean) => setIsSideMenuOpen(isSelected)}
        showIn="xs"
      />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Link href="/">
          <Text b color="inherit" hideIn="xs">
            Verbal Agent
          </Text>
        </Link>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="warning"
        hideIn="xs"
        variant="highlight"
      >
        <Link color="secondary" href="ai">
          App
        </Link>
        <Spacer />
        <Link href="/contact">Contact Us</Link>
        <Spacer />
        <Link href="/guestbook">Reviews</Link>
        <Spacer />
        <Link href="/about">About</Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <>
              {session?.user?.image && (
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    size="lg"
                    as="button"
                    color="secondary"
                    src={session?.user.image}
                  />
                </Dropdown.Trigger>
              )}
              {!session?.user?.image && (
                <Dropdown.Button>
                  <p className="text-l">Login</p>
                </Dropdown.Button>
              )}
            </>
          </Navbar.Item>

          {session?.user?.image && (
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {session.user.name}
                </Text>
              </Dropdown.Item>

              <Dropdown.Item key="team_settings">
                <Link href="/profile">Profile</Link>
              </Dropdown.Item>
              {/* <Dropdown.Item key="system">
                {" "}
                <Link href="/extprofile">External Profile</Link>
              </Dropdown.Item> */}

              <Dropdown.Item key="settings" withDivider>
                <Link href="/settings">My Settings</Link>
              </Dropdown.Item>

              <Dropdown.Item key="analytics" withDivider>
                <Link href="/chats">Saved Chats</Link>
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error">
                <div>
                  {session?.user?.image && (
                    <button onClick={() => signOut()}>Logout</button>
                  )}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
          {!session?.user?.image && (
            <Dropdown.Menu aria-label="User menu actions" color="warning">
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <button onClick={() => signIn("google")}>
                  <Text className="p-1" b color="inherit">
                    Login with Google
                  </Text>
                  <SocialIcon
                    network="google"
                    style={{ height: 25, width: 25 }}
                  />
                </button>
              </Dropdown.Item>
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <button onClick={() => signIn("discord")}>
                  <Text className="p-1" b>
                    Login with Discord
                  </Text>
                  <SocialIcon
                    network="discord"
                    style={{ height: 25, width: 25 }}
                  />
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse disableAnimation>
        <Navbar.CollapseItem key="About" activeColor="warning">
          <Link color="inherit" href="/ai" onClick={() => HandleSideMenu()}>
            App
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key="About" activeColor="warning">
          <Link
            color="inherit"
            href="/contact"
            onClick={() => HandleSideMenu()}
          >
            Contact Us
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key="Projects" activeColor="warning">
          <Link color="inherit" href="/chats" onClick={() => HandleSideMenu()}>
            Saved Chats
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key="About" activeColor="warning">
          <Link color="inherit" href="/about" onClick={() => HandleSideMenu()}>
            About
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key="About" activeColor="warning">
          <Link
            color="inherit"
            href="/guestbook"
            onClick={() => HandleSideMenu()}
          >
            Reviews
          </Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
