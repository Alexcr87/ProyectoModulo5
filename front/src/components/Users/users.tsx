"use client";

import withReactContent from "sweetalert2-react-content"; 
import { useAuth } from "@/context/Authontext";
import { useEffect, useState } from "react";
import IGroup from "@/interfaces/IGroup";
import IUsers from "@/interfaces/IUsers";
import Spinner from "../ui/Spinner";
import Select from 'react-select';
import Swal from "sweetalert2";


const MySwal = withReactContent(Swal);
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const {userData} = useAuth()
  const [users, setUsers] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (userData) {
      setRoles(userData.userData.roles.map((role) => role.name));
    }
  }, [userData]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userData?.userData.id) {
        setLoading(false);
        return;
      }

      try {
        let response;
        if (roles.includes("admin")) {
          response = await fetch(`${APIURL}/user`, {
            method: "GET",
          });
        } else {
          response = await fetch(`${APIURL}/user?parentId=${userData.userData.id}`, {
            method: "GET",
          });
        }

        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }

        const data = await response.json();
        setUsers(data);
        const groupsResponse = await fetch(`${APIURL}/groups/user/${userData.userData.id}`, {
          method: "GET",
        });

        if (!groupsResponse.ok) {
          throw new Error("La respuesta de la red no fue correcta al obtener grupos.");
        }

        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
      } catch (error) {
        console.error("Error al obtener usuarios o grupos:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ejecuta el fetch solo cuando los roles se han establecido y están listos
    if (roles.length > 0) {
      fetchUsers();
    }
  }, [roles, userData]); // Solo se ejecuta cuando userSesion cambia

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Show spinner while loading */}
      </div>
    );
  }

  const options = groups.map(group => ({
    value: group.id as string,
    label: group.name as string
  }))

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
    let selectedGroups: IGroup[] = []; // Usamos la interfaz IGroup
  
    const { value: formValues } = await MySwal.fire({
      title: "Asignar grupos",
      html: (
        <div className="sweetalert-custom-container">
          <Select
            isMulti
            name="groups"
            className="basic-multi-select w-full"
            classNamePrefix="select"
            placeholder="Selecciona grupos"
            autoFocus
            options={options}
            onChange={(newValue) => {
              selectedGroups = (newValue as Array<{ value: string; label: string }>).map(group => ({
                id: group.value, 
                name: group.label 
              })) as IGroup[]; 
            }}
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        if (!selectedGroups || selectedGroups.length === 0) {
          Swal.showValidationMessage("Debes seleccionar al menos un grupo");
          return false; // Cancela la acción si no se seleccionan grupos
        }
        return selectedGroups; 
      },
      customClass: {
        popup: 'large-swal-popup', 
      },
    });
  
    if (formValues && formValues.length > 0) {
      try {
        const response = await fetch(`${APIURL}/groups/assignGroup/${selectedUsers}`, {
          method: "PATCH",
          body: JSON.stringify({
            userIds: selectedUsers,
            groupIds: formValues.map((group: IGroup) => group.id), // Obtener solo los valores de ID de los grupos seleccionados
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          MySwal.fire("Grupos asignados", "Los grupos han sido asignados correctamente", "success");
        } else {
          throw new Error("Error al asignar grupos");
        }
      } catch (error) {
        console.error('Error:', error);
        MySwal.fire("Error", "Ocurrió un error al asignar grupos", "error");
      }
    }
  };
const filteredUsers = users
    .filter((user) =>
      selectedRole ? user.roles?.some((role) => role.name === selectedRole) : true
    )
    .filter((user) =>
      selectedGroup ? user.group?.some((group) => group.name === selectedGroup) : true
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
