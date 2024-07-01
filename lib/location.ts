import axios from "axios";

export const getGeoLocation = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.address) {
      const address = `${
        data.address.state ||
        data.address.city ||
        data.address.town ||
        data.address.village
      }, ${data.address.country}`;
      return address;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
