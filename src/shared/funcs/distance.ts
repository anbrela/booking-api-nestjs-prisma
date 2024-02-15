export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  //done by chatgpt, if fails, dont blame me

  const earthRadiusKm = 6371; // Radio de la Tierra en kilómetros

  // Convertir diferencias en coordenadas de grados a radianes
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  // Calcular la distancia utilizando la fórmula del haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calcular el ángulo central

  return earthRadiusKm * c; // Calcular la distancia en kilómetros
};
