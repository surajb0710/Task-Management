import SearchIcon from '@mui/icons-material/Search';
import Message from '../components/cards/Message';
import MessageInbox from '../components/layout/MessageInbox';

const Messages = () => {
  return (
    <div className="flex bg-white ml-[254px]">
      <div className="p-6">
        <div className="flex px-7 py-[14px] w-[352px] mb-8 sticky">
          <input
            type="text"
            placeholder="Search Task"
            className="grow outline-none"
          />
          <SearchIcon style={{ color: '#8E92BC' }} />
        </div>
        <div className="flex flex-col gap-4">
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
          <Message />
          <hr className="text-[#F5F5F7] mx-5" />
        </div>
      </div>
      <div className="grow">
        <MessageInbox />
      </div>
    </div>
  );
};

export default Messages;
