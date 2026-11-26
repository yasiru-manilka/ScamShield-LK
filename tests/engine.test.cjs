const test=require('node:test');const assert=require('node:assert/strict');const E=require('../src/engine.js');
const ids=r=>r.findings.map(f=>f.id);
const cases=[
 ['English credentials','Send your OTP immediately.','message',['credential','urgency']],
 ['Sinhala credentials','වහාම OTP එවන්න.','message',['credential','urgency']],
 ['Singlish credentials','Ikmanata oyage OTP eka ewanna.','message',['credential','urgency']],
 ['English fee','Pay a registration fee to confirm your job.','message',['fee']],
 ['Sinhala fee','ලියාපදිංචි ගාස්තුවක් ගෙවන්න.','message',['fee']],
 ['Singlish fee','Registration fee eka gewanna.','message',['fee']],
 ['English prize','You have won a prize.','message',['reward']],
 ['Sinhala reward','ඔබට ත්‍යාගයක් ලැබී ඇත.','message',['reward']],
 ['Singlish reward','Oyāta prize ekak!','message',['reward']],
 ['Account threat','Your account will be blocked.','message',['threat']],
 ['Install','Install this APK.','message',['install']],
 ['Secrecy','Do not tell anyone.','message',['secrecy']],
 ['HTTP IP path','http://192.0.2.10/verify-account','url',['url-insecure','url-ip','url-path']],
 ['Hidden hostname','https://example.com@evil.example/login','url',['url-userinfo','url-path']],
 ['Shortener','https://bit.ly/demo','url',['url-shortener']],
 ['Punycode','https://xn--bcher-kva.example','url',['url-punycode']],
 ['Multiple labels','https://a.b.c.d.example.com','url',['url-labels']],
 ['Port','https://example.com:8080','url',['url-port']],
 ['Message link','Go to example.com/verify today.','message',['url-path']],
 ['Zero-width character','Send your O\u200bTP.','message',['credential']],
 ['Benign message','Our lecture starts tomorrow at nine.','message',[]],
 ['Plain HTTPS','https://example.com','url',[]],
 ['Email not URL','Email student@example.com for notes.','message',[]]
];
for(const [name,value,mode,expected] of cases)test(name,()=>assert.deepEqual(ids(E.analyze(value,mode)).sort(),expected.sort()));
test('Reject empty input',()=>assert.throws(()=>E.analyze('  ')));
test('Reject invalid URL',()=>assert.throws(()=>E.analyze('not a URL','url')));
test('Reject executable scheme',()=>assert.throws(()=>E.analyze('javascript:alert(1)','url')));
test('Reject data scheme',()=>assert.throws(()=>E.analyze('data:text/html,abc','url')));
test('Reject oversized text',()=>assert.throws(()=>E.analyze('x'.repeat(8001))));
test('Deduplicate categories',()=>assert.equal(E.analyze('Send your OTP. Send your OTP.').findings.length,1));
test('Correct hostname',()=>assert.equal(E.analyze('https://example.com@evil.example/login','url').links[0].host,'evil.example'));
test('Unknown is not safe',()=>assert.equal(E.analyze('Hello').level,'unknown'));
test('Highlighted text preserves normalized text',()=>{const r=E.analyze('Send your OTP immediately.');const p=E.highlightParts(r.text,r.findings);assert.equal(p.map(x=>x.text).join(''),r.text);assert.ok(p.some(x=>x.mark));});
test('Job context',()=>assert.equal(E.analyze('You have a job offer.').context,'job'));
test('No DOM rendering in detector',()=>assert.equal(E.analyze('<img src=x onerror=alert(1)>').text,'<img src=x onerror=alert(1)>'));
