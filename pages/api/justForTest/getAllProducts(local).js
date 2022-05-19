// import * as fs from "fs";

// export default async function handler(req, res) {
//   let data = await fs.promises.readdir("productdata", "utf-8");
//   let files;
//   let allData = [];
//   for (let i = 0; i < data.length; i++) {
//     let item = data[i];
//     files = await fs.promises.readFile(`productdata/${item}`, "utf-8");
//     allData.push(JSON.parse(files));
//   }
//   res.status(200).json(allData);
// }
