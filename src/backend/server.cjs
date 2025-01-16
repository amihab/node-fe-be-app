const express = require("express");
const cors = require("cors");
const fs = require("fs");
const yaml = require("js-yaml");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

// ping endpoint
app.get("/api/ping", (_req, res) => {
  res.json({ ping: "ok" });
});

// list environment definition files
app.get("/api/listEnvs", (_req, res) => {
  const envsDir = process.env.ENV_REPO_DIR;
  if (!envsDir) {
    res
      .status(500)
      .json({ error: "ENV_REPO_DIR environment varaible not set" });
    return;
  }

  fs.readdir(envsDir, (err, files) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ files });
  });
});

// get environment definition file content
app.get("/api/getEnv/:env", (req, res) => {
  const envsDir = process.env.ENV_REPO_DIR;
  if (!envsDir) {
    res
      .status(500)
      .json({ error: "ENV_REPO_DIR environment varaible not set" });
    return;
  }

  const envFile = `${envsDir}/${req.params.env}`;
  fs.readFile(envFile, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const jsonData = yaml.load(data);
    res.json(jsonData);
  });
});

// save environment definition file content as a new yaml file
app.post("/api/saveEnv/:env", express.json(), (req, res) => {
  const envsDir = process.env.ENV_REPO_DIR;
  if (!envsDir) {
    res
      .status(500)
      .json({ error: "ENV_REPO_DIR environment varaible not set" });
    return;
  }

  const envFile = `${envsDir}/${req.params.env}`;
  const yamlData = yaml.dump(req.body);
  fs.writeFile(envFile, yamlData, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `File: ${envFile} saved` });
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
