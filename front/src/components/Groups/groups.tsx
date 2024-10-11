'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Authontext";
import IGroup from "@/interfaces/IGroup";
import Spinner from "../ui/Spinner";
import Swal from "sweetalert2";
import { deleteGroups } from "../../helpers/group.helper";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Groups = () => {
  const { userData } = useAuth();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [groupName, setGroupName] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const fetchGroups = async () => {
    if (!userData?.userData.id) {
      setLoading(false); // Termina la carga si no hay ID
      return;
    }

    const actualUser = userData?.userData.id;

    try {
      const response = await fetch(`${APIURL}/groups/user/${actualUser}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error al obtener grupos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [userData]);

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
          userId: userData?.userData.id, // ID del usuario autenticado
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el grupo");
      }

      // Después de crear el grupo, actualizar la lista de grupos
      await fetchGroups(); // Llama de nuevo a la función para obtener los grupos actualizados
      setGroupName(""); // Limpiar el campo del nombre del grupo
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

      <form onSubmit={handleCreateGroup} className="mb-4">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nombre del grupo"
          className="border rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Crear Grupo
        </button>
      </form>

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
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-t border-gray-200`}
                >
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id ?? "")}
                      onChange={() => handleSelectGroup(group.id ?? "")}
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">{group.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    <a
                      href={`/groups/edit/${group.id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      editar grupo
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No hay grupos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedGroups.length > 0 && (
        <button
          onClick={handleDeleteGroups}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Eliminar Grupos Seleccionados
        </button>
      )}
    </div>
  );
};

export default Groups;
