import { useState } from 'react';
import { header, persons } from '../assets/assets';

const Header = () => {
  const [unReadNotifications, setUnreadNotifications] = useState([]);

  return (
    <div className="flex justify-between bg-white p-8 max-h-[116px] w-full">
      <div className="text-2xl font-semibold leading-[1.5] text-[#141522] flex items-center">
        Settings
      </div>
      <div className="flex gap-6">
        <div className="rounded-full w-[52px] h-[52px] flex justify-center items-center bg-[#F5F5F7]">
          <div className="relative" onClick={() => setUnreadNotifications([])}>
            <img src={header.notification} alt="" />
            {unReadNotifications.length > 0 && (
              <div className="absolute rounded-full bg-[#FF4D5E] top-0.5 right-0.5 h-2 w-2"></div>
            )}
          </div>
        </div>
        <div className="rounded-full w-[52px] h-[52px] flex justify-center items-center bg-[#F5F5F7]">
          <img
            src={persons.person1}
            alt=""
            className="rounded-full w-[52px] h-[52px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
