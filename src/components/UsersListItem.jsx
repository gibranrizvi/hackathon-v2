import { UserCircleIcon } from "@heroicons/react/24/outline";
import useUsers from "../hooks/useUsers";

import { groups, roles } from "../static";

const UsersListItem = ({ userDoc }) => {
  const { submitting, updateUser } = useUsers();

  const { user } = userDoc;

  const handleAddOrRemoveRole = async selectedRole => {
    const roleExists = user.roles.includes(selectedRole);

    let updatedRoles;

    // if roleExists, remove selectedRole from user.roles
    if (roleExists) {
      updatedRoles = user.roles.filter(role => role !== selectedRole);
    }
    // else, add selectedRole to user.roles
    else {
      updatedRoles = [...user.roles, selectedRole];
    }

    const updatedUserDoc = {
      ...userDoc,
      user: {
        ...userDoc.user,
        roles: updatedRoles,
      },
    };

    await updateUser(updatedUserDoc);
  };

  const handleAddOrRemoveGroup = async selectedGroup => {
    const groupExists = user.groups.includes(selectedGroup);

    let updatedGroups;

    // if groupExists, remove selectedGroup from user.roles
    if (groupExists) {
      updatedGroups = user.groups.filter(group => group !== selectedGroup);
    }
    // else, add selectedGroup to user.groups
    else {
      updatedGroups = [...user.groups, selectedGroup];
    }

    const updatedUserDoc = {
      ...userDoc,
      user: {
        ...userDoc.user,
        groups: updatedGroups,
      },
    };

    await updateUser(updatedUserDoc);
  };

  return (
    <div className="card bg-slate-50 shadow-xl rounded-md p-1 flex flex-col space-y-0 md:space-y-0 md:flex-row items-start justify-between md:space-x-2 border-2 border-slate-500">
      <div className="flex space-x-2">
        <label
          tabIndex={0}
          className="btn btn-sm btn-ghost btn-circle avatar"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          ) : (
            <UserCircleIcon className="icon-btn" />
          )}
        </label>

        <div className="flex flex-col -space-y-1 w-56 justify-center">
          <small className="font-semibold">{user.name}</small>
          <small className="italic">{user.email}</small>
        </div>
      </div>

      <div className="flex flex-row space-x-1">
        <div className="flex card border bg-white p-1 text-sm">
          Roles
          {roles.map(role => {
            let flag = false;

            if (user.roles.includes(role.name)) flag = true;

            return (
              <button
                key={role.id}
                className={`my-0.5 badge badge-lg ${
                  !flag ? "badge-outline" : "bg-slate-800 text-white"
                } cursor-pointer min-w-fit h-fit text-xs font-bold shadow-md px-1`}
                onClick={() => handleAddOrRemoveRole(role.name)}
                disabled={submitting}
              >
                {role.name}
              </button>
            );
          })}
        </div>

        <div className="flex card border bg-white p-1 text-sm w-72">
          Groups
          <div className="flex flex-col h-44 flex-wrap">
            {groups.map(group => {
              let flag = false;

              if (user.groups.includes(group.name)) flag = true;

              return (
                <button
                  key={group.id}
                  className={`my-0.5 mr-1 badge badge-lg ${
                    !flag ? "badge-outline" : "bg-slate-800 text-white"
                  } cursor-pointer min-w-fit h-fit text-xs font-bold shadow-md px-1`}
                  onClick={() => handleAddOrRemoveGroup(group.name)}
                  disabled={submitting}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
