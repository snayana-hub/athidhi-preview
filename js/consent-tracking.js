/* Inactive until owner-approved deployment.enabled is true in tracking-deployment.yml.
   No vendor resource is requested until an explicit Accept choice. */
(function(){
'use strict';
var config=document.getElementById('athidhi-tracking-config');if(!config)return;
var ga=config.dataset.ga||'',gtm=config.dataset.gtm||'',pixel=config.dataset.pixel||'';
if((ga&&!/^G-[A-Z0-9]+$/.test(ga))||(gtm&&!/^GTM-[A-Z0-9]+$/.test(gtm))||(pixel&&!/^\d+$/.test(pixel)))return;
var names=[ga?'Google Analytics':'',gtm?'Google Tag Manager (approved container)':'',pixel?'Meta Pixel':''].filter(Boolean);if(!names.length)return;
var key='athidhi_tracking_consent_v1',started=false;
function load(src){var s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);}
function start(){if(started)return;started=true;
 if(ga){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',ga);load('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga));}
 if(gtm){window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});load('https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(gtm));}
 if(pixel){var f=window.fbq=function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments);};if(!window._fbq)window._fbq=f;f.push=f;f.loaded=true;f.version='2.0';f.queue=[];f('init',pixel);f('track','PageView');load('https://connect.facebook.net/en_US/fbevents.js');}
}
function store(v){try{localStorage.setItem(key,JSON.stringify({value:v,revision:config.dataset.revision}));}catch(e){}}
function state(){try{var v=JSON.parse(localStorage.getItem(key));return v&&v.revision===config.dataset.revision?v.value:null;}catch(e){return null;}}
function clearCookies(){document.cookie.split(';').forEach(function(row){var name=row.trim().split('=')[0];if(/^(_ga|_gid|_gat|_gcl|_fbp|_fbc)/.test(name)){['',location.hostname,'.'+location.hostname].forEach(function(domain){document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');});}});}
var panel=document.createElement('section');panel.id='athidhi-consent';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Optional tracking / Optionale Analyse');
panel.innerHTML='<strong>Optionale Analyse / Optional tracking</strong><p></p><p><a href="/datenschutz.html">Datenschutz / Privacy details</a></p><div><button type="button" data-choice="no">Alles ablehnen / Reject all</button><button type="button" data-choice="yes">Alles akzeptieren / Accept all</button></div>';
panel.querySelector('p').textContent='Nur mit Ihrer Zustimmung / Only with your consent: '+names.join(', ')+'. Sie können Ihre Auswahl jederzeit ändern / You can change your choice at any time.';
function choose(v){store(v);panel.hidden=true;if(v==='yes')start();else if(started){clearCookies();location.reload();}}
panel.querySelectorAll('[data-choice]').forEach(function(b){b.addEventListener('click',function(){choose(b.dataset.choice);});});
document.body.appendChild(panel);var reopen=document.createElement('button');reopen.type='button';reopen.id='athidhi-consent-settings';reopen.textContent='Datenschutz-Auswahl / Privacy choices';reopen.addEventListener('click',function(){panel.hidden=false;});document.body.appendChild(reopen);
var saved=state();if(saved==='yes'){panel.hidden=true;start();}else if(saved==='no'){panel.hidden=true;}
})();
