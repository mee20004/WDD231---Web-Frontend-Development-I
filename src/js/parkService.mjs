const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  
  const response = await fetch(baseUrl + url, options);
  
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Response not ok");
  }
}

export async function getParkData(parkCode = "yell") {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);
  
  return parkData.data[0];
}

export function getInfoLinks(images, parkInfoLinks) {
  return parkInfoLinks.map((item, index) => {
    return {
        ...item,
        image: images[index + 2]?.url || item.image
    };
  });
}

export async function getVisitorCenterData(parkCode = "yell") {
  const data = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return data.data;
}

console.log("My API Key is:", apiKey);

export { getJson };


