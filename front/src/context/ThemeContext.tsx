'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Definir la interfaz para el contexto de tema
interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextProps>({
    isDarkMode: false,
    toggleTheme: () => {},
});

// Crear el proveedor de contexto
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Cargar el estado del tema desde el localStorage si está disponible
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        }
    }, []);

    // Alternar entre modo claro y oscuro
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Guardar el nuevo tema en localStorage
            return newMode;
        });
    };
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
            document.documentElement.classList.add(storedTheme); // Aplicar el tema almacenado
        } else {
            document.documentElement.classList.add('light'); // Aplicar modo claro por defecto
        }
    }, []);
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDarkMode]);
    

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Crear un hook para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);
