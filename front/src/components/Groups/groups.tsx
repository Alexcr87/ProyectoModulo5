'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Authontext";
import IGroup from "@/interfaces/IGroup";
import Spinner from "../ui/Spinner";
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Groups = () => {
  const { userData } = useAuth();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [groupName, setGroupName] = useState<string>("");

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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
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
              <th className="py-3 px-6 text-sm font-medium">Nombre</th>
              <th className="py-3 px-6 text-sm font-medium">Accion</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? (
              groups.map((group, idx) => (
                <tr
                  key={group.id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}
                >
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
                <td colSpan={8} className="py-4 text-center text-gray-500">
                  No groups found
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
