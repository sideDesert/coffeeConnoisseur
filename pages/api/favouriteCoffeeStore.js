import table from "../../lib/table";

const favouriteCoffeeStore = async (req, res) => {
  const { id, like } = req.query;
  try {
    if (id && like) {
      const findCoffeeStoreRecords = await table
        .select({ filterByFormula: `id="${id}"` })
        .firstPage();
      const records = findCoffeeStoreRecords.map((record) => {
        return {
          ...record.fields,
          recordId: record.id,
        };
      });
      if (like === "true") {
        //update with a plus one
        table.update([
          {
            id: `${records[0].recordId}`,
            fields: {
              likes: records[0].likes + 1,
            },
          },
        ]);
        res.json({ Message: "Success" });
      }
      if (like === "false") {
        //update with a minus one

        table.update([
          {
            id: records[0].recordId,
            fields: {
              likes: parseInt(records[0].likes) - 1,
            },
          },
        ]);
        res.json({ Message: "Success" });
      }
    } else {
      res.status(400);
      res.json({ Error: "No ID provided" });
    }
  } catch (err) {
    res.status(500);
    res.json({ Error: "Couldn`t update like", err });
  }
};

export default favouriteCoffeeStore;
