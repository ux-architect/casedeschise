import Image from "next/image";
import Link from "next/link";
// import Logo from "../../icons/logo.png";

export default function Navbar() {
  return (
    <header className="w-full clear-both float-left">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link
                href="/map"
                className="hover:text-purple-400 duration-300"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-purple-400 duration-300"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}