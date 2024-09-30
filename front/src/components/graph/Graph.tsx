/*"use client"
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import colors from '@/helpers/colors.helper';
import ICampaign from '@/interfaces/ICampaign';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
    const colorType = colors
    

  const data = {
    labels: ['Juan', 'Pedro', 'Simon', 'En Blanco'],
    datasets: [
      {
        label: 'Votos',
        data: [10, 200, 150, 5],
        backgroundColor: colorType.backgroundColor,
        borderColor: colorType.borderColor
      },
    ],
  };

  const options = {
    responsive: true,
    plugins:{
        legend: {
            position: 'left', // Cambia la posición de la leyenda a la izquierda
            labels: {
            boxWidth: 30, // Ajusta el ancho del cuadro de la leyenda
            padding: 15,  // Espaciado entre etiquetas
            },
        },
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default Graph;*/