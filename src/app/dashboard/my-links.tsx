import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { DashboardLinkComponent } from "@/lib/types/dashboard";

interface MyLinkProps {
  linksOfUser: DashboardLinkComponent[];
  deleteUrl: (urlID: string, isCustom: boolean) => void;
}

interface LinkComponentProps {
  link: DashboardLinkComponent;
  deleteUrl: (urlID: string, isCustom: boolean) => void;
}

export default function MyLinks(props: MyLinkProps) {
  return (
    <div className="px-4 md:px-36 py-8 w-full flex flex-col items-center md:items-start">
      <h1 className="text-4xl font-heading font-extrabold bg-gradient-to-b from-secondary to-secondary-dark bg-clip-text leading-relaxed text-transparent relative inline-block">
        <div className="-z-10 absolute top-0 left-0 w-full h-full bg-secondary blur-3xl opacity-50 transition-all"></div>
        My Links
      </h1>
      <div className="flex flex-col gap-4 my-4 w-full">
        {props.linksOfUser.map((link) => (
          <LinkComponent link={link} deleteUrl={props.deleteUrl} />
        ))}
      </div>
    </div>
  );
}

function LinkComponent(props: LinkComponentProps) {
  return (
    <div className="w-full h-20 py-2 pr-2 pl-4 border border-gray bg-[#0e0e0ea1] flex justify-between items-center rounded-lg">
      <div className="w-[calc(100%-7rem)]">
        <h3 className="text-lg overflow-ellipsis whitespace-nowrap overflow-hidden">
          {props.link.name}
        </h3>
        <div className="text-sm flex w-full text-white flex-col md:flex-row md:items-center md:gap-2">
          <p className="md:max-w-[40%] text-primary overflow-ellipsis whitespace-nowrap inline-block overflow-hidden">
            {`${props.link.hostName}/${props.link.shrinkURL}`}
          </p>
          <BsArrowRight color="gray" className="md:inline-block hidden" />
          <p className="md:w-1/2 text-gray overflow-ellipsis whitespace-nowrap inline-block overflow-hidden">
            {props.link.originalURL}
          </p>
        </div>
      </div>
      <div className="h-full min-w-[6rem] flex flex-col">
        <p className="h-1/2 w-full bg-[rgba(76,199,0,0.05)] border border-tertiary rounded-t-md text-tertiary flex items-center justify-center">
          {`Visits: ${props.link.visits}`}
        </p>
        <div className="w-full h-1/2 flex">
          <button className="bg-dark text-gray border border-gray rounded-bl-md h-full w-full flex justify-center items-center">
            <span className="hidden md:block">Edit</span>
            <HiOutlinePencilAlt className="md:hidden block" />
          </button>
          <button
            onClick={(_) =>
              props.deleteUrl(props.link.urlID, props.link.isCustom)
            }
            className="bg-error border border-gray rounded-br-md h-full w-full md:w-max md:min-w-[2rem] flex justify-center items-center"
          >
            <RiDeleteBin2Line />
          </button>
        </div>
      </div>
    </div>
  );
}
