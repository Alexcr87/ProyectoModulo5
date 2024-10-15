"use client";

import withReactContent from "sweetalert2-react-content"; 
import { useAuth } from "@/context/Authontext";
import { useEffect, useState } from "react";
import IGroup from "@/interfaces/IGroup";
import IUsers from "@/interfaces/IUsers";
import Spinner from "../ui/Spinner";
import Select from 'react-select';
import Swal from "sweetalert2";
import {deleteUsersHelper} from "../../helpers/user.helper";


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
  const [selectAll, setSelectAll] = useState<boolean>(false);


// Definición de fetchUsers fuera del componente Users
const fetchUsers = async (userData: any, roles: string[], setUsers: (users: IUsers[]) => void, setGroups: (groups: IGroup[]) => void, setLoading: (loading: boolean) => void) => {
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

useEffect(() => {
  if (userData) {
    setRoles(userData.userData.roles.map((role) => role.name));
  }
}, [userData]);

useEffect(() => {
  // Ejecuta fetchUsers solo cuando los roles se han establecido
  if (roles.length > 0) {
    fetchUsers(userData, roles, setUsers, setGroups, setLoading);
  }
}, [roles, userData]);


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

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      // Selecciona todos los usuarios
      const allUserIds = users.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      // Deselecciona todos los usuarios
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };



  const handleDeleteUsers = async (selectedUsers: string[], APIURL: string | undefined): Promise<void> => {
    if (!APIURL) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La URL de la API no está definida.',

      });
      return; 
    }
  
    const success = await deleteUsersHelper(selectedUsers, APIURL); 
    if (success) {
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]); 
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
        const response = await fetch(`${APIURL}/groups/assignGroup`, { // Eliminamos el userId de la URL
          method: "PATCH",
          body: JSON.stringify({
            userIds: selectedUsers,  // Aquí envías los userIds en el body
            groupIds: formValues.map((group: IGroup) => group.id),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          MySwal.fire("Grupos asignados", "Los grupos han sido asignados correctamente", "success");
          await fetchUsers(userData, roles, setUsers, setGroups, setLoading);
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
      selectedGroup ? user.groups?.some((group) => group.id === selectedGroup) : true
    );


    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-start">
          {/* Filtros y checkbox a la izquierda */}
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

            {/* Checkbox para seleccionar todos */}
            <div className="mt-4">
              <label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                Seleccionar todo
              </label>
            </div>
          </div>

          {/* Botones a la derecha */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleAssignGroup}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={selectedUsers.length === 0}
            >
              Asignar grupo
            </button>
            <button
              onClick={() => handleDeleteUsers(selectedUsers, APIURL)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={selectedUsers.length === 0}
            >
              Eliminar seleccionados
            </button>
          </div>
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
