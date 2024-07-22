import express from "express";
import user from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs/promises"; // Import promises API from fs

const app = express(); // Initialize the express app
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/user", (_, res) => {
  res.json(user);
});

app.get("/user", (_, res) => {
  const htmlFormData = `
    <ol>
    ${user.map((users) => `<li>${users.first_name}</li>`).join("")}
    </ol>
    `;
  res.send(htmlFormData);
});

app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = req.params.id;
    const User = user.find((users) => users.id == id);
    return res.json(User);
  })
  .patch(async (req, res) => {
    const id = parseInt(req.params.id);
    const userData = req.body;
    console.log("Received userData:", userData);
    
    try {
      const userIndex = user.findIndex((userId) => userId.id == id);

      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      user[userIndex] = { ...user[userIndex], ...userData };

      await fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2));

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" + error });
    }
  })
  .delete(async(req, res) => {
    const id = parseInt(req.params.id);
    try {
     const userIndex =  user.find((userID)=>userID.id == id)

     if(userIndex === -1 ){
      return res.status(404).json({ message: "User not found" });
     }

     user.splice(userIndex , 1)

     await fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2))
     res.json({Message: "User is successfully deleted"})
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({Message: "User not founded"})
    }

  })
   

app.post("/api/user", async (req, res) => {
  const body = req.body;
  const newUser = { id: user.length + 1, ...body };
  user.push(newUser);

  try {
    await fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2));
    res.status(200).json({ message: "Successful", id: newUser.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" + error });
  }

  console.log("Body", body);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
