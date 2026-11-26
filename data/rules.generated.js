window.SCAM_RULES = [
  {
    "id": "credential",
    "title": "Sensitive information request",
    "siTitle": "රහස්‍ය තොරතුරු ඉල්ලීම",
    "weight": 4,
    "category": "account",
    "patterns": [
      "(?:send|share|enter|provide|submit|confirm|verify|give|type|reply with|tell)\\s+(?:me\\s+|us\\s+|your\\s+|the\\s+)?(?:otp|one[- ]time (?:password|code)|password|pin|cvv|card (?:number|details)|verification code)\\b",
      "(?:otp|pin|cvv|password|verification code)\\s*(?:එවන්න|දෙන්න|ලබා දෙන්න|ඇතුළත් කරන්න|ewanna|evanna|danna|denna|deepan|kiyanna|send karanna)",
      "(?:මුරපදය|රහස් අංකය|කාඩ්පත් විස්තර|තහවුරු කිරීමේ කේතය)\\s*(?:එවන්න|දෙන්න|ඇතුළත් කරන්න)",
      "(?:oyage|obe)\\s+(?:otp|pin|password|cvv)\\s+(?:eka\\s+)?(?:ewanna|denna|danna|kiyanna)"
    ],
    "reason": "Requests for one-time codes, passwords or card security details can expose your account.",
    "siReason": "OTP, මුරපද හෝ කාඩ්පත් රහස්‍ය තොරතුරු ලබා දීමෙන් ඔබේ ගිණුම අවදානමට ලක් විය හැක."
  },
  {
    "id": "fee",
    "title": "Upfront payment request",
    "siTitle": "කලින් මුදල් ගෙවීමට ඉල්ලීම",
    "weight": 3,
    "category": "payment",
    "patterns": [
      "(?:advance|upfront|registration|processing|activation|verification|security|release|training|delivery|customs)\\s+(?:fee|payment|deposit|charge)",
      "(?:pay|deposit|transfer|send)\\s+(?:us\\s+)?(?:rs\\.?|lkr|රු\\.?)\\s*[0-9,]+",
      "(?:ලියාපදිංචි|සැකසුම්|සේවා|රේගු)\\s*ගාස්තු(?:වක්|ව)?",
      "(?:මුදල්|ගාස්තුව)\\s*(?:ගෙවන්න|එවන්න|තැන්පත් කරන්න)",
      "(?:registration|advance|deposit|fee)\\s+(?:eka\\s+)?(?:gewanna|gevanna|danna|pay karanna)",
      "(?:salli|mudal)\\s+(?:ewanna|danna|gewanna)"
    ],
    "reason": "An unexpected fee, especially before employment or receiving a reward, deserves independent verification.",
    "siReason": "රැකියාවක් හෝ ත්‍යාගයක් ලබා ගැනීමට පෙර මුදල් ඉල්ලීම ස්වාධීනව තහවුරු කරන්න."
  },
  {
    "id": "urgency",
    "title": "Pressure or urgency",
    "siTitle": "හදිසි පීඩනය",
    "weight": 1,
    "category": "general",
    "patterns": [
      "\\b(?:immediately|urgent(?:ly)?|act now|limited time|last chance|within \\d+ (?:minutes?|hours?)|before midnight|today only)\\b",
      "(?:වහාම|දැන්ම|අදම|අවසන් අවස්ථාව|ඉක්මනින්)",
      "\\b(?:ikmanata|danma|denma|adama|ikmanin|anthima awasthawa|ada witharai)\\b"
    ],
    "reason": "Urgent wording may discourage you from checking whether a request is genuine.",
    "siReason": "හදිසි පණිවිඩයක් නිසා ඉල්ලීම සැබෑදැයි පරීක්ෂා කිරීමට ඇති කාලය අඩු විය හැක."
  },
  {
    "id": "reward",
    "title": "Unexpected reward or guaranteed earnings",
    "siTitle": "අනපේක්ෂිත ත්‍යාගයක් හෝ සහතික ලාභයක්",
    "weight": 2,
    "category": "reward",
    "patterns": [
      "\\b(?:you (?:have )?won|claim (?:your|the) prize|lottery winner|guaranteed (?:profit|income|returns?)|double your money|easy money|free cash|earn money fast)\\b",
      "(?:ඔබට ත්‍යාගයක්|ත්‍යාගය ලබා ගන්න|ලොතරැයියක් දිනා|සහතික ලාභ|මුදල් දෙගුණ)",
      "\\b(?:oya dinala|oyata prize|prize eka ganna|lottery eka dinala|salli degunayak|guaranteed profit)\\b",
      "\\b(?:oy[aā]ta|oyata)\\s+prize\\b"
    ],
    "reason": "Unexpected prizes and guaranteed returns are common reasons to verify a claim before acting.",
    "siReason": "අනපේක්ෂිත ත්‍යාග හා සහතික ලාභ පිළිබඳ ඉල්ලීම් ක්‍රියා කිරීමට පෙර තහවුරු කරන්න."
  },
  {
    "id": "threat",
    "title": "Threat of account restriction",
    "siTitle": "ගිණුම සීමා කිරීමේ තර්ජනය",
    "weight": 2,
    "category": "account",
    "patterns": [
      "(?:account|card|wallet)\\s+(?:will be|has been|is)\\s+(?:blocked|suspended|locked|disabled|restricted)",
      "(?:ගිණුම|කාඩ්පත)\\s*(?:අත්හිටුවනු|අවහිර|අක්‍රිය)",
      "(?:account|card)\\s+(?:eka\\s+)?(?:block|lock|suspend)\\s+(?:wenawa|karanawa|wela|wei)"
    ],
    "reason": "Threats about account access should be checked using your bank or service's official app or phone number.",
    "siReason": "ගිණුම අවහිර කරන බව පැවසුවහොත් නිල යෙදුම හෝ නිල දුරකථන අංකය භාවිතයෙන් පරීක්ෂා කරන්න."
  },
  {
    "id": "install",
    "title": "Unfamiliar app installation request",
    "siTitle": "නොදන්නා යෙදුමක් ස්ථාපනය කිරීමට ඉල්ලීම",
    "weight": 3,
    "category": "account",
    "patterns": [
      "(?:download|install|open)\\s+(?:this|the|our|an?)?\\s*(?:apk|remote access app|unknown app|attachment)",
      "(?:install|download)\\s+(?:karanna|කරන්න)\\s*(?:apk|app)?",
      "(?:යෙදුම|ඇප් එක)\\s*(?:ස්ථාපනය කරන්න|බාගත කරන්න)"
    ],
    "reason": "Unfamiliar apps or files can compromise a device. Use official app stores and verify the sender.",
    "siReason": "නොදන්නා යෙදුම් හෝ ගොනු උපාංගයට හානි කළ හැක. නිල යෙදුම් වෙළඳසැල් භාවිතා කරන්න."
  },
  {
    "id": "secrecy",
    "title": "Request for secrecy",
    "siTitle": "රහසිගතව තබා ගැනීමට ඉල්ලීම",
    "weight": 2,
    "category": "general",
    "patterns": [
      "\\b(?:do not tell anyone|don't tell anyone|keep this secret|keep this confidential|do not contact (?:your )?bank)\\b",
      "(?:කාටවත් කියන්න එපා|රහසක් ලෙස තබා ගන්න)",
      "\\b(?:katawath kiyanna epa|kaatawath kiyanna epa|bank ekata kiyanna epa)\\b"
    ],
    "reason": "Pressure to keep a transaction secret may prevent independent advice.",
    "siReason": "ගනුදෙනුව රහසිගතව තබා ගැනීමේ ඉල්ලීම ස්වාධීන උපදෙස් ලබා ගැනීමට බාධාවක් විය හැක."
  }
];
