const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  try {
    const requestBody = req.body;

    if (!requestBody || !Array.isArray(requestBody.data)) {
      return res
        .status(400)
        .json({ error: "Invalid JSON format. 'data' should be an array." });
    }

    const alpha = requestBody.data.filter((item) => isNaN(item));
    const nums = requestBody.data.filter((item) => !isNaN(item));

    const lowerCaseAlphabets = alpha.filter((item) => /^[a-z]$/.test(item));
    const highestLowerCaseAlphabet = lowerCaseAlphabets.length
      ? [lowerCaseAlphabets.sort().reverse()[0]]
      : [];

    let fileInfo = {
      file_valid: false,
    };

    if (requestBody.file_b64) {
      const base64String = requestBody.file_b64;
      const buffer = Buffer.from(base64String, "base64");

      const fileType = "application/octet-stream";
      const fileSize = buffer.length;

      fileInfo = {
        file_valid: true,
        file_type: fileType,
        file_size: fileSize,
      };
    }

    return res.json({
      is_success: true,
      user_id: "YelisettyMohanMahesh_18112003",
      college_email_id: "Mohan_yelisetty@srmap.edu.in",
      college_roll_no: "AP21110010154",
      numbers: nums,
      alphabets: alpha,
      highest_lowercase_alphabet: highestLowerCaseAlphabet,
      ...fileInfo,
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/bfhl", (req, res) => {
  return res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
