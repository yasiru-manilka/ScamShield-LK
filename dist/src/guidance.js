window.ScamContent = {
 examples: [
  {label:'Fake job offer (English)',mode:'message',text:'You have been selected for a part-time job. Pay a registration fee of LKR 2,000 immediately to confirm your place.'},
  {label:'Account alert (Sinhala)',mode:'message',text:'ඔබගේ ගිණුම අවහිර කරනු ඇත. වහාම OTP එවන්න.'},
  {label:'Prize message (Singlish)',mode:'message',text:'Oyāta prize ekak! Ikmanata oyage OTP eka ewanna.'},
  {label:'Suspicious link',mode:'url',text:'http://192.0.2.10/verify-account'},
  {label:'Ordinary reminder',mode:'message',text:'Our lecture starts at 9 am tomorrow. Please bring your notebook.'}
 ],
 guidance: {
  job:{en:['Find the employer’s official website or published recruitment contact yourself.','Confirm the vacancy, interview and hiring process through that contact.','Do not pay unexpected registration or training fees before verifying.'],si:['ආයතනයේ නිල වෙබ් අඩවිය හෝ නිල බඳවා ගැනීමේ සම්බන්ධතා ඔබම සොයා ගන්න.','පුරප්පාඩුව හා සම්මුඛ පරීක්ෂණය එම නිල මාර්ගයෙන් තහවුරු කරන්න.','තහවුරු කිරීමට පෙර අනපේක්ෂිත ලියාපදිංචි ගාස්තු ගෙවන්න එපා.']},
  account:{en:['Open the bank or service’s official app yourself, not the link in the message.','Call the number on your card or the official website if you need help.','Never share OTPs, passwords, PINs or CVV codes with a sender.'],si:['පණිවිඩයේ සබැඳිය වෙනුවට බැංකුවේ හෝ සේවාවේ නිල යෙදුම ඔබම විවෘත කරන්න.','නිල වෙබ් අඩවියේ හෝ කාඩ්පතේ සඳහන් අංකයට අමතන්න.','OTP, මුරපද, PIN හෝ CVV කිසිවෙකුට ලබා දෙන්න එපා.']},
  delivery:{en:['Check tracking through the courier’s official website or app.','Confirm that you are expecting a delivery and that the tracking number matches.','Verify any unexpected customs or delivery fee before paying.'],si:['බෙදාහැරීමේ ආයතනයේ නිල වෙබ් අඩවියෙන් හෝ යෙදුමෙන් පාර්සලය පරීක්ෂා කරන්න.','ඔබ බලාපොරොත්තු වන පාර්සලය හා ලුහුබැඳීමේ අංකය තහවුරු කරන්න.','අනපේක්ෂිත රේගු හෝ බෙදාහැරීමේ ගාස්තු ගෙවීමට පෙර තහවුරු කරන්න.']},
  reward:{en:['Check the promotion through the organizer’s official website.','Confirm whether you actually entered the competition or made an investment.','Do not send fees or personal codes to claim an unexpected reward.'],si:['සංවිධායකයාගේ නිල වෙබ් අඩවියෙන් ප්‍රවර්ධනය තහවුරු කරන්න.','ඔබ සැබවින්ම තරගයට සහභාගී වූවාද යන්න පරීක්ෂා කරන්න.','අනපේක්ෂිත ත්‍යාගයක් සඳහා මුදල් හෝ රහස් කේත ලබා දෙන්න එපා.']},
  link:{en:['Read the actual hostname displayed in the results, not just the link’s wording.','Find the intended organization through its official website or app independently.','Do not open an unfamiliar link just to see whether it is safe.'],si:['සබැඳියේ පෙළ පමණක් නොව ප්‍රතිඵලයේ සැබෑ වසම් නාමය පරීක්ෂා කරන්න.','අදාළ ආයතනයේ නිල වෙබ් අඩවිය හෝ යෙදුම ස්වාධීනව සොයා ගන්න.','ආරක්ෂිතදැයි බැලීමට නොදන්නා සබැඳිය විවෘත කරන්න එපා.']},
  general:{en:['Check whether you recognize the sender and expected this request.','Use a separate trusted contact to confirm the request.','Avoid sharing sensitive information or sending money until you have verified it.'],si:['යවන්නා හඳුනනවාද සහ ඉල්ලීම බලාපොරොත්තු වූවාද පරීක්ෂා කරන්න.','වෙනත් විශ්වාසදායක සම්බන්ධතා මාර්ගයකින් ඉල්ලීම තහවුරු කරන්න.','තහවුරු වන තුරු රහස්‍ය තොරතුරු හෝ මුදල් ලබා දෙන්න එපා.']}
 },
 labels: {elevated:{en:'Multiple or strong warning signs',si:'ප්‍රබල හෝ බහු අවදානම් ලකුණු'},caution:{en:'Warning signs found',si:'අවදානම් ලකුණු හමු විය'},unknown:{en:'No matching warning signs',si:'ගැළපෙන අවදානම් ලකුණු හමු නොවීය'}},
 sources:[{title:'Sri Lanka CERT',desc:'Official cyber incident reporting portal',url:'https://www.cert.gov.lk/report_incident'},{title:'Central Bank of Sri Lanka',desc:'Financial scam prevention and official information',url:'https://www.cbsl.gov.lk/'},{title:'Sri Lanka Police',desc:'Official public advisories and police information',url:'https://www.police.lk/'}]
};
