# Design decisions and source references

The visual design is a restrained service-tool layout: simple navigation, one primary form, a separate help column, conventional input labels, a results report and mobile reflow. The dark charcoal palette uses green for controls and navigation, with amber and red reserved for actual warning states. The design is independently implemented, not a copy of another service or an official government website.

References researched on 26 November 2026:
- Google Search Central, "Updates to the Google Safe Browsing's Site Status Tool": https://developers.google.com/search/blog/2017/03/updates-to-google-safe-browsings-site — clear diagnostic results for non-specialists.
- Google Transparency Report, Safe Browsing site status: https://transparencyreport.google.com/safe-browsing/search — focused site check workflow (we do not integrate Google's threat intelligence).
- GOV.UK Design System, Textarea: https://design-system.service.gov.uk/components/textarea/ — labeled multi-line input and contextual hints.
- GOV.UK Design System, Error message: https://design-system.service.gov.uk/components/error-message/ — inline validation that preserves user input.
- GOV.UK Design System, Warning text: https://design-system.service.gov.uk/components/warning-text/ — clear warning language.
- Sri Lanka CERT, Report Incident: https://www.cert.gov.lk/report_incident — official reporting portal.
- Sri Lanka Police, Public Advisory on Internet-Based Financial Frauds Using Social Media Platforms: https://www.police.lk/?p=16635 — caution around transfers and confidential banking data.
- Sri Lanka Police, Public Awareness on Emerging Online Financial Scams Using the Names of Reputable Institutions: https://www.police.lk/?p=21963 — notify bank promptly for suspected financial fraud.

## Security and privacy decisions

The detector contains no networking or persistent storage logic. React renders input as text, not HTML. The main page includes a restrictive content-security policy with connect-src 'none' and no external scripts, fonts or analytics. User-supplied links are not clickable and are never fetched, expanded or sent to a reputation service. Only fixed official reference URLs are clickable. Data lives in memory; browser/clipboard/device retention is outside the app's control. A user should redact secrets before pasting. These are design measures, not an independent security audit.

## Testing plan for the competition team

1. Gather genuine anonymized examples with consent and label each scenario independently.
2. Review local-language rules with Sinhala/Singlish speakers and record missed patterns and false positives.
3. Compare results against a harmless labeled test set; report precision, recall and limitations separately by language. Do not report the 34 software tests as scam-detection accuracy.
4. Conduct real usability tests: completion, interpretation, verification decisions and accessibility. Obtain consent.
5. Test the deployed site on real Android, iOS and desktop browsers, including network inspection and CSP.
