import table from "../../lib/table";

const getCoffeeStoresById = async (req, res) => {
  const id = req.query.id;

  try {
    //Check if ID is given
    if (id) {
      const findCoffeeStoreRecords = await table
        .select({ filterByFormula: `id="${id}"` })
        .firstPage();
      //Check ig ID given has any matches in the database
      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return { ...record.fields };
        });
        res.json(records).status(200);
      } else {
        res.json({ message: `Id could not be found` });
      }
    } else {
      res.status(400);
      res.json({ Error: "No id" });
    }
  } catch (err) {
    res.status(500);
    res.json({ Error: err });
  }
};

export default getCoffeeStoresById;
