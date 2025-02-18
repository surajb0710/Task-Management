import { persons } from '../../assets/assets.js';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const MessageInbox = () => {
  return (
    <div className="">
      <div className="flex pl-12 pr-8 py-6 justify-between">
        <div className="flex gap-3">
          <img
            src={persons.person1}
            alt=""
            className="w-13 h-13 rounded-full"
          />
          <div className="flex flex-col gap-2 grow">
            <p className="text-sm font-semibold text-[#141522]">
              Angelie Crison
            </p>
            <div className="flex gap-3 items-center">
              <div className="rounded-full bg-[#25C78B] w-2 h-2"></div>
              <p className="text-sm text-[#141522]">Online</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-13 h-13 flex justify-center items-center">
            <VideocamOutlinedIcon style={{ color: '#8E92BC' }} />
          </div>
          <div className="w-13 h-13 flex justify-center items-center">
            <PhoneOutlinedIcon style={{ color: '#8E92BC' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
