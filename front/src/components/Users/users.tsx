"use client";

import { useEffect, useState } from "react";

import IUsers from "@/interfaces/IUsers";
//AQUI HAY QUE COLOCAR EL USUARIO LOGUEADO"
const actualUser="ad7d27c5-0309-4ff8-a8ca-75bcfd4d0cfb"
const Users = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener los usuarios desde tu backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user?parentId=${actualUser}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Usuarios</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6 text-sm font-medium text-gray-700">Nombre</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">Email</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">DNI</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">Domicilio</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">Ciudad</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">País</th>
              <th className="py-3 px-6 text-sm font-medium text-gray-700">Accion</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-t border-gray-200`}
                >
                  <td className="py-3 px-6 text-sm text-gray-700">{user.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{user.dni}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {user.address || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">{user.city || "N/A"}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{user.country || "N/A"}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <a
                      href={`/candidate/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Postular Candidato
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
