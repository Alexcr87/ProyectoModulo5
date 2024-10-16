'use client';

import { deleteGroups } from "../../helpers/group.helper";
import { useAuth } from "@/context/Authontext";
import { useEffect, useState } from "react";
import IGroup from "@/interfaces/IGroup";
import Spinner from "../ui/Spinner";
import Swal from "sweetalert2";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Groups = () => {
  const { userData } = useAuth();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [groupName, setGroupName] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]); // Estado para roles
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      if (!userData) {
        setLoading(false); // Si no hay userData, termina la carga
        return;
      }

      const mappedRoles = userData.userData.roles.map(role => role.name);
      setRoles(mappedRoles);

      const userGroups = userData.userData.groups.map(group => group.id).filter((group): group is string => group !== undefined);
      setSelectedGroups(userGroups);

      await fetchGroups(mappedRoles);
    };

    initializeData(); 
  }, [userData]); 

  const fetchGroups = async (userRoles: string[]) => {
    if (!userData?.userData.id) {
      setLoading(false);
      return;
    }

    try {
      let response;

      if (userRoles.includes('admin')) {
        response = await fetch(`${APIURL}/groups`, {
          method: "GET",
        });
      } else {
        response = await fetch(`${APIURL}/groups/user/${userData.userData.id}`, {
          method: "GET",
        });
      }

      if (!response.ok) {
        throw new Error("Error al obtener los grupos");
      }

      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error al obtener grupos:", error);
    } finally {
      setLoading(false); // Finaliza la carga solo después de la solicitud
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${APIURL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          userId: userData?.userData.id, 
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el grupo");
      }

      await fetchGroups(roles); 
      setGroupName(""); 
    } catch (error) {
      console.error("Error creando grupo:", error);
    }
  };

  const handleSelectGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleDeleteGroups = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteGroups(selectedGroups);
        const newGroups = groups.filter(
          (group) => !selectedGroups.includes(group.id ?? "")
        );
        setGroups(newGroups);
        setSelectedGroups([]);

        Swal.fire("¡Eliminados!", response, "success");
      } catch (error: any) {
        const errorMessage = error.message || "Error al eliminar los grupos.";
        Swal.fire("Error", errorMessage, "error");
      }
    }
  };

  const handleEditGroup = async (group: IGroup) => {
    const { value: newName } = await Swal.fire({
      title: 'Cambiar nombre del grupo',
      input: 'text',
      inputLabel: 'Nuevo nombre',
      inputPlaceholder: 'Ingresa el nuevo nombre',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValue: group.name,
    });

    if (newName) {
      try {
        const response = await fetch(`${APIURL}/groups/changeName/${group.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newName: newName,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al cambiar el nombre del grupo");
        }

        setGroups((prevGroups) =>
          prevGroups.map((g) =>
            g.id === group.id ? { ...g, name: newName } : g
          )
        );

        Swal.fire("Éxito", "Nombre del grupo actualizado.", "success");
      } catch (error:any) {
        const errorMessage = error.message || "Error al cambiar nombre.";
        Swal.fire("Error", errorMessage , "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mis Grupos</h1>

      <div className="mb-4">
  <form onSubmit={handleCreateGroup} className="flex items-center">
    <input
      type="text"
      value={groupName}
      onChange={(e) => setGroupName(e.target.value)}
      placeholder="Nombre del grupo"
      className="border rounded p-2 mr-2"
    />
    <button type="submit" className="bg-primaryColor text-white p-2 rounded">
      Crear Grupo
    </button>
  </form>
  <button
    onClick={handleDeleteGroups}
    className="bg-primaryColor text-white p-2 rounded mt-2 disabled:opacity-50"
    disabled={selectedGroups.length === 0} // Desactiva si no hay grupos seleccionados
  >
    Eliminar Grupos
  </button>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primaryColor text-white text-left">
              <th className="py-3 px-6 text-sm font-medium">Seleccionar</th>
              <th className="py-3 px-6 text-sm font-medium">Nombre</th>
              <th className="py-3 px-6 text-sm font-medium">Accion</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? (
              groups.map((group, idx) => (
                <tr
                  key={group.id ?? idx} // Usa el idx como backup si el id es undefined
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}
                >
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id ?? "")} // Usa el id o un valor por defecto
                      onChange={() => handleSelectGroup(group.id ?? "")} // Manejamos el cambio del checkbox
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">{group.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="text-primaryColor hover:text-blue-700 font-medium"
                    >
                      editar grupo
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">
                  No se encontraron grupos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups;

