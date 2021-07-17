import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  const items = useSelector(selectItems);

  return (
    <header>
      {/* Main Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* Logo */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 mx-4 whitespace-nowrap">
          <Image
            onClick={() => router.push("/")}
            src="/digiportLogo.png"
            width={150}
            height={40}
            className="cursor-pointer digiportlogo"
          />
        </div>

        {/* Search box */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right side */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm  ">Account & List</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm  "> & Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center font-bold text-black ">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm  mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime </p>
        <p className="link">Dress collections</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex ">Electronics</p>
        <p className="link hidden lg:inline-flex ">Food & Grocery</p>
        <p className="link hidden lg:inline-flex ">Prime</p>
        <p className="link hidden lg:inline-flex ">Buy Again</p>
        <p className="link hidden lg:inline-flex ">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex ">Health & Personal care</p>
      </div>
    </header>
  );
}

export default Header;
