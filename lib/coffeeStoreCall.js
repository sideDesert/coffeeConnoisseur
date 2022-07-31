function getUrl(query, lat, long, limit) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${lat}%2C${long}&limit=${
    limit || 6
  }`;
}

export default async function (
  lat = 43.66031062975096,
  long = -79.3962391320531,
  limit = 6
) {
  const url = getUrl("coffee", lat, long, limit);

  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
}
