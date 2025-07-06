document.getElementById('resumeForm').addEventListener('input', updatePreview);

function updatePreview() {
  document.getElementById('prevName').textContent = document.getElementById('name').value || "Your Name";
  document.getElementById('prevContact').textContent = `${document.getElementById('email').value || "your.email@example.com"} | ${document.getElementById('phone').value || "(123) 456-7890"}`;
  document.getElementById('prevAddress').textContent = document.getElementById('address').value;
  document.getElementById('prevSummary').textContent = document.getElementById('summary').value;

  updateList('.edu', 'prevEducation');
  updateList('.skill', 'prevSkills');
  updateList('.exp', 'prevExperience');
}

function updateList(className, outputId) {
  let inputs = document.querySelectorAll(className);
  let output = document.getElementById(outputId);
  output.innerHTML = "";
  let hasContent = false;
  inputs.forEach(item => {
    if (item.value.trim() !== "") {
      hasContent = true;
      let li = document.createElement('li');
      li.textContent = item.value;
      output.appendChild(li);
    }
  });
  if (!hasContent) {
    let li = document.createElement('li');
    li.textContent = `No ${outputId.replace('prev', '').toLowerCase()} added yet.`;
    output.appendChild(li);
  }
}

function addEducation() {
  createInput("educationSection", "edu", "Degree / Institution");
}
function removeEducation() {
  removeLast("educationSection", "edu");
}

function addSkill() {
  createInput("skillsSection", "skill", "Skill *");
}
function removeSkill() {
  removeLast("skillsSection", "skill");
}

function addExperience() {
  createInput("experienceSection", "exp", "Job Title at Company");
}
function removeExperience() {
  removeLast("experienceSection", "exp");
}

function createInput(sectionId, className, placeholder) {
  let input = document.createElement("input");
  input.type = "text";
  input.className = className;
  input.placeholder = placeholder;
  input.addEventListener('input', updatePreview);
  document.getElementById(sectionId).appendChild(input);
}

function removeLast(sectionId, className) {
  let inputs = document.querySelectorAll(`#${sectionId} .${className}`);
  if (inputs.length > 1) inputs[inputs.length - 1].remove();
}

function downloadPDF() {
  const element = document.querySelector(".resume-card");
  html2pdf().from(element).save("resume.pdf");
}
