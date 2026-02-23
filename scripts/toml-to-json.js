const fs = require("fs");
const toml = require("toml");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const jsonPath = path.join(dataDir, "../generated/resume.json");

try {
  // Read and parse each TOML file
  const bioContent = fs.readFileSync(path.join(dataDir, "bio.toml"), "utf-8");
  const jobsContent = fs.readFileSync(path.join(dataDir, "jobs.toml"), "utf-8");
  const educationContent = fs.readFileSync(
    path.join(dataDir, "education.toml"),
    "utf-8"
  );
  const skillsContent = fs.readFileSync(
    path.join(dataDir, "skills.toml"),
    "utf-8"
  );
  const publicationsContent = fs.readFileSync(
    path.join(dataDir, "publications.toml"),
    "utf-8"
  );

  const bio = toml.parse(bioContent);
  const jobs = toml.parse(jobsContent);
  const education = toml.parse(educationContent);
  const skills = toml.parse(skillsContent);
  const publications = toml.parse(publicationsContent);

  // Merge into a single object
  const mergedData = {
    name: bio.name,
    title: bio.title,
    bio: bio.bio,
    jobs: jobs.jobs,
    education: education.education,
    skills: skills.skills,
    publications: publications.publications,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(mergedData, null, 2));
  console.log("Successfully merged TOML files and created resume.json");
} catch (e) {
  console.error("Error converting TOML to JSON:", e);
  process.exit(1);
}
