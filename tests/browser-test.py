"""Optional UI checks. Requires Python playwright and Chromium. No network required.
The local files are injected into an isolated page because the authoring environment
blocks navigation to localhost and file://. This tests the actual React components,
not the production server or CSP. Run from any directory.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import os
root=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
    exe=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium')
    browser=p.chromium.launch(executable_path=exe if Path(exe).exists() else None,headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1280,'height':900})
    errors=[]; requests=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.on('request',lambda request:requests.append(request.url))
    page.set_content('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div></body></html>')
    page.add_style_tag(path=str(root/'src/styles.css'))
    for name in ['vendor/react-runtime.js','data/rules.generated.js','src/engine.js','src/guidance.js','src/app.js']:
        page.add_script_tag(path=str(root/name))
    expect(page.get_by_role('heading',name='Check a suspicious message or link')).to_be_visible()
    page.get_by_role('button',name='Analyze message').click()
    expect(page.get_by_role('alert')).to_contain_text('Enter a message')
    print('PASS: empty message validation')
    page.locator('#example').select_option('0');page.get_by_role('button',name='Analyze message').click()
    expect(page.get_by_role('heading',name='Analysis results')).to_be_visible()
    expect(page.get_by_text('Upfront payment request',exact=True)).to_be_visible()
    expect(page.locator('mark').first).to_be_visible()
    page.get_by_role('checkbox').first.check();expect(page.get_by_text('1/3 checked')).to_be_visible()
    print('PASS: example, highlighted evidence and verification checklist')
    if os.environ.get('SAVE_PREVIEWS'):page.screenshot(path=os.environ['SAVE_PREVIEWS']+'/scam_results_preview.png',full_page=True)
    page.locator('#language').select_option('si');expect(page.locator('.finding-head strong').first).to_have_attribute('lang','si')
    expect(page.get_by_text('කලින් මුදල් ගෙවීමට ඉල්ලීම',exact=True)).to_be_visible()
    print('PASS: Sinhala explanations')
    page.locator('#language').select_option('en');page.locator('#example').select_option('1');page.get_by_role('button',name='Analyze message').click();expect(page.get_by_text('Sensitive information request',exact=True)).to_be_visible()
    page.locator('#example').select_option('2');page.get_by_role('button',name='Analyze message').click();expect(page.get_by_text('Unexpected reward or guaranteed earnings',exact=True)).to_be_visible()
    print('PASS: Sinhala and Singlish message checks')
    page.locator('#example').select_option('3');page.get_by_role('button',name='Analyze link').click();expect(page.get_by_role('cell',name='192.0.2.10')).to_be_visible();expect(page.get_by_text('Numeric IP address',exact=True)).to_be_visible()
    assert page.locator('.evidence a').count()==0
    print('PASS: URL findings and non-clickable evidence')
    page.locator('#content').fill('javascript:alert(1)');page.get_by_role('button',name='Analyze link').click();expect(page.get_by_role('alert')).to_contain_text('valid HTTP or HTTPS')
    print('PASS: unsupported URL validation')
    page.locator('#example').select_option('4');page.get_by_role('button',name='Analyze message').click();expect(page.get_by_text('No matching warning signs',exact=True)).to_be_visible()
    page.get_by_role('button',name='Clear and check another message').click();expect(page.locator('#content')).to_have_value('');assert page.locator('.results').count()==0
    print('PASS: no-match uncertainty and reset')
    page.locator('#content').fill('<img src=x onerror=alert(1)>');page.get_by_role('button',name='Analyze message').click();expect(page.locator('.evidence')).to_contain_text('<img src=x onerror=alert(1)>');assert page.locator('.evidence img').count()==0
    print('PASS: user input rendered as text')
    page.get_by_role('button',name='Safety guide',exact=True).click();page.locator('summary').first.click();expect(page.get_by_text('Find the employer’s official website or published recruitment contact yourself.')).to_be_visible()
    page.get_by_role('button',name='Report a scam',exact=True).click();expect(page.get_by_role('link',name='Sri Lanka CERT Official cyber incident reporting portal')).to_have_attribute('href','https://www.cert.gov.lk/report_incident')
    page.get_by_role('button',name='About',exact=True).click();expect(page.get_by_role('heading',name='Privacy and limitations')).to_be_visible()
    page.get_by_role('button',name='Start checking').click();expect(page.locator('#content')).to_have_value('')
    print('PASS: navigation, guide, official reporting links and privacy reset')
    page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    page.locator('#example').select_option('0');page.get_by_role('button',name='Analyze message').click();expect(page.get_by_role('heading',name='Analysis results')).to_be_visible();assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    if os.environ.get('SAVE_PREVIEWS'):page.screenshot(path=os.environ['SAVE_PREVIEWS']+'/scam_mobile_preview.png',full_page=True)
    print('PASS: 390 px mobile layout and analysis')
    assert not errors,errors
    assert not requests,requests
    print('PASS: no uncaught JavaScript errors or network requests during isolated UI checks')
    browser.close()
