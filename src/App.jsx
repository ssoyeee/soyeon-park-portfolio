import { useState, useRef, useEffect } from "react";

/* eslint-disable */

const teal = "#0D9E75";
const tealLight = "#E1F5EE";

const PROFILE = `You are an AI assistant on Soyeon Park's developer portfolio website. Answer questions about Soyeon professionally and concisely on her behalf. Here is her background:

NAME: Soyeon Park
TITLE: Full-stack Software Engineer
LOCATION: NJ/NYC area
EMAIL: soyeon.park.dev@gmail.com
LINKEDIN: soyeon-park-dev
GITHUB: ssoyeee

WORK EXPERIENCE:
1. Software Engineer, Electronics & Appliance Services Company (Oct 2022 – Jun 2025, New York, NY)
- Backend services with Python, FastAPI, Flask, PostgreSQL, REST APIs; improved query efficiency up to 10%
- Microservices on AWS EC2, Lambda, Docker; monitored with CloudWatch
- Full-stack features with React, Node.js, GraphQL, MongoDB; improved scheduling efficiency 15% for 15+ technicians
- Real-time features with Redis and WebSockets for field technician/dispatch/customer communication
- 80%+ automated test coverage with Jest and Selenium; CI/CD with GitHub Actions and Docker

2. Systems Engineer, Logistics & Supply Chain Company (Jan 2019 – Dec 2019, Little Ferry, NJ)
- Deployed next-gen Cisco and Fortinet network security infrastructure at 50+ locations
- Improved network reliability and productivity 15% in corporate warehouses
- Resolved 95% of incidents within SLA targets

3. Software QA Engineer Intern, Gaming & Entertainment Company (May 2018 – Aug 2018, Korea)
- Helped achieve 1M+ app downloads across 90+ countries by resolving 36 pre-launch bugs
- Designed 3 live service enterprise applications

4. AI Research Software Engineer, AI & Computer Vision Lab (Sep 2016 – Dec 2017, Korea)
- Improved imbalanced datasets by 86% using CNN and TensorFlow
- Mentored 4 trainees in ML and neural networks

EDUCATION:
- Monroe University, MS Computer Science, GPA 3.95, June 2022
- Tech University of Korea, BS Computer Engineering, February 2018

CERTIFICATIONS:
- AWS Certified Cloud Practitioner (July 2023)

SKILLS:
Languages: Python, Java, JavaScript, HTML/CSS
Databases: PostgreSQL, MongoDB, MySQL, SQL, Oracle
Web/Backend: FastAPI, Flask, Node.js, Express, React, GraphQL, WebSockets, REST APIs, Socket.IO, WebRTC
Tools: AWS (EC2, Lambda, CloudWatch), Docker, Git, Redis, Firebase, Selenium, Linux/Bash

PROJECTS:
1. Real-time Dispatch System — Redis & WebSockets for instant communication between field technicians, dispatch, and customers
2. Fitness Tracking Android App — real-time pose detection with MediaPipe & TensorFlowLite (Java, Kotlin, Python)
3. Pet Health Management Android App — BLE IoT app with barking recognition & step counter (Java, Firebase)
4. Real-time Chat Android App — live messaging app (Android)
5. AI Movement Detection App — pose tracking in real-time video (Android, TensorFlow)
6. Video Calling Web App — WebRTC & WebSockets based video conferencing
7. Job Search Automation Tool — web scraper (Beautiful Soup, Selenium, Flask)
8. Productivity Chrome Extension — browser extension to support productivity and motivation
9. Developer Portfolio — this site

When answering questions about experience, write in natural, conversational English as if a colleague is describing Soyeon's career. Summarize in flowing sentences grouped by role. Bold each role title using **Role Title** markdown syntax, and insert TWO blank lines between each company/role. Write the way a native English speaker would naturally explain someone's work history.

When someone asks how to contact Soyeon, respond with a short friendly sentence then list:
- Email: [soyeon.park.dev@gmail.com](mailto:soyeon.park.dev@gmail.com)
- LinkedIn: [soyeon-park-dev](https://linkedin.com/in/soyeon-park-dev)
- GitHub: [ssoyeee](https://github.com/ssoyeee)


Open to new opportunities. Feel free to reach out.

For all other questions, keep answers brief, clear, and professional. Only answer questions about Soyeon's professional background. If asked something unrelated, politely redirect.`;

