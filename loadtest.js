const http = require("http");

const url = "http://localhost:3000/students";
const TOTAL_REQUESTS = 1000;

let completed = 0;
let start = Date.now();

for (let i = 0; i < TOTAL_REQUESTS; i++) {
  http.get(url, (res) => {
    res.on("data", () => {});
    res.on("end", () => {
      completed++;

      if (completed === TOTAL_REQUESTS) {
        let end = Date.now();

        console.log("Total Time:", end - start, "ms");
        console.log(
          "Requests/sec:",
          (TOTAL_REQUESTS / ((end - start) / 1000)).toFixed(2)
        );
      }
    });
  });
}