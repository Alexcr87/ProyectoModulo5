
'use client'
import React from "react";
import Cartrender from "../candidaterender/Candidaterender";
import { getCandidates } from "@/helpers/candidate.helper";
import Link from "next/link";

const OrderList = async () => {

  const usersResponse = await getCandidates()||[];
  if (!Array.isArray(usersResponse)) {
    console.error('La respuesta no es un array:', usersResponse);
    return null; // O muestra un mensaje de error si es necesario
  }
  const usersarr = usersResponse.map((item) => ({
    list: item.list,
    postulation: item.postulation,
    imgUrl: item.imgUrl,
    id: item.id,
    user: {
      id: item.user.id,
      name: item.user.name,
      dni: item.user.dni,
      email: item.user.email,
      address: item.user.address,
      city: item.user.city,
      country: item.user.country,
    },
  }));


  return (
    <>
      <div className="flex flex-wrap bg-cuartiaryColor min-h-[85vh] items-center justify-center">
      {usersarr && usersarr.length > 0 ? (
        usersarr.map((item) => {
          return (
              // <Link href={`/candidates/${item.id}`} key={item.id}>
              <Cartrender key={item.id} {...item} 
              // onDelete={() => handleDeleteCandidate(item.id)}
              // onAccess={() => handleUpdate(item.id)}
            />
       // </Link>
          );
        })
      ) : (
        <div className="flex justify-center items-center bg-cuartiaryColor min-h-[82vh]">
          <p className="text-lg text-gray-600 font-medium">
            You don't have any Candidates in this moment
          </p>
        </div>
      )}
      </div>
    </>
  );
};

export default OrderList;
