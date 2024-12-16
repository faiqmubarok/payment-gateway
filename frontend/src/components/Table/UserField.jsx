import propTypes from "prop-types";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const UserField = ({
  user,
  number,
  setIsModalOpen,
  setFormUser,
  setTypeAction,
}) => {
  const handleButtonEdit = (user) => {
    setIsModalOpen(true);
    setFormUser({
      userId: user._id,
      name: user.name,
      email: user.email,
      noHp: user.noHp,
      role: user.role,
    });
    setTypeAction("edit");
  };

  const handleButtonDelete = (user) => {
    setIsModalOpen(true);
    setFormUser({
      userId: user._id,
      email: user.email,
    });
    setTypeAction("delete");
  };

  return (
    <>
      <tr className="bg-white border-b border-gray-100">
        <td className="px-6 py-4 max-w-[50px]">{number}</td>
        <td className="px-6 py-4 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap uppercase">
          {user._id}
        </td>
        <td className="px-6 py-4 text-nowrap">{user.name}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.noHp}</td>
        <td className="px-6 py-4 capitalize">{user.role}</td>
        <td className="px-6 py-4 flex items-center justify-end gap-2">
          <button
            onClick={() => handleButtonEdit(user)}
            type="button"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-2 rounded"
          >
            <MdOutlineEdit />
          </button>

          <button
            type="button"
            onClick={() => handleButtonDelete(user)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded"
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

UserField.propTypes = {
  user: propTypes.object,
  number: propTypes.number,
  setIsModalOpen: propTypes.func,
  setFormUser: propTypes.func,
  setTypeAction: propTypes.func,
};

export default UserField;