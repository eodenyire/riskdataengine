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
    },
    {
      id: "J-003",
      name: "Legacy Mainframe Export",
      type: "Database Ingestion",
      status: "failed",
      source: "IBM DB2",
      target: "S3 Bucket",
      progress: 14,
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
        "DB_CONN: Connecting to Equity Source Oracle Cluster...",
        "QUERY_TABLES: Extracting Risk Tables [TRAN_MASTER, COL_VAL]...",
        "TRANSFORM_CLEAN: Cleaning data and applying Equity Transformation Schema...",
        "DB_WRITE: Committing to Global Risk Vault (SQL Server)...",
        "FORMAT_EXPORT: Generating regulatory EXCEL and XML formats...",
        "DISTRIBUTE_EMAIL: Sharing artifacts with Risk Compliance Email Group...",
        "ONEDRIVE_SYNC: Persisting audit trail to Enterprise OneDrive...",
        "LOCAL_SAVE: Archiving copy to Regional Support folders...",
        "FINALIZE: Audit trail verification complete for Equity Group."
      ] : [
        "FILE_FETCH: Monitoring Leg 2 Inbound Folders...",
        "FILE_EXTRACT: Parsing multiple risk file formats (CSV, XML, JSON)...",
        "INGEST_TRANSFORM: Cleaning file records and normalizing for DB ingestion...",
        "DB_COMMIT: Ingesting to Equity Risk Repository (PostgreSQL)...",
        "FORMAT_CONV: Converting source formats to enterprise standards...",
        "DISTRIBUTE_REMOTE: Sharing to remote departmental SFTP servers...",
        "EMAIL_NOTIFY: Alerting Risk Managers via Compliance Groups...",
        "FINALIZE: Ingestion lifecycle complete."
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

  app.post("/api/jobs/:id/retry", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      job.status = "queued";
      job.progress = 0;
      
      // Wait 2 seconds in queued state before starting automatically
      setTimeout(() => {
        if (job.status === 'queued') {
          // Trigger the 'start' logic
          job.status = "running";
          const isLeg1 = job.type === 'Database Ingestion';
          const simulationLogs = isLeg1 ? [
            "DB_CONN: Connecting to Equity Source Oracle Cluster...",
            "QUERY_TABLES: Extracting Risk Tables [TRAN_MASTER, COL_VAL]...",
            "TRANSFORM_CLEAN: Cleaning data and applying Equity Transformation Schema...",
            "DB_WRITE: Committing to Global Risk Vault (SQL Server)...",
            "FORMAT_EXPORT: Generating regulatory EXCEL and XML formats...",
            "DISTRIBUTE_EMAIL: Sharing artifacts with Risk Compliance Email Group...",
            "ONEDRIVE_SYNC: Persisting audit trail to Enterprise OneDrive...",
            "LOCAL_SAVE: Archiving copy to Regional Support folders...",
            "FINALIZE: Audit trail verification complete for Equity Group."
          ] : [
            "FILE_FETCH: Monitoring Leg 2 Inbound Folders...",
            "FILE_EXTRACT: Parsing multiple risk file formats (CSV, XML, JSON)...",
            "INGEST_TRANSFORM: Cleaning file records and normalizing for DB ingestion...",
            "DB_COMMIT: Ingesting to Equity Risk Repository (PostgreSQL)...",
            "FORMAT_CONV: Converting source formats to enterprise standards...",
            "DISTRIBUTE_REMOTE: Sharing to remote departmental SFTP servers...",
            "EMAIL_NOTIFY: Alerting Risk Managers via Compliance Groups...",
            "FINALIZE: Ingestion lifecycle complete."
          ];

          let step = 0;
          const interval = setInterval(() => {
            job.progress = (step + 1) * 10;
            console.log(`[RETRY_${job.id}] ${simulationLogs[step]}`);
            step++;
            if (step >= simulationLogs.length) {
              job.status = "completed";
              job.progress = 100;
              clearInterval(interval);
            }
          }, 1200);
        }
      }, 2000);
      
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  });

  app.post("/api/jobs/:id/pause", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      job.status = "paused";
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  });

  app.post("/api/jobs/:id/cancel", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      job.status = "failed";
      job.progress = 0;
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
