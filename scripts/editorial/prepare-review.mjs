#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createReviewManifest } from './review-manifest.mjs'

const input = resolve(process.argv[2] || 'editorial/drafts/geografia-p2.json')
const output = resolve(process.argv[3] || 'editorial/reviews/geografia-p2.html')
const draft = JSON.parse(await readFile(input, 'utf8'))
const manifest = createReviewManifest(draft)
const embedded = JSON.stringify({ draft, manifest }).replaceAll('<', '\\u003c')

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Revisão editorial — ${draft.title}</title>
  <style>
    :root{font-family:Inter,system-ui,sans-serif;color:#243047;background:#f5f7fb}*{box-sizing:border-box}body{margin:0}header{position:sticky;top:0;z-index:2;background:#fff;border-bottom:1px solid #dfe5ef;padding:16px}main{max-width:880px;margin:auto;padding:20px}.toolbar{max-width:880px;margin:auto;display:flex;gap:12px;align-items:center;flex-wrap:wrap}.progress{font-weight:800;color:#42526e}.question{background:#fff;border:2px solid #dfe5ef;border-radius:18px;padding:20px;margin:16px 0}.question.approved{border-color:#37a169}.question.changes_requested{border-color:#e53e3e}.meta{color:#667085;font-size:13px}.option,.pair{padding:9px 12px;margin:6px 0;background:#f7f9fc;border-radius:10px}.correct{background:#dff7e7;color:#176b3a;font-weight:700}.actions{display:flex;gap:8px;margin-top:14px}.actions button,.download{border:0;border-radius:10px;padding:10px 14px;font-weight:750;cursor:pointer}.approve{background:#dff7e7;color:#176b3a}.change{background:#ffe5e5;color:#a82020}.download{background:#5267df;color:#fff}.comment{width:100%;margin-top:10px;padding:10px;border:1px solid #cbd5e1;border-radius:10px}input{padding:10px;border:1px solid #cbd5e1;border-radius:10px}button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:600px){main{padding:12px}.question{padding:15px}}
  </style>
</head>
<body>
  <header><div class="toolbar"><strong>${draft.title}</strong><span class="progress" id="progress"></span><input id="reviewer" placeholder="Seu nome"><button class="download" id="download" disabled>Exportar revisão</button></div></header>
  <main><p>Confira enunciado, resposta, explicação e fonte. Todas as 60 questões precisam de uma decisão. Itens com ajuste solicitado não podem ser publicados.</p><div id="questions"></div></main>
  <script type="application/json" id="payload">${embedded}</script>
  <script>
    const {draft,manifest}=JSON.parse(document.querySelector('#payload').textContent);const root=document.querySelector('#questions');
    const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    function render(){root.innerHTML=draft.questions.map((q,index)=>{const review=manifest.decisions[q.id];const answer=q.type==='multipleChoice'?q.options.map((o,i)=>\`<div class="option \${i===q.correctIndex?'correct':''}">\${String.fromCharCode(65+i)}. \${escapeHtml(o)}</div>\`).join(''):q.pairs.map(p=>\`<div class="pair"><b>\${escapeHtml(p.left)}</b> → \${escapeHtml(p.right)}</div>\`).join('');return \`<article class="question \${review.decision}" data-id="\${q.id}"><div class="meta">\${index+1}/\${draft.questions.length} · \${q.id} · \${q.type} · \${q.difficulty}</div><h2>\${escapeHtml(q.question)}</h2>\${answer}<p><b>Explicação:</b> \${escapeHtml(q.explanation)}</p><p class="meta"><b>Fonte:</b> \${escapeHtml(q.sourceRef.section)} · p. \${escapeHtml(q.sourceRef.pages)}</p><div class="actions"><button class="approve" data-decision="approved">Aprovar</button><button class="change" data-decision="changes_requested">Pedir ajuste</button></div><textarea class="comment" placeholder="Comentário opcional">\${escapeHtml(review.comment)}</textarea></article>\`}).join('');updateProgress()}
    function updateProgress(){const entries=Object.values(manifest.decisions);const done=entries.filter(x=>x.decision!=='pending').length;document.querySelector('#progress').textContent=\`\${done}/\${entries.length} revisadas\`;document.querySelector('#download').disabled=done!==entries.length||!document.querySelector('#reviewer').value.trim()}
    root.addEventListener('click',event=>{const decision=event.target.dataset.decision;if(!decision)return;const card=event.target.closest('[data-id]');manifest.decisions[card.dataset.id].decision=decision;render()});
    root.addEventListener('input',event=>{if(!event.target.classList.contains('comment'))return;manifest.decisions[event.target.closest('[data-id]').dataset.id].comment=event.target.value});
    document.querySelector('#reviewer').addEventListener('input',updateProgress);
    document.querySelector('#download').addEventListener('click',()=>{manifest.reviewer=document.querySelector('#reviewer').value.trim();manifest.reviewedAt=new Date().toISOString();const blob=new Blob([JSON.stringify(manifest,null,2)+'\\n'],{type:'application/json'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=\`\${draft.id}-review.json\`;link.click();URL.revokeObjectURL(link.href)});
    render();
  </script>
</body></html>`

await mkdir(dirname(output), { recursive: true })
await writeFile(output, html)
console.log(`Revisão criada em ${output}`)
