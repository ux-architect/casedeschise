export default function Footer() {
  return (
    <footer className="float-left w-full">
      <div className="">
        <small className=" duration-200 font-mono">
          All rights reserved &copy; {new Date().getFullYear()}
        </small>

        <small className="hover:text-white duration-200">
          <a
            href="https://github.com/Evavic44/sanity-nextjs-site"
            target="_blank"
            rel="noreferrer noopener"
          >
            Prepared by <span className="text-green-400">Raz</span>
          </a>
        </small>
      </div>
    </footer>
  );
}