"use client"
import React, { useState, useContext, createContext } from "react";
interface GuideContextProps {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    stepsCompleted: boolean[];
    completeStep: (stepIndex: number) => void;
}
const GuideContext = createContext<GuideContextProps | undefined>(undefined);
export const GuideProvider: React.FC<{ children: React.ReactNode }> =({ children }) => {
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [stepsCompleted, setStepsCompleted]= useState<boolean[]>(Array(9).fill(false));
    const openModal = ()=> setIsModalOpen(true);
    const closeModal= ()=> setIsModalOpen(false);
    const completeStep = (stepIndex: number) => {
        setStepsCompleted(prevSteps =>{
            const newSteps = [...prevSteps];
            newSteps[stepIndex] = true;
            return newSteps;
        })
    };
    return (
        <GuideContext.Provider value={{isModalOpen, openModal, closeModal, stepsCompleted, completeStep}}>
            {children}
        </GuideContext.Provider>
    );
};
export const useGuide = () => {
    const context = useContext(GuideContext);
    if (!context){
        throw new Error("useGide debe ser usado dentro de un guideProvider");
    }
    return context;
}