"use client";

import { useEffect, useState } from "react";
import IUsers from "@/interfaces/IUsers";
import { useAuth } from "@/context/Authontext";
import Spinner from "../ui/Spinner";
import IUser from "@/interfaces/IUser";
import IGroup from "@/interfaces/IGroup";
import Swal from "sweetalert2";
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {

  const {userData} = useAuth()
  const [users, setUsers] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (!userData?.userData.id) {
        setLoading(false); // Termina la carga si no hay ID
        return;
      }

      const actualUser = userData?.userData.id

      try {
        const response = await fetch(`${APIURL}/user?parentId=${actualUser}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }

        const data = await response.json();
        setUsers(data);

        const groupsResponse = await fetch(`${APIURL}/groups/user/${actualUser}`, {
          method: "GET",
        });
        if (!groupsResponse.ok) {
          throw new Error("La respuesta de la red no fue correcta al obtener grupos.");
        }
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userData]); // Solo se ejecuta cuando userSesion cambia

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Show spinner while loading */}
      </div>
    );
  }

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleDeleteUsers = async () => {
    try {
      const response = await fetch(`${APIURL}/user`, {
        method: "DELETE",
        body: JSON.stringify({ userIds: selectedUsers }), // Enviar IDs seleccionados
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]); // Limpiar la selección
      } else {
        throw new Error("Error al eliminar usuarios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignGroup = async () => {
    const { value: selectedGroupId } = await Swal.fire({
      title: "Asignar grupo",
      input: "select",
      inputOptions: groups.reduce((acc: any, group) => {
        acc[group.id!] = group.name;
        return acc;
      }, {}),
      inputPlaceholder: "Selecciona un grupo",
      showCancelButton: true,
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
    });

    if (selectedGroupId) {
      try {
        const response = await fetch(`${APIURL}/assign-group`, {
          method: "POST",
          body: JSON.stringify({
            userIds: selectedUsers,
            groupId: selectedGroupId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          Swal.fire("Éxito", "Grupo asignado correctamente", "success");
          setSelectedUsers([]); // Limpiar la selección
        } else {
          throw new Error("Error al asignar grupo");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo asignar el grupo", "error");
      }
    }
  };
  
const filteredUsers = users
    .filter((user) =>
      selectedRole ? user.roles?.some((role) => role.name === selectedRole) : true
    )
    .filter((user) =>
      selectedGroup ? user.group?.some((group) => group.id === selectedGroup) : true
    );


    return (
      <div className="container mx-auto p-4">
        <div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="mb-4 p-2 border rounded-md"
          >
            <option value="">Todos los roles</option>
            <option value="admin">Admin</option>
            <option value="candidate">Candidato</option>
            <option value="moderator">Moderador</option>
            <option value="voter">Votante</option>
          </select>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Todos los grupos</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-4 mb-4">
          <button
            onClick={handleDeleteUsers}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            disabled={selectedUsers.length === 0}
          >
            Eliminar seleccionados
          </button>
          <button
            onClick={handleAssignGroup}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={selectedUsers.length === 0}
          >
            Asignar grupo
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Usuarios</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-primaryColor text-white text-left">
                <th className="py-3 px-6 text-sm font-medium">Seleccionar</th>
                <th className="py-3 px-6 text-sm font-medium">Nombre</th>
                <th className="py-3 px-6 text-sm font-medium">Email</th>
                <th className="py-3 px-6 text-sm font-medium">DNI</th>
                <th className="py-3 px-6 text-sm font-medium">Domicilio</th>
                <th className="py-3 px-6 text-sm font-medium">Ciudad</th>
                <th className="py-3 px-6 text-sm font-medium">País</th>
                <th className="py-3 px-6 text-sm font-medium">Accion</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-t border-gray-200`}
                  >
                    <td className="py-3 px-6 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">{user.name}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">{user.email}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">{user.dni}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {user.address || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {user.city || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {user.country || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      <a
                        href={`/createCandidate/${user.id}`}
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
                    No se encontraron usuarios
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
