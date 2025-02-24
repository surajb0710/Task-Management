import SearchIcon from '@mui/icons-material/Search';
import MessageInbox from '../components/layout/MessageInbox';
import Message_01 from '../components/cards/Message01';
import { useEffect, useState } from 'react';
import { getAllUsersExceptCurrent } from '../api/index';
import { getAuth } from 'firebase/auth';

const Messages = () => {
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsersExceptCurrent();
      setUsers(users);
      setReceiver(users[0]);
    };
    fetchAllUsers(userId);
  }, [userId]);

  console.log('---users----', users);

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
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setReceiver(user)}
              className="cursor-pointer"
            >
              <Message_01 user={user} />
            </div>
          ))}

          <hr className="text-[#F5F5F7] mx-5" />
        </div>
      </div>
      <div className="grow">
        <MessageInbox receiver={receiver} />
      </div>
    </div>
  );
};

export default Messages;
