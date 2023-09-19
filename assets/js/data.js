function getSkills() {
    fetch("./assets/json/skills.json")
        .then(res => res.json())
        .then(res => {
            for (let key in res) {
                let listHTML = '';
                res[key].forEach(name => {
                    listHTML += `<li>${name}</li>`;
                });

                document.querySelector(`section.skill .content.${key} ul`).innerHTML = listHTML;
            }
        })
        .catch(e => console.error(e));
}

function getProjects() {
    fetch("./assets/json/projects.json")
        .then(res => res.json())
        .then(res => {
            let listHTML = '';
            res.forEach(project => {
                listHTML += `
                    <div class="col-sm-12 col-lg-6 col-4">
                        <div class="content-container">
                            <img src="./assets/images/projects/${project.image}" alt="Project Image">
                            <div class="content">
                                <div class="name">${project.company} <span>(${project.startYear} - ${project.endYear})</span></div>
                                <div class="description">
                                    <div class="about">
                                        <span>About</span>
                                        <span>${project.about}</span>
                                    </div>
                                    <div class="bottom">
                                        <div class="position">
                                            <span>Position</span>
                                            <span>${project.position}</span>
                                        </div>
                                        ${
                                            project.url ?
                                                `<div class="button-container">
                                                    <a href="${project.url}" target="_blank">
                                                        Visit <i class="fas fa-chevron-right"></i>
                                                    </a>
                                                </div>` : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.querySelector("section.project .list").innerHTML = listHTML;
        })
        .catch(e => console.error(e));
}

function getEducations() {
    fetch("./assets/json/educations.json")
        .then(res => res.json())
        .then(res => {
            let listHTML = '';
            res.forEach(education => {
                listHTML += `
                    <div class="content-container">
                        <img src="./assets/images/educations/${education.image}" alt="Education Image">
                        <div class="content">
                            <div class="name">${education.name}</div>
                            <div class="organization">${education.degree}, ${education.major}</div>
                            <div class="date">${education.startDate} - ${education.endDate}</div>
                        </div>
                    </div>
                `;
            });

            document.querySelector("section.education .list").innerHTML = listHTML;
        })
        .catch(e => console.error(e));
}

function getCertifications() {
    fetch("./assets/json/certifications.json")
        .then(res => res.json())
        .then(res => {
            let listHTML = menuHTML = contentHTML = '';
            res.forEach((certification, i) => {
                listHTML += `<input type="radio" name="accomplishment" id="accomplishment-${certification.id}" ${i ? '' : 'checked'}>`;
                menuHTML += `
                    <label for="accomplishment-${certification.id}">
                        <span></span>
                        ${certification.date}
                    </label>
                `;
                contentHTML += `
                    <div class="content-${certification.id}">
                        <img src="./assets/images/organizations/${certification.organizationImage}" alt="Project Image">
                        <div>
                            <div class="name">${certification.name}</div>
                            <div class="organization">${certification.organization}</div>
                            <div class="date">Issued <span>${certification.date}</span></div>
                            <div class="certificate-container">
                                <button class="btn-certificate">
                                    Show Certificate <i class="fa-solid fa-circle-chevron-down"></i>
                                </button>
                                <img src="./assets/images/certificates/${certification.image}"
                                     alt="Certificate Image"
                                />
                            </div>
                        </div>
                    </div>
                `;
            });

            const listEl = document.querySelector("section.accomplishment .list");
            listEl.innerHTML = listHTML + listEl.innerHTML;

            listEl.querySelector(".menu").innerHTML = menuHTML;
            listEl.querySelector(".content > div").innerHTML = contentHTML;
        })
        .catch(e => console.error(e));
}