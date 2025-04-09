const scrollElements = document.querySelectorAll(
  'section, .left, .right, .timeline-item, .feature, .contact-links a'
);
const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};
const displayScrollElement = (el) => {
  el.classList.add('scrolled');
};
const hideScrollElement = (el) => {
  el.classList.remove('scrolled');
};
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('home-title').textContent = data.home.title;
    document.getElementById('home-intro').textContent = data.home.intro;
    document.getElementById('home-image').src = data.home.image;
    data.home.features.forEach(feature => {
      const div = document.createElement('div');
      div.className = 'feature';
      div.textContent = feature;
      document.getElementById('home-features').appendChild(div);
    });
    data.home.links.forEach(link => {
      const a = document.createElement('a');
      a.textContent = link;
      a.href = '#';
      document.getElementById('home-links').appendChild(a);
    });
    document.getElementById('about-intro').textContent = data.about.intro;
    document.getElementById('about-tech').textContent = data.about.tech;
    data.about.sections.forEach(section => {
      const h4 = document.createElement('h4');
      h4.textContent = section.heading;
      document.getElementById('about-sections').appendChild(h4);
      if (section.text) {
        const p = document.createElement('p');
        p.textContent = section.text;
        document.getElementById('about-sections').appendChild(p);
      }
      if (section.list) {
        const ul = document.createElement('ul');
        section.list.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        document.getElementById('about-sections').appendChild(ul);
      }
    });
    data.education.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">
              <h3>${item.degree}</h3>
              <p>${item.institution}</p>
              <p>${item.description}</p>
            </div>
          `;
      document.getElementById('education-list').appendChild(div);
    });
    data.skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill';
      div.innerHTML = `
            <label>${skill.name}</label>
            <input type="range" min="0" max="100" value="${skill.level}" disabled>
          `;
      document.getElementById('skills-list').appendChild(div);
    });
    document.getElementById('projects-title').textContent = data.projects.title;
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        renderProjects(data.projects.items);
      });
    function renderProjects(projects) {
      const container = document.querySelector('.project-grid');
      if (!projects || !container) return;
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <p class="project-tech">${project.tech.join(', ')}</p>
          <div class="project-links">
            <a href="${project.github}" target="_blank">GitHub</a>
            <a href="${project.live}" target="_blank">Live</a>
          </div>
        </div>
      `;
        container.appendChild(card);
      });
    }
    document.getElementById('contact-title').textContent = data.contact.title;
    document.getElementById('contact-form').action = data.contact.formAction;

    data.contact.methods.forEach(method => {
      const a = document.createElement('a');
      a.href = method.href;
      a.target = '_blank';
      a.textContent = method.text;
      document.getElementById('contact-links').appendChild(a);
    });
  });
