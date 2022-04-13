import React from 'react';

import UserItem from './UserItem';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    < >
      {props.users.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          lastName={user.lastName}
          userName={user.userName}
          name={user.name}
          vacationCount={user.vacations.length}
          inCartCount={user.cart.length}
          email={user.email}
          vacations={user.email}
          cart={user.cart}
        />
      ))}
    </>
  );
};

export default UsersList;
