import getStores from "../../lib/getStores";

const getCoffeeStores = async (req, res) => {
  try {
    const { lat, long, limit } = req.query;
    const response = await getStores(lat, long, limit);
    res.status(200).send(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({ message: "Oh no, something went wrong!", err });
  }
};

export default getCoffeeStores;
