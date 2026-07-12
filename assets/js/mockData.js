/* ==========================================================================
   SECUREOPS // Comprehensive Mock Data (`assets/js/mockData.js`)
   ========================================================================== */

const MOCK_DATA = {
    currentUser: {
        id: "usr_901a8b",
        name: "Harshil Architect",
        role: "Principal DevSecOps Architect",
        email: "harshil@secureops.dev",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        department: "Cloud Security & Infrastructure",
        jwt_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDFhOGIiLCJuYW1lIjoiSGFyc2hpbCBBcmNoaXRlY3QiLCJpYXQiOjE3Nzk3ODAwMDB9.s9e8x7z6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e",
        api_tokens: [
            { id: "tok_1", name: "Local-CLI-Runner", token: "sec_live_9a8b7c6d5e4f3a2b1c0d9e8f", created: "2026-06-12", lastUsed: "10 mins ago", status: "Active" },
            { id: "tok_2", name: "GitHub-Actions-Webhook", token: "sec_live_1z2y3x4w5v6u7t8s9r0q1p2o", created: "2026-05-20", lastUsed: "1 hour ago", status: "Active" },
            { id: "tok_3", name: "Staging-K8s-Agent", token: "sec_live_m1n2o3p4q5r6s7t8u9v0w1x2", created: "2026-04-01", lastUsed: "3 days ago", status: "Active" }
        ]
    },

    metrics: {
        totalRepositories: 18,
        activeScans: 3,
        criticalVulnerabilities: 5,
        securityScore: 94,
        pipelineHealth: 98.2,
        scansToday: 142,
        blockedAttacksToday: 1482910
    },

    chartData: {
        weeklyScans: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [42, 68, 95, 112, 142, 38, 54]
        },
        monthlyTrends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            values: [320, 410, 580, 690, 840, 920, 1140]
        },
        severityBreakdown: [
            { label: 'Critical', value: 5, color: '#FF2E63' },
            { label: 'High', value: 12, color: '#FFB800' },
            { label: 'Medium', value: 28, color: '#00F0FF' },
            { label: 'Low', value: 45, color: '#94A3B8' }
        ]
    },

    repositories: [
        {
            id: "repo-01",
            name: "api-gateway",
            language: "Go",
            branch: "main",
            status: "Secure",
            score: 98,
            lastScanned: "2 mins ago",
            critical: 0,
            high: 1,
            medium: 3,
            stars: 142,
            description: "High-throughput edge routing microservice with rate-limiting and zero-trust JWT validation."
        },
        {
            id: "repo-02",
            name: "auth-service",
            language: "TypeScript",
            branch: "main",
            status: "Action Required",
            score: 86,
            lastScanned: "14 mins ago",
            critical: 2,
            high: 3,
            medium: 8,
            stars: 98,
            description: "OAuth2 / OIDC identity provider handling SSO, multi-factor authentication, and session tokens."
        },
        {
            id: "repo-03",
            name: "payment-processor",
            language: "Python",
            branch: "staging",
            status: "Critical",
            score: 74,
            lastScanned: "1 hour ago",
            critical: 3,
            high: 4,
            medium: 6,
            stars: 210,
            description: "PCI-DSS compliant payment gateway adapter for Stripe and Adyen integrations."
        },
        {
            id: "repo-04",
            name: "k8s-infra-configs",
            language: "YAML / HCL",
            branch: "main",
            status: "Secure",
            score: 96,
            lastScanned: "3 hours ago",
            critical: 0,
            high: 0,
            medium: 4,
            stars: 65,
            description: "Terraform manifests, Helm charts, and ArgoCD deployment specs for AWS EKS clusters."
        },
        {
            id: "repo-05",
            name: "user-portal-frontend",
            language: "TypeScript",
            branch: "main",
            status: "Secure",
            score: 94,
            lastScanned: "5 hours ago",
            critical: 0,
            high: 1,
            medium: 5,
            stars: 180,
            description: "Next.js 15 client-side web interface with glassmorphic UI tokens and real-time sockets."
        },
        {
            id: "repo-06",
            name: "ml-fraud-engine",
            language: "Python",
            branch: "develop",
            status: "Action Required",
            score: 89,
            lastScanned: "Yesterday",
            critical: 0,
            high: 3,
            medium: 2,
            stars: 340,
            description: "PyTorch realtime fraud detection worker evaluating transactions in sub-20ms latency."
        },
        {
            id: "repo-07",
            name: "crypto-vault-service",
            language: "Rust",
            branch: "main",
            status: "Secure",
            score: 99,
            lastScanned: "2 days ago",
            critical: 0,
            high: 0,
            medium: 0,
            stars: 512,
            description: "Hardware Security Module (HSM) proxy and cryptographic key vault service written in pure Rust."
        },
        {
            id: "repo-08",
            name: "notification-dispatcher",
            language: "Go",
            branch: "main",
            status: "Secure",
            score: 95,
            lastScanned: "2 days ago",
            critical: 0,
            high: 0,
            medium: 3,
            stars: 84,
            description: "Asynchronous webhook, email, and Slack alert pipeline powered by Kafka."
        }
    ],

    scanners: [
        {
            id: "bandit",
            name: "Bandit Engine",
            type: "SAST (Python)",
            version: "1.7.8",
            status: "Online",
            lastRun: "Just now",
            description: "Static Application Security Testing tool designed to find common security issues in Python code.",
            icon: "🐍"
        },
        {
            id: "trivy",
            name: "Trivy Scanner",
            type: "Container & IaC",
            version: "0.52.0",
            status: "Online",
            lastRun: "12 mins ago",
            description: "Comprehensive vulnerability scanner for container images, file systems, and Terraform manifests.",
            icon: "🐳"
        },
        {
            id: "gitleaks",
            name: "Gitleaks Guard",
            type: "Secret Detection",
            version: "8.18.2",
            status: "Online",
            lastRun: "25 mins ago",
            description: "Lightning fast secret scanner for Git repos, detecting API keys, passwords, and tokens.",
            icon: "🔑"
        },
        {
            id: "owasp-zap",
            name: "OWASP ZAP AI",
            type: "DAST & API Scanner",
            version: "2.14.0",
            status: "Online",
            lastRun: "4 hours ago",
            description: "Dynamic Application Security Testing probe checking running endpoints for injections and CORS misconfigs.",
            icon: "🛡️"
        }
    ],

    vulnerabilities: [
        {
            id: "CVE-2026-1049",
            title: "Hardcoded AWS IAM Root Secret in Payment API Worker",
            cwe: "CWE-798: Use of Hard-coded Credentials",
            severity: "Critical",
            cvss: 9.8,
            repository: "payment-processor",
            file: "workers/aws_billing_sync.py",
            line: 42,
            status: "Open",
            detected: "Today, 14:22 UTC",
            codeSnippet: `def connect_aws_billing():\n    # TODO: remove hardcoded key before prod\n    aws_access_key = "AKIA52910492019SECRET"\n    aws_secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n    return boto3.client('s3', aws_access_key_id=aws_access_key)`,
            remediation: "Immediately revoke the exposed AWS access key in IAM. Replace hardcoded strings with environment variables (`os.environ['AWS_ACCESS_KEY_ID']`) or use AWS IAM Role service account assumption."
        },
        {
            id: "CVE-2026-3012",
            title: "Remote Code Execution via Insecure Deserialization",
            cwe: "CWE-502: Deserialization of Untrusted Data",
            severity: "Critical",
            cvss: 9.4,
            repository: "payment-processor",
            file: "adapters/legacy_pickle_handler.py",
            line: 118,
            status: "Open",
            detected: "Today, 11:05 UTC",
            codeSnippet: `def handle_webhook_payload(raw_payload):\n    # Parsing binary payload from merchant gateway\n    decoded_bytes = base64.b64decode(raw_payload)\n    data_obj = pickle.loads(decoded_bytes) # VULNERABLE TO RCE\n    return process_order(data_obj)`,
            remediation: "Never use Python `pickle` on untrusted external data. Replace `pickle.loads()` with safe JSON parsing (`json.loads()`) or cryptographic schema validation using Pydantic."
        },
        {
            id: "CWE-89-SQLI",
            title: "SQL Injection in User Query Handler via String Formatting",
            cwe: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command",
            severity: "Critical",
            cvss: 9.1,
            repository: "auth-service",
            file: "src/db/user_queries.ts",
            line: 88,
            status: "Open",
            detected: "Yesterday, 18:40 UTC",
            codeSnippet: `async function findUserByEmail(email: string) {\n    // Direct string interpolation into raw SQL query\n    const query = \`SELECT * FROM users WHERE email = '\${email}' AND status = 'ACTIVE'\`;\n    return await db.query(query);\n}`,
            remediation: "Use parameterized queries or prepared statements (`SELECT * FROM users WHERE email = $1 AND status = 'ACTIVE'`, `[email]`) or leverage a secure ORM like Prisma or Drizzle."
        },
        {
            id: "CVE-2026-0881",
            title: "Server-Side Request Forgery (SSRF) in Image Avatar Fetcher",
            cwe: "CWE-918: Server-Side Request Forgery",
            severity: "High",
            cvss: 8.2,
            repository: "auth-service",
            file: "src/routes/profile.ts",
            line: 204,
            status: "Open",
            detected: "3 days ago",
            codeSnippet: `router.post('/avatar/from-url', async (req, res) => {\n    const { imageUrl } = req.body;\n    const response = await axios.get(imageUrl); // Can hit http://169.254.169.254/latest/meta-data/\n    fs.writeFileSync('/tmp/avatar.png', response.data);\n});`,
            remediation: "Implement strict URL whitelist validation and block private/internal IP ranges (`169.254.0.0/16`, `10.0.0.0/8`, `127.0.0.1`) before issuing HTTP requests."
        },
        {
            id: "CWE-311-MISSING",
            title: "Missing TLS Enforcement on Internal Service-to-Service RPC",
            cwe: "CWE-311: Missing Encryption of Sensitive Data",
            severity: "High",
            cvss: 7.5,
            repository: "api-gateway",
            file: "internal/rpc/client.go",
            line: 65,
            status: "In Progress",
            detected: "4 days ago",
            codeSnippet: `func initInternalClient(targetAddr string) (*grpc.ClientConn, error) {\n    // Insecure plaintext gRPC connection over cluster VPC\n    conn, err := grpc.Dial(targetAddr, grpc.WithInsecure())\n    if err != nil { return nil, err }\n    return conn, nil\n}`,
            remediation: "Enable Mutual TLS (mTLS) across all internal microservice boundaries using Kubernetes Service Mesh certificates (`grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig))`)."
        }
    ],

    pipelineStages: [
        { id: 1, name: "GitHub Push", status: "PASSED", duration: "2s", info: "Commit #a9b8c7d by Harshil: 'Refactor JWT auth header'" },
        { id: 2, name: "Build Docker Image", status: "PASSED", duration: "34s", info: "Multi-stage Alpine Linux build. Total size: 48.2 MB" },
        { id: 3, name: "Run Bandit (SAST)", status: "PASSED", duration: "18s", info: "Scanned 142 Python modules. 0 high severity vulnerabilities." },
        { id: 4, name: "Run Trivy (IaC/Container)", status: "PASSED", duration: "45s", info: "Container layer scan checked against CVE DB 2026.07.10." },
        { id: 5, name: "Run Gitleaks (Secrets)", status: "PASSED", duration: "8s", info: "Checked 1,280 commits for API tokens, private SSH keys, and AWS secrets." },
        { id: 6, name: "Kubernetes Deploy", status: "READY", duration: "Pending", info: "Security gate PASSED. Ready for zero-downtime rolling update to Staging." }
    ],

    scanHistory: [
        { id: "scn-9001", repo: "payment-processor", scanner: "Bandit SAST", triggeredBy: "GitHub Action #4092", duration: "42s", timestamp: "Today, 14:22 UTC", status: "VULNERABILITIES FOUND", findings: "2 Critical, 1 High" },
        { id: "scn-9000", repo: "api-gateway", scanner: "Trivy Container", triggeredBy: "System AI Scheduler", duration: "1m 12s", timestamp: "Today, 12:00 UTC", status: "PASSED", findings: "0 Issues Found" },
        { id: "scn-8999", repo: "auth-service", scanner: "Gitleaks Guard", triggeredBy: "Harshil Architect", duration: "14s", timestamp: "Yesterday, 18:40 UTC", status: "VULNERABILITIES FOUND", findings: "1 Critical SQLi" },
        { id: "scn-8998", repo: "k8s-infra-configs", scanner: "Trivy IaC", triggeredBy: "GitHub PR #114", duration: "28s", timestamp: "Yesterday, 15:10 UTC", status: "PASSED", findings: "0 Issues Found" },
        { id: "scn-8997", repo: "user-portal-frontend", scanner: "OWASP ZAP AI", triggeredBy: "Nightly Cron", duration: "4m 05s", timestamp: "Yesterday, 03:00 UTC", status: "PASSED", findings: "0 Issues Found" }
    ],

    auditLogs: [
        { id: "aud-104", user: "Harshil Architect", action: "SCAN_TRIGGERED", details: "Manual Bandit SAST scan triggered on `payment-processor`", ip: "192.168.1.104", timestamp: "Today, 14:21:50 UTC", status: "SUCCESS" },
        { id: "aud-103", user: "System AI Guardrail", action: "POLICY_ENFORCED", details: "Blocked deployment to production due to open CVSS > 9.0 finding", ip: "10.240.0.12", timestamp: "Today, 14:22:35 UTC", status: "BLOCKED" },
        { id: "aud-102", user: "Harshil Architect", action: "API_TOKEN_CREATED", details: "Generated personal access token `Local-CLI-Runner`", ip: "192.168.1.104", timestamp: "Yesterday, 11:15:02 UTC", status: "SUCCESS" },
        { id: "aud-101", user: "Sarah Security", action: "ROLE_UPDATED", details: "Assigned `Security Engineer` permissions to `alex@secureops.dev`", ip: "172.16.4.88", timestamp: "3 days ago", status: "SUCCESS" },
        { id: "aud-100", user: "GitHub Actions Webhook", action: "SECRET_REVOKED", details: "Automated revocation request sent for exposed AWS secret key", ip: "140.82.112.4", timestamp: "4 days ago", status: "SUCCESS" }
    ],

    notifications: [
        { id: 1, title: "Critical Vulnerability Detected", message: "CVE-2026-1049 (Hardcoded AWS Key) found in payment-processor during automated push check.", time: "10 mins ago", type: "critical", read: false },
        { id: 2, title: "Deployment Security Gate Enforced", message: "Production deployment for auth-service blocked due to open SQL injection finding.", time: "1 hour ago", type: "warning", read: false },
        { id: 3, title: "Nightly Scan Completed", message: "All 18 repositories scanned successfully. Security Score improved +2% to 94/100.", time: "6 hours ago", type: "success", read: false },
        { id: 4, title: "New API Token Created", message: "A new CLI access token was generated from IP 192.168.1.104.", time: "Yesterday", type: "info", read: true }
    ],

    featureBacklog: {
        mvp: [
            { id: "mvp-1", title: "Immersive 5-Screen Cinematic Scroll Story Homepage", status: "Completed", desc: "Movie-trailer style interactive scroll storytelling (`#/`) with typing terminal, threat map, 3D cards, and platform entry." },
            { id: "mvp-2", title: "Executive DevSecOps Dashboard & Real-Time Charts", status: "Completed", desc: "Handwritten pure SVG/Canvas charting engine showing weekly scans, monthly trends, and live metrics." },
            { id: "mvp-3", title: "Repository Management Center with Filters", status: "Completed", desc: "Interactive Card and Table views with instant search, language toggles, and status badges." },
            { id: "mvp-4", title: "Live Interactive Cyber Terminal Scan Center", status: "Completed", desc: "Trigger Bandit, Trivy, Gitleaks, and Full Scans with real-time terminal simulation and progress tracking." },
            { id: "mvp-5", title: "Interactive CI/CD Pipeline Flowchart Visualizer", status: "Completed", desc: "Glowing step-by-step pipeline graph (`GitHub -> Build -> Scan -> Deploy`) with clickable stage logs." },
            { id: "mvp-6", title: "Modular Architecture Ready for FastAPI/MongoDB", status: "Completed", desc: "Clean separation of state, components, pages, and mock data APIs designed for direct REST integration." }
        ],
        v1: [
            { id: "v1-1", title: "Vulnerability Explorer with AI Fix Suggestions", status: "Completed", desc: "Inspect line-by-line CVE/CWE code snippets with instant AI remediation instructions." },
            { id: "v1-2", title: "Executive Compliance Reports & JSON Preview", status: "Completed", desc: "SOC2, ISO27001, and OWASP Top 10 report cards with payload preview drawer and download simulators." },
            { id: "v1-3", title: "Immutable Security Audit Trail & IP Tracking", status: "Completed", desc: "Chronological audit logs tracking exact user actions, IPs, timestamps, and security enforcement events." },
            { id: "v1-4", title: "Role-Based Access Control (RBAC) Admin Panel", status: "Completed", desc: "Manage team roles (`Admin`, `Security Engineer`, `Developer`) and toggle granular security permissions." },
            { id: "v1-5", title: "User Profile & API Token Generator", status: "Completed", desc: "Create, copy, and manage personal access tokens (`sec_live_...`) for local CLI and CI/CD webhook triggers." }
        ],
        future: [
            { id: "fut-1", title: "Live Production FastAPI & MongoDB Backend", status: "Planned (Future)", desc: "Connect frontend reactive state to actual Python FastAPI REST endpoints (`/v1/scans`, `/v1/repos`) and MongoDB cluster." },
            { id: "fut-2", title: "Real Docker Daemon & Kubernetes Agent Integration", status: "Planned (Future)", desc: "Deploy lightweight Go agent into K8s clusters (`kube-secureops`) to stream live eBPF kernel security telemetry." },
            { id: "fut-3", title: "AI Agent Automated Pull Request Fix Generator", status: "Planned (Future)", desc: "Direct GitHub App integration that automatically commits secure code fixes directly to developer branches upon CVE discovery." },
            { id: "fut-4", title: "Offline Air-Gapped Enterprise Compliance Mode", status: "Planned (Future)", desc: "Local LLM inference model (`Ollama / Llama-3-Security`) for sensitive defense & financial environments without cloud egress." }
        ]
    }
};
