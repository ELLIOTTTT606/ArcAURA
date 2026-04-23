export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
  return el;
}
