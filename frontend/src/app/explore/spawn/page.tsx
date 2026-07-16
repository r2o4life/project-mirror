"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// Helper for simulating async operations
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ExploreSpawnPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Genesis, 2: Provision, 3: Deploy
  const [projectConfig, setProjectConfig] = useState({
    name: "",
    description: "",
    template: "default",
  });
  const [inceptionStatus, setInceptionStatus] = useState("idle"); // idle, configuring, provisioning, deploying, success, failed, cancelled
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate archival data for past spawns
  const [inceptionHistory, setInceptionHistory] = useState<
    { id: string; name: string; status: string; timestamp: string }[]
  >([]);

  const steps = [
    {
      id: "genesis",
      name: "Genesis Configuration",
      description: "Define the core parameters for your new project.",
    },
    {
      id: "provision",
      name: "Provisioning Review",
      description: "Review and confirm the automated resource allocation.",
    },
    {
      id: "deploy",
      name: "Deployment Execution",
      description: "Monitor the real-time instantiation of your project.",
    },
  ];

  const handleStartInception = () => {
    setCurrentStep(1); // Move to Genesis step
    setInceptionStatus("configuring");
    setProjectConfig({ name: "", description: "", template: "default" }); // Reset config for new inception
    setDeploymentLog([]);
    setDeploymentProgress(0);
    setIsProcessing(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!projectConfig.name || !projectConfig.description)) {
      alert("Project Name and Description are required!");
      return;
    }
    setCurrentStep((prev) => prev + 1);
    if (currentStep === 2) {
      handleDeployProject(); // Start deployment when moving from Provision to Deploy
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCancelInception = () => {
    if (confirm("Are you sure you want to cancel the current inception sequence?")) {
      setCurrentStep(0); // Back to intro
      setInceptionStatus("cancelled");
      setIsProcessing(false);
      // Optionally add to history as cancelled
      if (projectConfig.name) {
        setInceptionHistory((prev) => [
          {
            id: `spawn-${Date.now()}`,
            name: projectConfig.name,
            status: "Cancelled",
            timestamp: new Date().toLocaleString(),
          },
          ...prev,
        ]);
      }
    }
  };

  const handleDeployProject = async () => {
    setInceptionStatus("deploying");
    setDeploymentLog(["[0ms] Initiating deployment sequence..."]);
    setDeploymentProgress(0);

    await sleep(1000);
    setDeploymentLog((prev) => [...prev, "[+1000ms] Allocating core infrastructure..."]);
    setDeploymentProgress(25);

    await sleep(1500);
    setDeploymentLog((prev) => [...prev, "[+2500ms] Installing dependencies and templates..."]);
    setDeploymentProgress(60);

    await sleep(2000);
    setDeploymentLog((prev) => [...prev, "[+4500ms] Finalizing project structure and permissions..."]);
    setDeploymentProgress(90);

    await sleep(1000);
    const finalStatus = Math.random() > 0.2 ? "Success" : "Failed"; // Simulate success/failure
    setDeploymentLog((prev) => [
      ...prev,
      `[+5500ms] Deployment ${finalStatus === "Success" ? "complete" : "failed"}!`,
    ]);
    setDeploymentProgress(100);
    setInceptionStatus(finalStatus === "Success" ? "success" : "failed");
    setIsProcessing(false);

    // Add to history
    setInceptionHistory((prev) => [
      {
        id: `spawn-${Date.now()}`,
        name: projectConfig.name || "Unnamed Project",
        status: finalStatus,
        timestamp: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "var(--success)";
      case "Failed":
        return "var(--error)";
      case "Cancelled":
        return "var(--warning)";
      case "deploying":
        return "var(--primary)";
      case "configuring":
      case "provisioning":
        return "#8b949e";
      default:
        return "var(--foreground)";
    }
  };

  return (
    <div
      style={{
        padding: "64px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "64px",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: "32px",
          display: "flex",
          gap: "48px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            Conceptual Thesis: Spawn Engine
          </h1>
          <p
            style={{
              color: "#8b949e",
              marginTop: "16px",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Rather than allowing proprietary corporations to dictate technological
            gatekeeping, Project Mirror democratizes the capability to build
            equivalents. We provide the collective architecture required to
            systematically challenge software monopolies through open,
            community-driven development.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {currentStep === 0 ? (
            <button
              onClick={handleStartInception}
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                textAlign: "center",
                fontSize: "1rem",
                display: "block",
                border: "none",
                cursor: "pointer",
              }}
            >
              Execute Inception Sequence ↗
            </button>
          ) : (
            <button
              onClick={handleCancelInception}
              style={{
                background: "var(--warning)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                textAlign: "center",
                fontSize: "1rem",
                display: "block",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel Inception Sequence ✕
            </button>
          )}
        </div>
      </header>

      {/* Informational Lenses - Kept for context, but less prominent during active flow */}
      {currentStep === 0 && (
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              The Sociological Stake
            </div>
            <h2 style={{ fontSize: "1.8rem", color: "var(--foreground)", margin: 0 }}>
              Democratized Architecture
            </h2>
            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              Historically, launching a viable competitor to a monopoly required
              massive capital and gated infrastructure. Project Mirror addresses
              the Sociological stake by defying proprietary gatekeeping. It turns
              the complex process of architecting an alternative into a single,
              benchmark-driven action, decentralizing software ownership and
              returning access to the collective.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              The Growth Stake
            </div>
            <h2 style={{ fontSize: "1.8rem", color: "var(--foreground)", margin: 0 }}>
              Exponential Network Effects
            </h2>
            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              By standardizing the inception of new projects—automating the setup
              of repositories, licenses, and community portals—we achieve
              exponential network effects. Every new project spawned natively
              expands the search and contribution surface area for the entire
              ecosystem, compounding the global alternative tech stack rather than
              siloing it.
            </p>
          </div>
        </section>
      )}

      {/* Autonomous Project Inception - Interactive Pipeline */}
      {currentStep > 0 && (
        <section>
          <h2 style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "24px" }}>
            Autonomous Project Inception
          </h2>

          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            {/* Pipeline Steps Visualizer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "24px",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface-dark)",
              }}
            >
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                    opacity: index + 1 === currentStep ? 1 : 0.5,
                    fontWeight: index + 1 === currentStep ? 700 : 400,
                    color: index + 1 === currentStep ? "var(--primary)" : "var(--foreground)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: index + 1 < currentStep ? "var(--success)" : (index + 1 === currentStep ? "var(--primary)" : "var(--border)"),
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      marginBottom: "8px",
                    }}
                  >
                    {index + 1 < currentStep ? "✓" : index + 1}
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "calc(50% + 16px)",
                        top: "24px",
                        width: "calc(100% - 64px)",
                        height: "2px",
                        background: index + 1 < currentStep ? "var(--success)" : "var(--border)",
                        zIndex: -1,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div style={{ padding: "24px" }}>
              {currentStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <h3 style={{ margin: 0, color: "var(--foreground)" }}>
                    {steps[0].name}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 400,
                        color: "#8b949e",
                        marginLeft: "12px",
                      }}
                    >
                      (Action: Configure Project)
                    </span>
                  </h3>
                  <p style={{ color: "#8b949e", fontSize: "0.95rem" }}>
                    {steps[0].description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{ color: "var(--foreground)", fontWeight: 600 }}>
                      Project Name:
                      <input
                        type="text"
                        value={projectConfig.name}
                        onChange={(e) =>
                          setProjectConfig({ ...projectConfig, name: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginTop: "8px",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                          background: "var(--input-bg)",
                          color: "var(--foreground)",
                        }}
                        placeholder="e.g., Mirror-X-Clone"
                      />
                    </label>
                    <label style={{ color: "var(--foreground)", fontWeight: 600 }}>
                      Project Description:
                      <textarea
                        value={projectConfig.description}
                        onChange={(e) =>
                          setProjectConfig({ ...projectConfig, description: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginTop: "8px",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                          background: "var(--input-bg)",
                          color: "var(--foreground)",
                          minHeight: "80px",
                        }}
                        placeholder="A brief overview of your project's purpose."
                      />
                    </label>
                    <label style={{ color: "var(--foreground)", fontWeight: 600 }}>
                      Template:
                      <select
                        value={projectConfig.template}
                        onChange={(e) =>
                          setProjectConfig({ ...projectConfig, template: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginTop: "8px",
                          borderRadius: "6px",
                          border: "1px solid var(--border)",
                          background: "var(--input-bg)",
                          color: "var(--foreground)",
                        }}
                      >
                        <option value="default">Default Monorepo</option>
                        <option value="web-app">Web Application</option>
                        <option value="api-service">API Service</option>
                      </select>
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "16px",
                      marginTop: "24px",
                    }}
                  >
                    <button
                      onClick={handleNextStep}
                      disabled={!projectConfig.name || !projectConfig.description}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        background: "var(--primary)",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity: !projectConfig.name || !projectConfig.description ? 0.5 : 1,
                      }}
                    >
                      Next: Review Provisioning →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <h3 style={{ margin: 0, color: "var(--foreground)" }}>
                    {steps[1].name}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 400,
                        color: "#8b949e",
                        marginLeft: "12px",
                      }}
                    >
                      (Action: Review & Confirm)
                    </span>
                  </h3>
                  <p style={{ color: "#8b949e", fontSize: "0.95rem" }}>
                    {steps[1].description}
                  </p>
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "20px",
                      background: "var(--surface-dark)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8b949e" }}>Project Name:</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
                        {projectConfig.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8b949e" }}>Description:</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
                        {projectConfig.description}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8b949e" }}>Template:</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
                        {projectConfig.template}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8b949e" }}>Estimated Provisioning Time:</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
                        ~5-10 seconds
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      marginTop: "24px",
                    }}
                  >
                    <button
                      onClick={handleBackStep}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--foreground)",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      ← Back: Configure Genesis
                    </button>
                    <button
                      onClick={handleNextStep}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        background: "var(--primary)",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Confirm & Execute Deployment →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <h3 style={{ margin: 0, color: "var(--foreground)" }}>
                    {steps[2].name}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 400,
                        color: "#8b949e",
                        marginLeft: "12px",
                      }}
                    >
                      (Action: Monitor & Triage)
                    </span>
                  </h3>
                  <p style={{ color: "#8b949e", fontSize: "0.95rem" }}>
                    {steps[2].description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "20px",
                      background: "var(--surface-dark)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#8b949e" }}>Deployment Status:</span>
                      <span
                        style={{
                          color: getStatusColor(inceptionStatus),
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "0.9rem",
                        }}
                      >
                        {inceptionStatus}
                      </span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "var(--border)", borderRadius: "4px" }}>
                      <div
                        style={{
                          width: `${deploymentProgress}%`,
                          height: "100%",
                          background: getStatusColor(inceptionStatus),
                          borderRadius: "4px",
                          transition: "width 0.5s ease-in-out",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        height: "150px",
                        overflowY: "auto",
                        background: "var(--input-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        padding: "12px",
                        fontSize: "0.85rem",
                        color: "#8b949e",
                        fontFamily: "monospace",
                      }}
                    >
                      {deploymentLog.map((log, index) => (
                        <div key={index}>{log}</div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "16px",
                      marginTop: "24px",
                    }}
                  >
                    {inceptionStatus === "success" || inceptionStatus === "failed" ? (
                      <button
                        onClick={() => setCurrentStep(0)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          background: "var(--primary)",
                          color: "white",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Finish & Return to Explore
                      </button>
                    ) : (
                      <button
                        disabled
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          background: "var(--primary)",
                          color: "white",
                          fontWeight: 600,
                          cursor: "not-allowed",
                          opacity: 0.5,
                        }}
                      >
                        Deploying...
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Inception History - Archival Data */}
      <section>
        <h2 style={{ fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "24px" }}>
          Inception History
        </h2>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--surface)",
          }}
        >
          {inceptionHistory.length === 0 ? (
            <div style={{ padding: "24px", color: "#8b949e", textAlign: "center" }}>
              No past inception sequences found.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 1fr",
                gap: "16px",
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                fontWeight: 600,
                color: "var(--primary)",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>ID</span>
              <span>Project Name</span>
              <span>Status</span>
              <span>Timestamp</span>
            </div>
          )}
          {inceptionHistory.map((record) => (
            <div
              key={record.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 1fr",
                gap: "16px",
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                alignItems: "center",
                color: "var(--foreground)",
                fontSize: "0.95rem",
              }}
            >
              <span style={{ color: "#8b949e", fontFamily: "monospace" }}>
                {record.id.split("-")[1].slice(-6)}
              </span>
              <span>{record.name}</span>
              <span style={{ color: getStatusColor(record.status), fontWeight: 600 }}>
                {record.status}
              </span>
              <span style={{ color: "#8b949e" }}>{record.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}