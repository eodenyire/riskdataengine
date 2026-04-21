import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock DB for Ingestion Jobs
  let jobs = [
    {
      id: "J-001",
      name: "Daily Transaction Sync",
      type: "Database Ingestion",
      status: "completed",
      source: "Oracle DB",
      target: "SQL Server",
      progress: 100,
      timestamp: new Date().toISOString()
    },
    {
      id: "J-002",
      name: "Quarterly Risk Assessment",
      type: "File Processing",
      status: "running",
      source: "Excel (Local)",
      target: "PostgreSQL",
      progress: 65,
      timestamp: new Date().toISOString()
    }
  ];

  // API Routes
  app.get("/api/jobs", (req, res) => {
    res.json(jobs);
  });

  app.post("/api/jobs", (req, res) => {
    const newJob = {
      id: `J-00${jobs.length + 1}`,
      ...req.body,
      status: "queued",
      progress: 0,
      timestamp: new Date().toISOString()
    };
    jobs.unshift(newJob);
    res.status(201).json(newJob);
  });

  app.post("/api/jobs/:id/start", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      job.status = "running";
      job.progress = 0;
      
      const isLeg1 = job.type === 'Database Ingestion';
      
      const simulationLogs = isLeg1 ? [
        "BOOTSTRAP: Initializing Leg 1 Database Sync...",
        "CONNECT: Persistent tunnel established with source DB nodes.",
        "QUERY: Executing complex risk-parameters extraction...",
        "TRANSFORM: Applying 'PII Masking' & 'Data Cleaning' logic...",
        "VALIDATE: Schema integrity check passed for 4.2M rows.",
        "INGEST: Parallel multi-threaded write to destination repository...",
        "CONVERT: Generating distribution artifacts (Excel/JSON formats)...",
        "DISTRIBUTE: Dispatching to Email Group 'Risk-Mgt-Daily'...",
        "SYNC: Backup pushed to OneDrive://Compliance/Internal/Vault",
        "FINALIZE: Compliance audit trail signed and sealed."
      ] : [
        "BOOTSTRAP: Initializing Leg 2 File Ingestion...",
        "FETCH: Extracting raw files from remote SFTP/Local hubs...",
        "SCAN: Anti-virus and malware scanning of incoming artifacts...",
        "PARSE: Converting raw XML/CSV into structured ingestion stream...",
        "CLEAN: Sanitizing invalid records and null-pointers...",
        "MAP: Mapping source fields to target relational schema...",
        "WRITE: Committing transformed records to Production DB vault...",
        "CONVERT: Saving localized copies for departmental archives...",
        "DISTRIBUTE: Artifacts shared on Enterprise Remote Folders...",
        "FINALIZE: Job artifacts prepared for regulatory inspection."
      ];

      // Simulate progress and logs
      let step = 0;
      const interval = setInterval(() => {
        job.progress = (step + 1) * 10;
        console.log(`[ENGINE_${job.id}] ${simulationLogs[step]}`);
        
        step++;
        if (step >= simulationLogs.length) {
          job.status = "completed";
          job.progress = 100;
          clearInterval(interval);
        }
      }, 1200);
      
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
