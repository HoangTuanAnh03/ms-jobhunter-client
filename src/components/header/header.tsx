import React from "react";
import Link from "next/link";
import Image from "next/image";

// const items :MenuProps['items'] = [
//   {
//     label: <Link href={"/"}>Việc làm IT</Link>,
//     key: "home",
//   },
//   {
//     label: <Link href={"/users"}>Top Công ty IT</Link>,
//     key: "users",
//   },
//   {
//     label: <Link href={"/books"}>Blog</Link>,
//     key: "books",
//   },
// ];

const items = [
  {
    label: <Link href={"/"}>Profile</Link>,
    key: "home",
  },
  {
    label: <Link href={"#"} 
    // onClick={()=>signOut()}
     >Logout</Link>,
    key: "users",
  },
  {
    label: <Link href={"/books"}>Blog</Link>,
    key: "books",
  },
];

function Header() {

  return (
    <header
    className="sticky top-0 h-16 py-0 px-4 z-50 w-full flex items-center justify-center bg-custom-gradient">
      <div className="max-w-[1860px] w-full h-full flex items-center justify-between">
        <div>
          <Image src={"/logo.png"} width={90} height={40} alt="Logo" />
        </div>
        <div>
          {/* {session ? ( */}
            <>
              {/* <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    verticalAlign: "middle",
                  }}
                  size="large"
                >
                  TA
                </Avatar>
              </Dropdown> */}
            </>
          {/* ) : (
            <>
              {" "}
              <Link href={"/auth/signin"} >Login</Link>
            </>
          )} */}
        </div>
      </div>
    </header>
  );
}
export default Header;
