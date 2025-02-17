import { persons } from '../../assets/assets';

const LikedBy = () => {
  return (
    <div className="flex gap-1 border border-[#D1D1D1] ">
      <img src={persons.person1} alt="" className="h-6 w-6 rounded-full" />
      {persons.person2 && (
        <img
          src={persons.person2}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person3 && (
        <img
          src={persons.person3}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person4 && (
        <img
          src={persons.person4}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person5 && (
        <img
          src={persons.person5}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
    </div>
  );
};

export default LikedBy;
