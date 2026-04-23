import { initBudget } from '../pages/budget.js';
import { initGantt }  from '../pages/gantt.js';
import { initComm }   from '../pages/communication.js';
import { initRisks }  from '../pages/risks.js';
import { initCarbon } from '../pages/carbon.js';

const initialized = Object.create(null);

const initializers = {
  budget: initBudget,
  gantt:  initGantt,
  comm:   initComm,
  risks:  initRisks,
  carbon: initCarbon,
};

export function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');
  window.scrollTo(0, 0);

  const init = initializers[pageId];
  if (init && !initialized[pageId]) {
    init();
    initialized[pageId] = true;
  }
}

export function bindNavLinks(root = document) {
  root.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-nav]');
    if (!trigger) return;
    e.preventDefault();
    navigate(trigger.dataset.nav);
  });
}
