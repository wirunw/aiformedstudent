
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1600)}
async function copyText(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast('คัดลอกแล้ว นำไปวางใน Gemini ได้เลย')}
function applyTheme(t){if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);const b=$('#theme');if(b)b.textContent=t==='dark'?'☾ มืด':t==='light'?'☀ สว่าง':'◐ ตามเครื่อง'}
function initTheme(){let t=store.get('amds-theme','auto');applyTheme(t);$('#theme').addEventListener('click',()=>{t=t==='auto'?'light':t==='light'?'dark':'auto';store.set('amds-theme',t);applyTheme(t)})}
const FAC={med:{name:'แพทยศาสตร์',st:'นักศึกษาแพทย์',pro:'แพทย์',topic:'ภาวะหัวใจล้มเหลว (heart failure)',focus:'การวินิจฉัยแยกโรคและแผนการส่งตรวจ'},
 pharm:{name:'เภสัชศาสตร์',st:'นักศึกษาเภสัชศาสตร์',pro:'เภสัชกร',topic:'ยาต้านการแข็งตัวของเลือด (anticoagulants)',focus:'ปัญหาจากการใช้ยาและข้อเสนอแนะการปรับยา'},
 nurse:{name:'พยาบาลศาสตร์',st:'นักศึกษาพยาบาล',pro:'พยาบาล',topic:'การพยาบาลผู้ป่วยเบาหวาน',focus:'ข้อวินิจฉัยทางการพยาบาลและลำดับความสำคัญของการดูแล'},
 other:{name:'สาขาสุขภาพอื่น',st:'นักศึกษาสายวิทยาศาสตร์สุขภาพ',pro:'บุคลากรสุขภาพ',topic:'โรคเบาหวานชนิดที่ 2',focus:'ประเด็นสำคัญในการดูแลผู้ป่วย'}};
function G(){const f=store.get('amds-fac','med'),y=store.get('amds-year','2'),F=FAC[f]||FAC.med;const t=(store.get('amds-topic','')||'').trim()||F.topic;return{f,y,F,topic:t,role:F.st+'ชั้นปีที่ '+y}}
function initSetup(onChange){const fs=$('#g-fac'),ys=$('#g-year'),ts=$('#g-topic');fs.value=store.get('amds-fac','med');ys.value=store.get('amds-year','2');ts.value=store.get('amds-topic','');const ph=()=>ts.placeholder='เช่น '+(FAC[fs.value]||FAC.med).topic;ph();
 fs.addEventListener('change',()=>{store.set('amds-fac',fs.value);ph();onChange()});ys.addEventListener('change',()=>{store.set('amds-year',ys.value);onChange()});ts.addEventListener('input',()=>{store.set('amds-topic',ts.value);onChange()})}
