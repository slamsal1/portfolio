---
layout: page
title: About
permalink: /about/
weight: 3
---

<section class="about-intro">
  <h1 class="about-title">About Me</h1>
  <p class="about-greeting">Hi, I am <span class="highlight">{{ site.author.name }}</span> <span class="wave">👋</span></p>
  <p>Lorem ipsum dolor sit amet, consectetur</p>
</section>

<section class="skills-section">
  <h2 class="section-title">Skills</h2>
  <div class="skills-grid">
    {% include about/skills.html title="Programming Skills" source=site.data.programming-skills %}
    {% include about/skills.html title="Design Skills" source=site.data.design-skills %}
    {% include about/skills.html title="Other Skills" source=site.data.other-skills %}
    <!-- Add more skill sections as needed -->
  </div>
</section>

<section class="timeline-section">
  <h2 class="section-title">Experience & Education</h2>
  <div class="timelines-container">
    <div class="timeline-column">
      <h3 class="timeline-title">Work Experience</h3>
      {% include about/timeline.html source=site.data.work-timeline %}
    </div>
    <div class="timeline-column">
      <h3 class="timeline-title">Education</h3>
      {% include about/timeline.html source=site.data.education-timeline %}
    </div>
  </div>
</section>