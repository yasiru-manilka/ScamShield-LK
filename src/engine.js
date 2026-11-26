(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('../data/rules.json'));
  else root.ScamEngine = factory(root.SCAM_RULES);
})(typeof globalThis !== 'undefined' ? globalThis : this, function(rules) {
  'use strict';
  const LIMIT = 8000;
  const SHORTENERS = ['bit.ly','tinyurl.com','t.co','is.gd','cutt.ly','rb.gy','shorturl.at','ow.ly'];
  const URL_RULES = {
    insecure: ['Unencrypted HTTP link','HTTP සබැඳිය',1,'HTTP does not encrypt the connection. HTTPS alone also does not prove legitimacy.','HTTP සම්බන්ධතාව සංකේතනය නොකරයි. HTTPS පමණක් ආරක්ෂාව තහවුරු නොකරයි.'],
    userinfo: ['User information before domain','වසම් නාමයට පෙර පරිශීලක තොරතුරු',3,'Text before an @ sign may hide the actual destination host.','@ ලකුණට පෙර ඇති පෙළ සැබෑ වසම සඟවා තැබිය හැක.'],
    ip: ['Numeric IP address','අංක සහිත IP ලිපිනය',2,'A numeric address makes it harder to identify the organization.','අංක සහිත ලිපිනයකින් ආයතනය හඳුනා ගැනීම අපහසු වේ.'],
    punycode: ['Internationalized hostname','ජාත්‍යන්තර වසම් නාමය',1,'Some internationalized names look similar to other domains. Legitimate domains can also use them.','සමහර ජාත්‍යන්තර වසම් වෙනත් වසම් මෙන් පෙනේ. ඒවා නීත්‍යානුකූල ද විය හැක.'],
    shortener: ['Shortened link','කෙටි කළ සබැඳිය',2,'A link shortener hides the final destination; this tool does not expand it.','කෙටි සබැඳියක අවසාන ගමනාන්තය නොපෙනේ. මෙය එය විවෘත නොකරයි.'],
    labels: ['Many hostname labels','වසම් කොටස් බොහොමයක්',1,'Multiple hostname labels can make the actual destination harder to recognize.','වසම් කොටස් බොහෝ වීම සැබෑ ගමනාන්තය හඳුනා ගැනීමට බාධා විය හැක.'],
    path: ['Account or payment wording in URL','සබැඳියේ ගිණුම් හෝ ගෙවීම් වචන',1,'A login or payment-related path should be checked against the official site independently.','පිවිසුම් හෝ ගෙවීම් මාර්ගය නිල වෙබ් අඩවියෙන් තහවුරු කරන්න.'],
    port: ['Nonstandard port','සාමාන්‍ය නොවන පෝට් අංකය',1,'An unusual port can be legitimate, but it deserves checking.','සාමාන්‍ය නොවන පෝට් අංකයක් සැබෑ විය හැකි නමුත් පරීක්ෂා කරන්න.'],
    invalid: ['Link could not be parsed','සබැඳිය කියවිය නොහැක',1,'The URL is malformed or uses an unsupported protocol. Do not open it to test it.','සබැඳිය වැරදි හෝ සහාය නොදක්වන ආකාරයකි. පරීක්ෂා කිරීමට එය විවෘත නොකරන්න.']
  };
  const normalize = value => value.normalize('NFC').replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g,'').replace(/[\u00A0\u202F]/g,' ');
  const compiled = rules.map(r => ({...r, regexes:r.patterns.map(p => new RegExp(normalize(p),'giu'))}));
  function parseLink(raw) {
    let value=raw.trim();
    if (!value || /\s/.test(value) || /[\\\u0000-\u001f\u007f]/.test(value)) return null;
    if (/^[a-z][a-z\d+.-]*:/i.test(value) && !/^https?:\/\//i.test(value) && !/^[\w.-]+:\d+(?:\/|$)/.test(value)) return null;
    const implicit=!/^https?:\/\//i.test(value);
    try { const u=new URL(implicit?'https://'+value:value); if(!['http:','https:'].includes(u.protocol) || !u.hostname || (!u.hostname.includes('.')&&!u.hostname.startsWith('[')&&u.hostname!=='localhost'))return null;return {u,implicit}; } catch {return null;}
  }
  function findLinks(text) {
    const rx=/(?:https?:\/\/|www\.)[^\s<>"'`]+|(?:[\p{L}\p{N}][\p{L}\p{N}-]*\.)+(?:lk|com|net|org|info|xyz|top|site|online|me|io|app|co|gov|edu|bit|example)(?=$|[\s/:?#),.!;])/giu;
    const out=[];let m;
    while ((m=rx.exec(text))&&out.length<20) {
      // Skip bare domains inside email addresses.
      if(m.index>0&&text[m.index-1]==='@'&&!/^https?:/i.test(m[0]))continue;
      let raw=m[0].replace(/[),.!;\]}>]+$/g,'');
      // Capture a path for bare domains as well.
      if(!/^https?:\/\/|^www\./i.test(raw)) {const rest=text.slice(m.index+raw.length).match(/^[/?:#][^\s<>"'`]+/);if(rest){raw+=(rest[0].replace(/[),.!;\]}>]+$/g,''));rx.lastIndex=m.index+raw.length;}}
      out.push({raw,start:m.index,end:m.index+raw.length});
    }return out;
  }
  function analyzeLink(item) {
    const parsed=parseLink(item.raw),found=[];
    const add=id=>{const [title,siTitle,weight,reason,siReason]=URL_RULES[id];found.push({id:'url-'+id,title,siTitle,weight,reason,siReason,category:'link',matches:[{text:item.raw,start:item.start,end:item.end}]});};
    if(!parsed){add('invalid');return {host:null,scheme:null,findings:found};}
    const {u,implicit}=parsed,host=u.hostname.toLowerCase().replace(/\.$/,'');
    if(!implicit&&u.protocol==='http:')add('insecure');
    if(u.username||u.password)add('userinfo');
    if(/^\d+(?:\.\d+){3}$/.test(host)||host.startsWith('['))add('ip');
    if(host.split('.').some(x=>x.startsWith('xn--')))add('punycode');
    if(SHORTENERS.some(x=>host===x||host.endsWith('.'+x)))add('shortener');
    if(host.split('.').length>=5)add('labels');
    let path=u.pathname+' '+u.search;try{path=decodeURIComponent(path);}catch{}
    if(/(?:login|sign[-_]?in|verify|verification|password|payment|wallet|claim|otp|update-account)/i.test(path))add('path');
    if(u.port)add('port');
    return {host,scheme:implicit?'not supplied':u.protocol.slice(0,-1),findings:found};
  }
  function context(text,mode){
    if(mode==='url')return 'link';
    if(/\b(?:job|employment|recruitment|vacancy|part.time|salary|interview|rakiya)\b|රැකියා|වැටුප්|රැකියාව/i.test(text))return 'job';
    if(/\b(?:bank|account|card|otp|wallet|pin|password)\b|බැංකු|ගිණුම|මුරපදය/i.test(text))return 'account';
    if(/\b(?:parcel|delivery|courier|customs|package)\b|පාර්සල|රේගු/i.test(text))return 'delivery';
    if(/\b(?:prize|lottery|reward|profit|investment|won)\b|ත්‍යාග|ලොතරැයි|ලාභ/i.test(text))return 'reward';
    return 'general';
  }
  function analyze(input,mode='message') {
    if(!['message','url'].includes(mode))throw new Error('Choose a supported analysis mode.');
    if(typeof input!=='string'||!input.trim())throw new Error(mode==='url'?'Enter a link to check.':'Enter a message to check.');
    if(input.length>LIMIT)throw new Error('Use at most '+LIMIT+' characters.');
    const text=normalize(input.trim()), findings=[],links=[];
    if(mode==='url'&&!parseLink(text))throw new Error('Enter one valid HTTP or HTTPS link (for example, example.com).');
    if(mode==='message')for(const r of compiled){
      const matches=[]; for(const regex of r.regexes){regex.lastIndex=0;let m;while((m=regex.exec(text))&&matches.length<5){if(!matches.some(x=>x.start===m.index&&x.end===m.index+m[0].length))matches.push({text:m[0],start:m.index,end:m.index+m[0].length});if(!m[0].length)regex.lastIndex++;}}
      if(matches.length){const {regexes,patterns,...info}=r;findings.push({...info,matches});}
    }
    for(const item of mode==='url'?[{raw:text,start:0,end:text.length}]:findLinks(text)){
      const result=analyzeLink(item);links.push({host:result.host,scheme:result.scheme});
      for(const f of result.findings){const previous=findings.find(x=>x.id===f.id);if(previous)previous.matches.push(...f.matches);else findings.push(f);}
    }
    findings.sort((a,b)=>b.weight-a.weight);
    const score=findings.reduce((sum,f)=>sum+f.weight,0);
    return {text,mode,findings,links,score,level:score>=5?'elevated':score?'caution':'unknown',context:context(text,mode)};
  }
  function highlightParts(text,findings){
    const ranges=findings.flatMap(f=>f.matches).map(m=>[m.start,m.end]).sort((a,b)=>a[0]-b[0]);const merged=[];
    for(const r of ranges){const last=merged[merged.length-1];if(last&&r[0]<=last[1])last[1]=Math.max(last[1],r[1]);else merged.push(r.slice());}
    const parts=[];let pos=0;for(const [a,b] of merged){if(a>pos)parts.push({text:text.slice(pos,a),mark:false});parts.push({text:text.slice(a,b),mark:true});pos=b;}if(pos<text.length)parts.push({text:text.slice(pos),mark:false});return parts;
  }
  return {analyze,highlightParts,parseLink,findLinks,LIMIT};
});
