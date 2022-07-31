import { createApi } from "unsplash-js";
import getStoreNames from "./coffeeStoreCall";

const unsplash = new createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

async function imgObject() {
  const res = await unsplash.search.getPhotos({
    query: "coffee store",
    perPage: 30,
  });
  const data = res.response.results;

  const collection = data.map((el, index) => {
    return {
      id: el.id,
      width: el.width,
      height: el.height,
      asp: el.width / el.height,
      imgUrl: el.urls.regular,
    };
  });
  return collection;
}

const getStores = async (lat, long, limit) => {
  const stores = await getStoreNames(lat, long, limit);
  const collection = await imgObject();

  const data = stores.results.map((store, index) => {
    const { fsq_id, location, name } = store;
    return {
      id: fsq_id,
      address: location.formatted_address,
      neighborhood: location.neighborhood ? location.neighborhood[0] : [],
      name,
      imgUrl: collection[index].imgUrl,
      likes: 0,
    };
  });
  return data;
};

export default getStores;
