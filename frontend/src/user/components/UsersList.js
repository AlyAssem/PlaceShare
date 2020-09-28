import React, { useState } from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const UsersList = (props) => {
  const [search, setSearch] = useState('');

  if (props.items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  const usersWithPlaces = props.items.filter((user) => {
    return user.places.length !== 0;
  });

  const filteredUsers = usersWithPlaces.filter((user) => {
    return (
      user.places[0].title
        .toLowerCase()
        .replace(/\s/g, '')
        .indexOf(search.toLowerCase().replace(/\s/g, '')) !== -1
    );
  });

  const updateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  return (
    <React.Fragment>
      <div className='center'>
        <input
          className='search'
          type='text'
          value={search}
          onChange={updateSearch}
          placeholder='Search for a place'
        />
      </div>
      <ul className='users-list'>
        {filteredUsers.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places.length}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default UsersList;
