const orb = document.querySelector('.cursor-orb');
window.addEventListener('pointermove', (event) => {
  orb.style.left = `${event.clientX}px`;
  orb.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const modeCopy = {
  fun: {
    'header-note': 'a portfolio / a lab / a tiny career crisis',
    'hero-title': 'the human<br /><em>layer</em> between<br />you &amp; AI.',
    'hero-intro': 'I used to bring the intelligence to the table. Then the table got an LLM. So now I bring context, taste, and the occasional good idea.',
    'hero-primary': 'what I can do <span>↓</span>',
    'hero-secondary': 'read the situation <span>↘</span>',
    'art-caption': 'human-in-the-loop<br />loop-in-the-human',
    'marquee-copy': '<span>build weird useful things</span><b>✳</b><span>build weird useful things</span><b>✳</b><span>build weird useful things</span><b>✳</b>',
    'manifesto-title': 'Nobody knows<br /><span>what happens next.</span>',
    'manifesto-copy': '<p>Not the companies. Not the LLMs. Definitely not me. In two years, software engineering might be a job, a button, or a very confident autocomplete.</p><p>For now, I am the person between the big idea and the blinking cursor. I ask the boring questions. I make the things work. I explain what the robot meant.</p><p class="hand-note">— seems like a fair trade, tbh</p>',
    'quote-text': 'Jack of all trades.<br /><strong>Master of shipping.</strong>',
    'quote-by': 'a slightly updated proverb',
    'offer-title': 'Need an engineer?',
    'offer-subtitle': 'Cool. I am accepting applications from problems.',
    'offer-card-title-1': 'Tell me the thing.',
    'offer-card-copy-1': 'A product, a mess, a half-formed thought, a dashboard that should have been an email. I will turn it into something that runs.',
    'offer-card-title-2': 'First 20M tokens<br /><em>are on me.</em>',
    'offer-card-copy-2': 'freengineer support, with a freemium-ish catch. After that, you pay for the tokens I use. That is the whole pricing page.',
    'offer-card-title-3': 'Tip if you want.',
    'offer-card-copy-3': 'I keep the lessons, not your secrets. Your project helps build my resume repo. Your data stays yours. Pinky promise, but professional.',
    'stack-title': 'AWS once.<br /><span>Data always.<br /><em>Anything next.</em></span>',
    'stack-blurb': 'Clouds, pipelines, event-driven things, backends, extensions, batch jobs — I have touched most corners of software and left fingerprints on the rest.',
    'stack-tags': '<span>cloud</span><span>data</span><span>backend</span><span>events</span><span>automation</span><span>whatever works</span>',
    'closing-title': 'Let’s make something<br /><em>slightly unreasonable.</em>',
    'closing-primary': 'start a conversation <span>↘</span>'
  },
  professional: {
    'header-note': 'software engineering / data systems / applied AI',
    'hero-title': 'software<br /><em>engineering</em><br />with a human edge.',
    'hero-intro': 'I help teams turn ambiguous ideas into reliable software — from data platforms and event-driven systems to practical AI-assisted products.',
    'hero-primary': 'view capabilities <span>↓</span>',
    'hero-secondary': 'read the approach <span>↘</span>',
    'art-caption': 'strategy → systems<br />systems → outcomes',
    'marquee-copy': '<span>clear systems / useful software</span><b>✦</b><span>clear systems / useful software</span><b>✦</b><span>clear systems / useful software</span><b>✦</b>',
    'manifesto-title': 'Engineering for<br /><span>the next phase.</span>',
    'manifesto-copy': '<p>Software is changing quickly. The useful skill is no longer only writing code; it is knowing what to build, what to automate, and where human judgment still matters.</p><p>I work as a hands-on engineering partner across architecture, data, backend systems, automation, and applied AI. The goal is simple: clear decisions and working software.</p><p class="hand-note">— practical systems, thoughtful execution</p>',
    'quote-text': 'Broad technical range.<br /><strong>Focused on outcomes.</strong>',
    'quote-by': 'the working principle',
    'offer-title': 'Have a technical problem?',
    'offer-subtitle': 'Bring the context. I will help shape the path to a working solution.',
    'offer-card-title-1': 'Scope the opportunity.',
    'offer-card-copy-1': 'We clarify the problem, constraints, users, and the smallest useful version. This is where ideas become an engineering plan.',
    'offer-card-title-2': 'Build the right layer<br /><em>at the right speed.</em>',
    'offer-card-copy-2': 'I can contribute across cloud infrastructure, data engineering, backend services, event-driven workflows, extensions, and AI-enabled tools.',
    'offer-card-title-3': 'Leave it clearer.',
    'offer-card-copy-3': 'You get working software, documented decisions, and a system your team can understand and continue to improve.',
    'stack-title': 'Cloud systems.<br /><span>Data products.<br /><em>Applied AI.</em></span>',
    'stack-blurb': 'Experience across AWS, data processing, event-driven architecture, backend development, automation, browser extensions, and AI-assisted engineering workflows.',
    'stack-tags': '<span>AWS</span><span>data platforms</span><span>backend</span><span>event systems</span><span>applied AI</span><span>architecture</span>',
    'closing-title': 'Let’s build something<br /><em>worth maintaining.</em>',
    'closing-primary': 'start a conversation <span>↘</span>'
  }
};

document.querySelectorAll('.mode-button').forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    document.querySelectorAll('.mode-button').forEach((item) => item.classList.toggle('is-active', item === button));
    Object.entries(modeCopy[mode]).forEach(([id, content]) => {
      document.getElementById(id).innerHTML = content;
    });
    document.body.dataset.mode = mode;
  });
});

const savedTheme = localStorage.getItem('freengineer-theme') || 'light';
document.body.dataset.theme = savedTheme;
document.querySelectorAll('.theme-button').forEach((button) => {
  button.classList.toggle('is-active', button.dataset.themeChoice === savedTheme);
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    document.body.dataset.theme = theme;
    localStorage.setItem('freengineer-theme', theme);
    document.querySelectorAll('.theme-button').forEach((item) => item.classList.toggle('is-active', item === button));
  });
});
