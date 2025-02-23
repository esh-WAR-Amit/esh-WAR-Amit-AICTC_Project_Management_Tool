import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  ChevronDown,
  NotificationsOutline,
  PersonCircle,
  SearchOutline,
  SettingsOutline,
  ShareSocialOutline,
} from "react-ionicons";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-4 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-white shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="#fb923c" width={"28px"} height={"28px"} />
        <span className="text-orange-500 font-semibold md:text-lg text-sm whitespace-nowrap">
          Board Name
        </span>
        <ChevronDown color="#fb923c" width={"16px"} height={"16px"} />
      </div>

      {/* Search Bar */}
      <div className="relative md:w-[500px] w-[180px] bg-white border border-gray-300 shadow-sm rounded-full px-4 py-[8px] flex items-center gap-2 backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-400 hover:shadow-lg">
        <SearchOutline color={"#777"} width="20px" height="20px" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder=""
          className="w-full bg-transparent outline-none text-[15px] text-gray-700"
        />
        {!searchText && (
          <span className="absolute left-[40px] text-gray-400 text-[14px] pointer-events-none">
            <TypeAnimation
              sequence={["Search tasks", 1000, "Search projects", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        )}
      </div>

      {/* Right Section Icons */}
      <div className="md:flex hidden items-center gap-4">
        {[
          { Icon: ShareSocialOutline, tooltip: "Share" },
          { Icon: SettingsOutline, tooltip: "Settings" },
          { Icon: NotificationsOutline, tooltip: "Notifications" },
        ].map(({ Icon, tooltip }, index) => (
          <div
            key={index}
            className="relative group grid place-items-center bg-gray-100 hover:bg-gray-200 transition rounded-full p-2 cursor-pointer"
          >
            <Icon color={"#444"} />
            <span className="absolute bottom-[-30px] scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
              {tooltip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
