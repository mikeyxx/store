import { IoLogoTwitter } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black text-white h-52 flex w-full justify-between">
      <div className="pt-12 pl-10">
        <span className="logo font-black text-3xl">Mikey's</span>
      </div>
      <div className="pt-16 pr-10">
        <h4 className="text-4xl font-bold logo">Socials</h4>
        <div className="flex">
          <a href="https://twitter.com/topboy_mikey">
            <IoLogoTwitter className="text-[2rem] cursor-pointer mr-2" />
          </a>
          <a href="https://github.com/mikeyxx" target="_blank">
            {" "}
            <BsGithub className="text-[2rem] cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
