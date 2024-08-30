import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  // getting all users
  const getAllUsersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/users/",
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const res_data = response.data;
      console.log(`Users ${res_data}`);
      setUsers(res_data);
    } catch (error) {
      console.log(error);
    }
  };

  // deeleting the user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const res_data = response.data;
      console.log(`Users after deletion ${res_data}`);

      if (response.status >= 200 && response.status < 300) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getAllUsersData, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data </h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currUser, index) => {
                return (
                  <tr key={index}>
                    <td>{currUser.username}</td>
                    <td>{currUser.email}</td>
                    <td>{currUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteUser(currUser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
