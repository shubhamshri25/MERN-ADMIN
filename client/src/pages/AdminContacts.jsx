import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import axios from "axios";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  // getting all users
  const getContactsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/contacts`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const res_data = response.data;
      console.log("contact data: ", res_data);

      if (response.status >= 200 && response.status < 300) {
        setContactData(res_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // deleting contact by id
  const deleteContactById = async (id) => {
    try {
      const response = await axios.delete(
        `  http://localhost:3000/api/admin/contacts/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const res_data = response.data;
      console.log(`Users after deletion ${res_data}`);

      if (response.status >= 200 && response.status < 300) {
        getContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data </h1>

        <div className="container admin-users">
          {contactData.map((currContactData, index) => {
            const { username, email, message, _id } = currContactData;

            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AdminContacts;
