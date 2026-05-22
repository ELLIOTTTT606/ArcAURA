import { navigate, bindNavLinks } from './core/navigation.js';
import { bindModal }              from './core/modal.js';
import { showRisksInCell }        from './pages/risks.js';
import { showCarbonDetail }       from './pages/carbon.js';

const PAGES = ['home', 'budget', 'gantt', 'communication', 'risks', 'carbon', 'annexes', 'business-kit'];

async function loadPages() {
  const root = document.getElementById('app');
  if (!root) throw new Error('Missing #app root');

  const htmls = await Promise.all(
    PAGES.map(name => fetch(`pages/${name}.html`).then(r => r.text()))
  );
  root.innerHTML = htmls.join('\n');
}

function exposeInlineHandlers() {
  // The original matrix cells and doughnut slices use inline onclick="..."
  // attributes that reference these names on `window`. Preserved verbatim.
  window.showRisksInCell  = showRisksInCell;
  window.showCarbonDetail = showCarbonDetail;
}

async function bootstrap() {
  await loadPages();
  exposeInlineHandlers();
  bindNavLinks();
  bindModal();

  // Support deep-linking from annexes.html: index.html#budget → navigate directly
  const hash = window.location.hash.slice(1);
  const validPages = ['budget', 'gantt', 'comm', 'risks', 'carbon'];
  if (hash && validPages.includes(hash)) {
    navigate(hash);
  } else {
    navigate('home');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
