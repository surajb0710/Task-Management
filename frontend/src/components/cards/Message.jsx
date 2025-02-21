import { persons } from '../../assets/assets.js';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useState } from 'react';

const Message = () => {
  const [messageReceivedByReceiver, setMessageReceivedByReceiver] =
    useState(false);
  const [messageReadByReceiver, setMessageReadByReceiver] = useState(false);
  const [unReadMessage, setUnReadMessage] = useState(true);

  return (
    <>
      <div className="flex gap-3 px-5 py-2.5 bg-[#FAFAFA] rounded-[10px]">
        <img src={persons.person1} alt="" className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2 grow">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-[#141522]">
              Angelie Crison
            </p>
            <p className="text-sm text-[#8E92BC]">1 m Ago</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#141522]">
              Thank you very much. I’m glad ...
            </p>
            {unReadMessage && (
              <div className="rounded-full bg-[#DB5962] w-2 h-2"></div>
            )}
            {messageReceivedByReceiver && <DoneOutlinedIcon />}
            {messageReadByReceiver && <DoneAllOutlinedIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
