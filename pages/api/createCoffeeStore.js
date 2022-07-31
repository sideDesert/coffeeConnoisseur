import table from "../../lib/table";
const createCoffeeStore = async (req, res) => {
  const { name, id, address, neighborhood, imgUrl, likes } = req.body;
  let nbd = neighborhood.length === 0 ? "" : neighborhood;
  if (id) {
    try {
      if (req.method === "POST") {
        const findCoffeeStoreRecords = await table
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = findCoffeeStoreRecords.map((record) => {
            return { ...record.fields };
          });
          res.json(records);
        } else {
          //create record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood: nbd,
                  imgUrl,
                  likes,
                },
              },
            ]);
            res.json({ message: "Created new record", records: createRecords });
          } else {
            res.status(400);
            res.json({ message: "Name of CoffeeStore missing" });
          }
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ message: "Something went wrong!", err });
    }
  } else {
    res.status(400);
    res.json({ message: "Id not available" });
  }
};

export default createCoffeeStore;
