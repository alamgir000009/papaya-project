"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Card from "@/Components/Card/Card";
import axiosInstance from "@/utils/axiosInstance";
import withAuth from "@/utils/withAuth";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const getData = () => {
    axiosInstance
      .get("api/contact/getAll")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <div>
        <Card>
          <Card.Title>
            User Contact
            <p className="text-sm">List of users which contact us.</p>
          </Card.Title>
          <Card.Body>
            {" "}
            {loading ? (
              <div className="text-center py-10 text-xl font-bold">
                Loading...
              </div>
            ) : (
              <div className={`max-h-dvh table-container overflow-y-auto`}>
                <table className={`custom-table`}>
                  <thead>
                    <tr>
                      <th>Sr#.</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>
                            {" "}
                            <a
                              href={`mailto:${user.email}`}
                              className="underline text-primary"
                            >
                              {user.email}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`tel:${user.contact}`}
                              className="underline text-primary"
                            >
                              {user.contact}
                            </a>
                          </td>
                          <td>{user.details}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {userData.length == 0 && (
                  <div
                    className={`flex items-center justify-center w-full  py-10`}
                  >
                    No results found
                  </div>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default withAuth(page);