const NAV = ["Home", "About", "Experience", "Skills", "Projects", "Chat", "Contact"];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Electronics & Appliance Services",
    period: "Oct 2022 – Jun 2025",
    location: "New York, NY",
    bullets: [
      "Backend services with Python, FastAPI, Flask, and PostgreSQL; improved query efficiency up to 10%",
      "Microservices deployed on AWS EC2, Lambda, and Docker with CloudWatch monitoring",
      "Full-stack features with React, GraphQL, and MongoDB; improved scheduling efficiency 15% for 15+ technicians",
      "Real-time communication system using Redis and WebSockets for dispatch and field teams",
      "80%+ automated test coverage with Jest and Selenium; CI/CD via GitHub Actions",
    ],
  },
  {
    role: "Systems Engineer",
    company: "Logistics & Supply Chain",
    period: "Jan 2019 – Dec 2019",
    location: "Little Ferry, NJ",
    bullets: [
      "Deployed next-gen Cisco and Fortinet network security at 50+ locations",
      "Improved network reliability and productivity by 15% in corporate warehouses",
      "Resolved 95% of incidents within SLA targets through on-call rotations",
    ],
  },
  {
    role: "Software QA Engineer Intern",
    company: "Gaming & Entertainment",
    period: "May 2018 – Aug 2018",
    location: "Korea",
    bullets: [
      "Contributed to 1M+ app downloads across 90+ countries by resolving 36 pre-launch bugs",
      "Designed 3 live service enterprise applications following company design principles",
    ],
  },
  {
    role: "AI Research Software Engineer",
    company: "AI & Computer Vision Lab",
    period: "Sep 2016 – Dec 2017",
    location: "Korea",
    bullets: [
      "Improved imbalanced datasets by 86% using CNN and TensorFlow data augmentation",
      "Mentored 4 trainees in machine learning, neural networks, and image processing",
    ],
  },
];

