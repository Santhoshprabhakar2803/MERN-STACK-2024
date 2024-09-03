// src/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserList } from '../redux/userSlice';

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2');
        const data = await response.json();
        dispatch(setUserList(data.data)); // Assuming the user data is in `data.data`
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return null; // or return a loading indicator if desired
};

export default UserList;
