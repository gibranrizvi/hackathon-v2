import UsersListItem from "./UsersListItem";

const UsersList = ({ users }) => {
  return users.map(userDoc => (
    <UsersListItem key={userDoc._id} userDoc={userDoc} />
  ));
};

export default UsersList;
