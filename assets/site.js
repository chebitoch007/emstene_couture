(()=>{
const WA="254738447566";
const $=(s,r=document)=>r.querySelector(s);
// Gallery: renders data/styles.json (add "image":"/images/file.jpg" to show a real photo)
const g=$("#gallery");
if(g){fetch("/data/styles.json").then(r=>r.json()).then(items=>{
 const cats=["All",...new Set(items.map(i=>i.category))];
 const f=$("#filters");
 const draw=c=>{g.innerHTML="";items.filter(i=>c==="All"||i.category===c).forEach(i=>{
  const t=document.createElement("article");t.className="tile";
  const m=i.image?`<img class="ph" src="${encodeURI(i.image)}" alt="${i.title}" loading="lazy">`:`<span class="ph" style="--c:${i.color}" aria-hidden="true"></span>`;
  t.innerHTML=`${m}<div class="in"><h3></h3><p></p></div>`;
  $("h3",t).textContent=i.title;$("p",t).textContent=i.text;g.append(t)});
  f.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.textContent===c))};
 cats.forEach(c=>{const b=document.createElement("button");b.type="button";b.textContent=c;b.onclick=()=>draw(c);f.append(b)});
 draw("All")}).catch(()=>{g.textContent="Styles are unavailable right now. See our Instagram @emstene_couture."})}
// Inquiry form: email the studio, and always offer WhatsApp as the fallback
const form=$("#inquiry");
if(form){form.addEventListener("submit",async e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(form));const n=$("#formnote");const btn=$("button",form);
 const msg=`Hello Emstene Couture, I'm ${d.name}. Occasion: ${d.occasion}${d.date?", date: "+d.date:""}. ${d.message||""}`;
 btn.disabled=true;n.textContent="Sending…";
 try{const r=await fetch("/api/inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});
  if(!r.ok)throw 0;n.textContent="Thank you. We received your request and will reply on "+d.phone+".";form.reset()}
 catch{n.textContent="We couldn't send that online, so we're opening WhatsApp for you.";window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank","noopener")}
 btn.disabled=false})}
})();
