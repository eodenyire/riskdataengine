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
    // ... existing jobs (I'll keep them but I need to make sure I don't break the existing code)
    {
      id: "J-001",
      name: "Daily Transaction Sync",
      type: "Database Migration",
      scenario: "sync",
      status: "completed",
      source: "Oracle DB",
      target: "SQL Server",
      progress: 100,
      threads: 8,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      completedAt: new Date(Date.now() - 86340000).toISOString()
    },
    {
      id: "J-002",
      name: "Risk Data Normalization",
      type: "File Conversion",
      scenario: "convert",
      status: "running",
      source: "Excel (S3)",
      target: "PostgreSQL",
      progress: 65,
      recordsProcessed: 812500,
      totalRecords: 1250000,
      dataVolume: "3.24 GB",
      estimatedTimeRemaining: "4.5m",
      threads: 4,
      timestamp: new Date().toISOString()
    },
    {
      id: "J-003",
      name: "Archive Legacy Records",
      type: "Database Migration",
      scenario: "copy",
      status: "failed",
      source: "IBM DB2",
      target: "S3 Bucket",
      progress: 14,
      threads: 16,
      timestamp: new Date().toISOString()
    }
  ];

  let connections = [
    { id: "C-001", name: "Oracle Core Mainframe", type: "Oracle", host: "10.0.1.42", port: "1521", username: "sys_admin", status: "Online" },
    { id: "C-002", name: "SQLServer Compliance UAT", type: "SQL Server", host: "uat-sql.equity.internal", port: "1433", username: "compliance_svc", status: "Online" },
    { id: "C-003", name: "PostgreSQL Risk Analytics", type: "PostgreSQL", host: "pg-risk.cloud.equity", port: "5432", username: "analyst_core", status: "Standby" }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/jobs", (req, res) => {
    res.json(jobs);
  });

  app.get("/api/connections", (req, res) => {
    res.json(connections);
  });

  app.post("/api/connections", (req, res) => {
    const newConn = {
      id: `C-00${connections.length + 1}`,
      ...req.body,
      status: "Online"
    };
    connections.push(newConn);
    res.status(201).json(newConn);
  });

  app.delete("/api/connections/:id", (req, res) => {
    connections = connections.filter(c => c.id !== req.params.id);
    res.status(204).send();
  });

  app.post("/api/jobs", (req, res) => {
    const newJob = {
      id: `J-00${jobs.length + 1}`,
      ...req.body,
      status: req.body.isScheduled ? "scheduled" : "queued",
      progress: 0,
      timestamp: new Date().toISOString()
    };
    jobs.unshift(newJob);
    res.status(201).json(newJob);
  });

  app.delete("/api/jobs/:id", (req, res) => {
    jobs = jobs.filter(j => j.id !== req.params.id);
    res.status(204).send();
  });

  app.patch("/api/jobs/:id", (req, res) => {
    const index = jobs.findIndex(j => j.id === req.params.id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...req.body };
      res.json(jobs[index]);
    } else {
      res.status(404).send("Job not found");
    }
  });

  app.post("/api/jobs/:id/start", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      job.status = "running";
      job.progress = 0;
      
      const isConvert = job.scenario === 'convert';
      
      const simulationLogs = !isConvert ? [
        "SETUP: Initializing Scenario: " + job.scenario.toUpperCase(),
        "CONNECT: Establishing connection to source node " + job.source + "...",
        "WORKFLOW: Parallel threads (x" + job.threads + ") engaged for data extraction...",
        "CONTROL: Applying SQL filters and type mapping rules...",
        "EXECUTION: Moving records from " + job.source + " to " + job.target + "...",
        "SYNC_CHECK: Running bidirectional delta verification...",
        "DISPATCH: Fan-out distribution to enterprise nodes...",
        "FINALIZE: Job " + job.id + " completed and saved as repeatable task."
      ] : [
        "CONVERT_INIT: Monitoring input stream from " + job.source + "...",
        "PARSE: Parsing file formats into internal metadata representation...",
        "TRANSFORM: Executing PII masking and normalization scripts...",
        "OUTPUT: Generating output in " + ((job as any).outputFormat || 'JSON') + " compliance format...",
        "DISTRIBUTE: Sending results to Group Emails and Local Folders...",
        "VERIFY: Consistency check passed for conversion ingestion.",
        "LOG: Trace archived to system audit trail."
      ];

      // Simulate progress and logs
      let step = 0;
      const interval = setInterval(() => {
        const currentJob = jobs.find(j => j.id === job.id);
        if (!currentJob || currentJob.status !== 'running') {
          clearInterval(interval);
          return;
        }

        currentJob.progress = Math.min(100, (step + 1) * (100 / simulationLogs.length));
        
        // Granular Updates
        const total = 1250000;
        (currentJob as any).recordsProcessed = Math.floor((currentJob.progress / 100) * total);
        (currentJob as any).totalRecords = total;
        (currentJob as any).dataVolume = ((currentJob.progress / 100) * 5.4).toFixed(2) + " GB";
        (currentJob as any).estimatedTimeRemaining = Math.max(0, (simulationLogs.length - step - 1) * 1.2).toFixed(1) + "m";

        console.log(`[ENGINE_${currentJob.id}] ${simulationLogs[step]}`);
        
        step++;
        if (step >= simulationLogs.length) {
          currentJob.status = "completed";
          currentJob.progress = 100;
          currentJob.completedAt = new Date().toISOString();
          clearInterval(interval);
        }
      }, 1500);
      
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
          
          const isConvert = job.scenario === 'convert';
          
          const simulationLogs = !isConvert ? [
            "RETRY_SETUP: Initializing Scenario: " + job.scenario.toUpperCase(),
            "RETRY_CONNECT: Establishing connection...",
            "RETRY_WORKFLOW: Re-engaging " + job.threads + " parallel threads...",
            "RETRY_CONTROL: Applying filters...",
            "RETRY_EXECUTION: Resuming data move...",
            "RETRY_SYNC: Verifying integrity...",
            "RETRY_FINALIZE: Retry successful."
          ] : [
            "RETRY_CONVERT: Re-monitoring input stream...",
            "RETRY_PARSE: Re-parsing metadata...",
            "RETRY_TRANSFORM: Clearing transformation cache...",
            "RETRY_OUTPUT: Generating new output format...",
            "RETRY_FINALIZE: Conversion retry complete."
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
