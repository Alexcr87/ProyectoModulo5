export interface Package {
  id: number;
  name: string;
  maxParticipants: number;
  price: number;
}


export const servicePackages:Package[] = [
    { id: 0, name: 'No Account', maxParticipants: 0, price: 0 },
    { id: 1, name: 'Free', maxParticipants: 50, price: 0 },
    { id: 2, name: 'Basic', maxParticipants: 100, price: 10}, 
    { id: 3, name: 'Standard', maxParticipants: 500, price: 50},
    { id: 4, name: 'Premium', maxParticipants: 1000, price: 100},
  ];

