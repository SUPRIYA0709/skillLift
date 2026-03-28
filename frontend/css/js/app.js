// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      alert(data.message);
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  });
}


// ---------------- RESUME ----------------
const resumeForm = document.getElementById("resumeForm");

if (resumeForm) {
  resumeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const skills = document.getElementById("skills")?.value || "";
    const education = document.getElementById("education")?.value || "";

    try {
      await fetch("http://localhost:5000/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          skills,
          education
        })
      });

      alert("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving resume!");
    }
  });
}


// ---------------- JOB APPLICATION ----------------
const applyForm = document.getElementById("applyForm");

if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jobTitle = document.getElementById("jobTitle")?.value || "";
    const company = document.getElementById("company")?.value || "";

    try {
      await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobTitle,
          company
        })
      });

      alert("Application submitted!");
    } catch (error) {
      console.error(error);
      alert("Error submitting application!");
    }
  });
}


// ---------------- VIEW APPLICATIONS ----------------
const viewBtn = document.getElementById("viewApplications");

if (viewBtn) {
  viewBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:5000/applications");
      const data = await res.json();

      console.log("Applications:", data);
      alert("Check console for applications data");
    } catch (error) {
      console.error(error);
    }
  });
}