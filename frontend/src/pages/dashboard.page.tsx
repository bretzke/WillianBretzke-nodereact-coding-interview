import React, { FC, useState, useEffect } from "react";

import { RouteComponentProps } from "@reach/router";
import { IUserProps } from "../dtos/user.dto";
import { UserCard } from "../components/users/user-card";
import { CircularProgress, Input } from "@mui/material";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await backendClient.getAllUsers(search)
      setUsers(result.data)
      setLoading(false)
    }

    if (search.length) {
      setLoading(true)
      fetchData()
    }
  }, [search])

  useEffect(() => {
    const fetchData = async () => {
      const result = await backendClient.getAllUsers();
      setUsers(result.data);
      setLoading(false)
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: "30px" }}>
      <Input onChange={(e) => setSearch(e.target.value)} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <div>
            {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
          </div>
        )}
      </div>
    </div>
  );
};
