import BreadCrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Pagination from "../components/Pagination/Pagination";
import DefaultTable from "../components/Table/DefaultTable";
import { useState, useEffect } from "react";
import UserField from "../components/Table/UserField";
import { IoMdAdd } from "react-icons/io";
import Search from "../components/Form/Search";
import { fetchUsers, updateUser, deleteUser, createUser } from "../api/userApi";
import Modal from "../components/Modal/Modal";
import FormRegister from "../components/Form/FormRegister";
import { Label, Select, Button } from "flowbite-react";
import { useAlert } from "../context/AlertContext";
import { MdDelete } from "react-icons/md";
import useDebounce from "../hooks/useDebounce";

const INITIAL_FORM = {
  userId: "",
  name: "",
  email: "",
  noHp: "",
  password: "",
  confirmPassword: "",
  role: "user",
};

const Users = () => {
  const [formUser, setFormUser] = useState(INITIAL_FORM);
  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const { showAlert } = useAlert();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleButtonCreate = () => {
    setIsModalOpen(true);
    setFormUser(INITIAL_FORM);
    setTypeAction("create");
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers({ page, searchQuery: debouncedQuery });
      setUsers(data?.users);
      setTotalPages(data?.totalPages);
      setTotalUser(data?.totalUsers);
    } catch (error) {
      showAlert("error", error.message || "Failed to load user data");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    const actions = {
      create: async () => createUser(formUser),
      edit: async () =>
        updateUser(formUser.userId, {
          name: formUser.name,
          email: formUser.email,
          noHp: formUser.noHp,
          role: formUser.role,
        }),
      delete: async () => deleteUser(formUser.userId),
    };

    try {
      const response = await actions[typeAction]();
      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === "success"
      ) {
        showAlert(
          "success",
          response.data.message || response.data.data.message || "Success"
        );
        setFormUser(INITIAL_FORM);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", err.response?.data?.message || "An error occurred");
    } finally {
      getUsers();
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedQuery]);

  return (
    <>
      <BreadCrumbs pageName={"Users"} />
      <div className="bg-white shadow-md rounded-sm border border-gray-100 flex flex-col gap-6 p-4 text-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Search */}
          <div className="flex items-center gap-4 flex-col md:flex-row w-full max-w-[500px]">
            <Search
              value={searchQuery}
              setValue={setSearchQuery}
              placeholder="Search by Name, Email, or Phone number"
            />
          </div>
          <button
            type="button"
            onClick={handleButtonCreate}
            className="px-4 py-2.5 bg-primary text-white rounded-md shadow hover:bg-primary/80 transition duration-300 font-medium flex items-center gap-2 justify-center w-full md:w-auto"
          >
            <IoMdAdd className="w-5 h-5" />
            Add User
          </button>
        </div>
        <hr className="border-gray-200" />
        {debouncedQuery !== "" && (
          <p className="text-sm text-gray-700">
            Showing users with the keyword &quot;{debouncedQuery}&quot;
          </p>
        )}

        {/* Table */}
        <DefaultTable
          columns={[
            "No",
            "User ID",
            "Name",
            "Email",
            "Phone",
            "Role",
            "Action",
          ]}
          loading={loading}
        >
          {users.map((user, index) => (
            <UserField
              key={index}
              number={(page - 1) * 10 + (index + 1)}
              user={user}
              setIsModalOpen={setIsModalOpen}
              setFormUser={setFormUser}
              setTypeAction={setTypeAction}
            />
          ))}
        </DefaultTable>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-1.5">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          <p className="p-2 text-gray-500">{totalUser} users found</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {typeAction !== "delete" && (
            <Modal.Header
              title={typeAction === "create" ? "Create User" : "Edit User"}
              onClose={() => setIsModalOpen(false)}
            />
          )}
          <form onSubmit={handleAction} className="px-8 py-6" action="">
            {typeAction === "create" || typeAction === "edit" ? (
              <>
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 min-w-[320px] lg:min-w-[700px] lg:gap-6 mb-8">
                  <FormRegister
                    formData={formUser}
                    handleChange={handleChange}
                  />
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="role" value="Role:" />
                    </div>
                    <Select
                      id="role"
                      required
                      value={formUser.role}
                      onChange={(e) =>
                        setFormUser({ ...formUser, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Select>
                  </div>
                  {typeAction === "create" && (
                    <>
                      <FormRegister.Password
                        id={"password"}
                        name="password"
                        labelValue="Password:"
                        value={formUser.password}
                        onChange={handleChange}
                      />
                      <FormRegister.Password
                        id={"confirmPassword"}
                        name="confirmPassword"
                        labelValue="Confirm Password:"
                        value={formUser.confirmPassword}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90 outline-none focus:ring-0"
                  size="md"
                  fullSized
                  type="submit"
                >
                  {typeAction === "edit" ? "Save" : "Create"}
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center p-4">
                  <MdDelete className="w-16 h-16 text-gray-400" />
                </div>
                <div className="text-gray-600 text-center mb-4">
                  <p className="text-base text-medium mb-2">{formUser.email}</p>
                  <p className="text-sm text-medium text-black">
                    Are you sure you want to delete this user?
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-col md:flex-row">
                  <Button
                    className="border rounded-lg border-primary text-primary hover:bg-primary hover:text-white outline-none focus:ring-0 order-2 md:order-2"
                    size="md"
                    fullSized
                    onClick={() => setIsModalOpen(false)}
                  >
                    No, cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 outline-none focus:ring-0 order-1 md:order-2"
                    size="md"
                    fullSized
                    type="submit"
                  >
                    Yes, I&apos;m sure
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default Users;