const SKILLS = {
  Languages: ["Python", "Java", "JavaScript", "HTML/CSS"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Oracle"],
  "Backend & Web": ["FastAPI", "Flask", "Node.js", "Express", "GraphQL", "REST APIs", "WebSockets", "WebRTC"],
  Frontend: ["React", "Socket.IO", "Webpack"],
  "Tools & Cloud": ["AWS", "Docker", "Git", "Redis", "Firebase", "Selenium", "Linux/Bash"],
};

const PROJECTS = [
  { title: "Real-time Dispatch System", tags: ["Redis", "WebSockets", "FastAPI"], desc: "Instant communication platform between field technicians, dispatch team, and customers for appointment and repair status updates.", type: "Backend" },
  { title: "Fitness Tracking Android App", tags: ["Java", "Kotlin", "MediaPipe", "TensorFlowLite"], desc: "Real-time pose detection with visual movement feedback using ML-based body tracking.", type: "Mobile" },
  { title: "Pet Health Management App", tags: ["Java", "Firebase", "BLE IoT"], desc: "Android app managing pet health via Bluetooth Low Energy with barking recognition and activity tracking.", type: "Mobile" },
  { title: "Real-time Chat Android App", tags: ["Android", "WebSockets"], desc: "Live messaging app enabling real-time communication between users.", type: "Mobile" },
  { title: "AI Movement Detection App", tags: ["Android", "TensorFlow", "Computer Vision"], desc: "Pose detection and movement tracking in real-time video using AI models.", type: "AI" },
  { title: "Video Calling Web App", tags: ["WebRTC", "WebSockets", "Node.js"], desc: "Peer-to-peer video conferencing application built with WebRTC and real-time signaling.", type: "Web" },
  { title: "Job Search Automation Tool", tags: ["Python", "Selenium", "Flask", "Beautiful Soup"], desc: "Web scraper that aggregates job listings and surfaces relevant opportunities.", type: "Web" },
  { title: "Productivity Chrome Extension", tags: ["JavaScript", "Chrome API"], desc: "Browser extension designed to help users stay motivated and on task.", type: "Web" },
  { title: "Developer Portfolio", tags: ["React", "JavaScript"], desc: "This portfolio site showcasing projects, experience, and skills.", type: "Web" },
];

const SUGGESTIONS = [
  "What's her tech stack?",
  "Tell me about her experience",
  "What projects has she built?",
  "How can I get in touch with her?",
];

function renderText(text) {
  return text.split("\n").map((line, j) => {
    const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return (
      <p key={j} style={{ margin: "2px 0" }}>
        {parts.map((p, k) => {
          if (/^\*\*(.*)\*\*$/.test(p)) return <strong key={k}>{p.slice(2, -2)}</strong>;
          const lm = p.match(/^\[(.*?)\]\((.*?)\)$/);
          if (lm) return <a key={k} href={lm[2]} target="_blank" rel="noreferrer" style={{ color: teal }}>{lm[1]}</a>;
          return p;
        })}
      </p>
    );
  });
}

function SectionLabel({ text }) {
  return (
    <p style={{ fontSize: 12, letterSpacing: "0.1em", color: teal, textTransform: "uppercase", margin: "0 0 8px", fontWeight: 500 }}>
      {text}
    </p>
  );
}

function HomeSection({ setActive, visitorCount }) {
  return (
    <div style={{ minHeight: "72vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 16, position: "relative" }}>
      <p style={{ fontSize: 13, letterSpacing: "0.12em", color: teal, textTransform: "uppercase", margin: 0, fontWeight: 500 }}>Full-stack Software Engineer</p>
      <h1 style={{ fontSize: 52, fontWeight: 500, margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>Soyeon Park</h1>
      <p style={{ fontSize: 14, color: "#888", margin: 0 }}>New York</p>
      <div style={{ width: 40, height: 3, borderRadius: 2, background: teal, margin: "8px 0" }} />
      <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setActive("Chat")} style={{ padding: "10px 28px", borderRadius: 24, border: "none", background: teal, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>Chat with AI</button>
        <button onClick={() => setActive("Projects")} style={{ padding: "10px 28px", borderRadius: 24, border: `1.5px solid ${teal}`, background: "transparent", color: teal, cursor: "pointer", fontSize: 14 }}>View Projects</button>
        <button onClick={() => setActive("Contact")} style={{ padding: "10px 28px", borderRadius: 24, border: "1px solid #ddd", background: "transparent", color: "#333", cursor: "pointer", fontSize: 14 }}>Contact</button>
      </div>
      {visitorCount !== null && (
        <div style={{ position: "absolute", bottom: 0, right: 0, display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: "1px solid #eee", background: "#f9f9f9" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: teal, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "#888" }}>{visitorCount.toLocaleString()} {visitorCount === 1 ? "visit" : "visits"}</span>
        </div>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <SectionLabel text="About me" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 24, lineHeight: 1.2 }}>Building systems that work in real time.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: "#555", marginBottom: 32 }}>
        I'm a full-stack software engineer who builds scalable APIs and real-time systems, based in the NJ/NYC area. I hold a Master's degree in Computer Science from Monroe University and enjoy solving practical problems through clean, well-structured code.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[["MS Computer Science", "Monroe University"], ["BS Computer Engineering", "Tech University of Korea"]].map(([t, s]) => (
          <div key={t} style={{ background: tealLight, borderRadius: 12, padding: "16px 18px" }}>
            <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 4px", color: "#085041" }}>{t}</p>
            <p style={{ fontSize: 13, color: "#0F6E56", margin: 0 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <SectionLabel text="Career" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 28, lineHeight: 1.2 }}>Experience</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {EXPERIENCE.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 20, paddingBottom: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: teal, flexShrink: 0, marginTop: 5 }} />
              {i < EXPERIENCE.length - 1 && <div style={{ width: 2, flex: 1, background: tealLight, marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                <p style={{ fontWeight: 500, fontSize: 15, margin: 0 }}>{e.role}</p>
                <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 12, background: tealLight, color: "#085041" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: 13, color: "#777", margin: "0 0 12px" }}>{e.company} · {e.location}</p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 3 }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <SectionLabel text="Tech stack" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 28, lineHeight: 1.2 }}>Skills</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat}>
            <p style={{ fontSize: 12, fontWeight: 500, color: teal, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map(s => (
                <span key={s} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 20, border: `1px solid ${teal}33`, background: tealLight, color: "#085041" }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const types = ["All", "Backend", "Web", "Mobile", "AI"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.type === filter);
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <SectionLabel text="Work" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 20, lineHeight: 1.2 }}>Projects</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ padding: "6px 16px", borderRadius: 20, border: filter === t ? `1.5px solid ${teal}` : "1px solid #ddd", background: filter === t ? tealLight : "transparent", color: filter === t ? "#085041" : "#666", cursor: "pointer", fontSize: 13 }}>{t}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map((p, i) => (
          <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ background: hovered === i ? tealLight : "#fff", border: hovered === i ? `1.5px solid ${teal}` : "1px solid #eee", borderRadius: 14, padding: "20px 22px", transition: "all 0.18s", cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <p style={{ fontWeight: 500, fontSize: 15, margin: 0, lineHeight: 1.4 }}>{p.title}</p>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: hovered === i ? "#fff" : "#f5f5f5", color: hovered === i ? "#085041" : "#999", whiteSpace: "nowrap", marginLeft: 8 }}>{p.type}</span>
            </div>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: "0 0 14px" }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tags.map(t => (
                <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 12, background: hovered === i ? "#fff" : "#f5f5f5", color: hovered === i ? "#085041" : "#999" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatSection() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm an AI assistant for Soyeon.\nAsk me anything about her background and experience." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(q) {
    const question = q || input.trim();
    if (!question || loading) return;
    if (!q) setInput("");
    const history = messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
    setMessages(m => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: PROFILE,
          messages: [...history, { role: "user", content: question }]
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Sorry, I couldn't get a response.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <SectionLabel text="AI assistant" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 20, lineHeight: 1.2 }}>Ask about Soyeon</h2>
      <div style={{ border: "1px solid #eee", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ height: 380, overflowY: "auto", padding: "20px 20px 12px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: 14, background: m.role === "user" ? tealLight : "#f5f5f5", color: m.role === "user" ? "#085041" : "#1a1a1a", fontSize: 14, lineHeight: 1.6 }}>
                {m.role === "assistant" ? renderText(m.text) : m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "#f5f5f5", color: "#999", fontSize: 14 }}>Thinking...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div style={{ borderTop: "1px solid #eee", padding: "12px 16px", display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask a question..." style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: `1px solid ${teal}44`, fontSize: 14, outline: "none" }} />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ padding: "8px 20px", borderRadius: 20, border: "none", background: teal, color: "#fff", cursor: "pointer", fontSize: 14, opacity: loading || !input.trim() ? 0.5 : 1 }}>Send</button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        {SUGGESTIONS.map(q => (
          <button key={q} onClick={() => sendMessage(q)} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 20, border: `1px solid ${teal}44`, background: tealLight, color: "#085041", cursor: "pointer" }}>{q}</button>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <SectionLabel text="Get in touch" />
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 12, lineHeight: 1.2 }}>Contact</h2>
      <p style={{ fontSize: 15, color: "#666", marginBottom: 32 }}>Open to new opportunities. Feel free to reach out.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          ["Email", "soyeon.park.dev@gmail.com", "mailto:soyeon.park.dev@gmail.com"],
          ["LinkedIn", "soyeon-park-dev", "https://linkedin.com/in/soyeon-park-dev"],
          ["GitHub", "ssoyeee", "https://github.com/ssoyeee"],
        ].map(([label, val, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#fff", border: "1px solid #eee", borderRadius: 14, textDecoration: "none" }}>
            <span style={{ fontSize: 13, color: "#999" }}>{label}</span>
            <span style={{ fontSize: 14, color: teal }}>{val}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    // Simple visitor counter using localStorage for deployed version
    const key = "portfolio_visit_count";
    const count = parseInt(localStorage.getItem(key) || "0") + 1;
    localStorage.setItem(key, String(count));
    setVisitorCount(count);
  }, []);

  const renderSection = () => {
    switch (active) {
      case "Home": return <HomeSection setActive={setActive} visitorCount={visitorCount} />;
      case "About": return <AboutSection />;
      case "Experience": return <ExperienceSection />;
      case "Skills": return <SkillsSection />;
      case "Projects": return <ProjectsSection />;
      case "Chat": return <ChatSection />;
      case "Contact": return <ContactSection />;
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh", background: "#fff", color: "#1a1a1a" }}>
      <nav style={{ borderBottom: "1px solid #eee", padding: "0 24px", display: "flex", alignItems: "center", gap: 4, position: "sticky", top: 0, background: "#fff", zIndex: 10, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 500, fontSize: 15, color: teal, marginRight: 16, padding: "14px 0" }}>Soyeon Park</span>
        {NAV.map(n => (
          <button key={n} onClick={() => setActive(n)} style={{ padding: "14px 12px", fontSize: 13, border: "none", background: "transparent", color: active === n ? "#1a1a1a" : "#999", cursor: "pointer", fontWeight: active === n ? 500 : 400, position: "relative" }}>
            {n}
            {active === n && (
              <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 2, background: teal, borderRadius: 2 }} />
            )}
          </button>
        ))}
      </nav>
      <main style={{ padding: "56px 24px 80px" }}>
        {renderSection()}
      </main>
    </div>
  );
}