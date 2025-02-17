import { header, persons } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex justify-between bg-white p-8 max-h-[116px]">
      <div className="text-2xl font-semibold leading-[1.5] text-[#141522] flex items-center">
        Settings
      </div>
      <div className="flex gap-6">
        <div className="rounded-full w-[52px] h-[52px] flex justify-center items-center bg-[#F5F5F7]">
          <img src={header.notification} alt="" />
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
