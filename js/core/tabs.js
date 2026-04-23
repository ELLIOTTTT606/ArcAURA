export function attachTabs(containerId) {
  const root = document.getElementById(containerId);
  if (!root) return;

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;

    const parent = tab.closest('.tabs');
    parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const wrapper = parent.parentElement;
    wrapper.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

    const target = wrapper.querySelector('#' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
}
