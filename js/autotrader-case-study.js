(() => {
  const RAW='https://raw.githubusercontent.com/PkLavc/Autotrader/main/data/';
  const $=id=>document.getElementById(id);
  const money=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD',maximumFractionDigits:2});
  const pct=v=>Number.isFinite(Number(v))?(Number(v)*100).toFixed(2)+'%':'—';
  const cls=v=>Number(v)>0?'auto-positive':Number(v)<0?'auto-negative':'';
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  async function read(name){const r=await fetch(RAW+name+'?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error(name+': '+r.status);return r.json()}
  function drawLine(rows){
    const canvas=$('autoEquityChart'); if(!canvas)return;
    const pts=(rows||[]).map(r=>({t:new Date(r.timestamp),v:Number(r.nav)})).filter(p=>Number.isFinite(p.v));
    const box=canvas.getBoundingClientRect(),dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));canvas.width=box.width*dpr;canvas.height=box.height*dpr;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
    const w=box.width,h=box.height,p={l:56,r:12,t:14,b:28};ctx.clearRect(0,0,w,h);ctx.font='10px ui-monospace,monospace';ctx.fillStyle='#748296';ctx.strokeStyle='#263141';
    if(!pts.length){ctx.fillText('Sem dados ainda',p.l,p.t+20);return}
    const vals=pts.map(x=>x.v),min0=Math.min(...vals),max0=Math.max(...vals),spread=Math.max(1,max0-min0),min=min0-spread*.15,max=max0+spread*.15;
    const x=i=>pts.length===1?p.l+(w-p.l-p.r)/2:p.l+i*(w-p.l-p.r)/(pts.length-1),y=v=>p.t+(max-v)*(h-p.t-p.b)/(max-min);
    for(let i=0;i<5;i++){const yy=p.t+i*(h-p.t-p.b)/4;ctx.beginPath();ctx.moveTo(p.l,yy);ctx.lineTo(w-p.r,yy);ctx.stroke();ctx.fillText('$'+Math.round(max-i*(max-min)/4).toLocaleString('en-US'),3,yy+3)}
    if(pts.length===1){ctx.fillStyle='#58d6a9';ctx.beginPath();ctx.arc(x(0),y(pts[0].v),4,0,Math.PI*2);ctx.fill();return}
    const g=ctx.createLinearGradient(0,p.t,0,h-p.b);g.addColorStop(0,'rgba(88,214,169,.28)');g.addColorStop(1,'rgba(88,214,169,0)');
    ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(x(i),y(q.v)):ctx.moveTo(x(i),y(q.v)));ctx.lineTo(x(pts.length-1),h-p.b);ctx.lineTo(x(0),h-p.b);ctx.closePath();ctx.fillStyle=g;ctx.fill();
    ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(x(i),y(q.v)):ctx.moveTo(x(i),y(q.v)));ctx.strokeStyle='#58d6a9';ctx.lineWidth=2;ctx.stroke();
  }
  function renderSignals(fs){
    const root=$('autoSignals');if(!root)return;const list=(fs||[]).slice(0,20),mx=Math.max(.001,...list.map(f=>Math.abs(Number(f.expected_return)||0)));
    root.innerHTML=list.map(f=>{const v=Number(f.expected_return)||0,w=Math.max(.5,Math.abs(v)/mx*50);return '<div class="auto-signal-row"><b>'+esc(f.symbol)+'</b><div class="auto-signal-track"><i class="auto-signal-fill '+(v>=0?'pos':'neg')+'" style="width:'+w+'%"></i></div><em class="'+cls(v)+'">'+(v>=0?'+':'')+(v*100).toFixed(2)+'%</em></div>'}).join('');
  }
  function renderPositions(latest){
    const root=$('autoPositions');if(!root)return;const prices=Object.fromEntries((latest.forecasts||[]).map(f=>[f.symbol,Number(f.current_close)])),nav=Number(latest.nav)||1;
    const rows=Object.entries(latest.positions||{}).map(([s,q])=>({s,q:Number(q),v:Number(q)*(prices[s]||0)})).sort((a,b)=>b.v-a.v);
    root.innerHTML=rows.map(r=>{const w=Math.max(0,Math.min(100,r.v/nav*100));return '<div class="auto-position"><div class="auto-position-head"><b>'+esc(r.s)+'</b><span>'+money.format(r.v)+' · '+w.toFixed(1)+'%</span></div><div class="auto-position-track"><i style="width:'+w+'%"></i></div></div>'}).join('');
  }
  function renderTrades(trades){
    const b=$('autoTradesBody');if(!b)return;const rows=(trades||[]).slice().reverse().slice(0,20);b.innerHTML=rows.map(t=>{const buy=String(t.side).toUpperCase()==='BUY',q=Number(t.qty)||0,p=Number(t.price)||0;return '<tr><td class="'+(buy?'auto-trade-buy':'auto-trade-sell')+'">'+(buy?'↗':'↘')+' '+esc(t.side)+'</td><td><b>'+esc(t.symbol)+'</b></td><td>'+q.toFixed(4)+'</td><td>'+money.format(p)+'</td><td>'+money.format(q*p)+'</td><td>'+new Date(t.timestamp).toLocaleString('pt-BR')+'</td></tr>'}).join('')||'<tr><td colspan="6">Sem operações registradas.</td></tr>';
  }
  async function load(){
    try{
      const [latest,state]=await Promise.all([read('latest.json'),read('state.json')]),m=latest.metrics||{};
      if($('autoLiveNav'))$('autoLiveNav').textContent=money.format(Number(latest.nav)||0);
      if($('autoLiveReturn')){$('autoLiveReturn').textContent=pct(m.total_return);$('autoLiveReturn').className=cls(m.total_return)}
      if($('autoLiveCash'))$('autoLiveCash').textContent=money.format(Number(latest.cash)||0);
      if($('autoLivePositions'))$('autoLivePositions').textContent=Object.keys(latest.positions||{}).length;
      if($('autoLiveRun'))$('autoLiveRun').textContent=new Date(latest.generated_at).toLocaleString('pt-BR');
      if($('autoLiveModel'))$('autoLiveModel').textContent=String(latest.model||'').replace('NeoQuasar/','');
      drawLine(state.nav_history);renderSignals(latest.forecasts);renderPositions(latest);renderTrades(state.trades);
      window.addEventListener('resize',()=>drawLine(state.nav_history),{passive:true});
    }catch(e){console.error(e);const s=$('autoLiveStatus');if(s)s.textContent='Dados temporariamente indisponíveis';}
  }
  load();
})();