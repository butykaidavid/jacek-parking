from pathlib import Path
import json
from deep_translator import GoogleTranslator

path = Path('C:/jacek-parking/translations.json')
data = json.loads(path.read_text(encoding='utf-8'))
root_text = data['hu']['text']
root_aria = data['hu']['aria']

lang_map = {
    'en': 'en',
    'ru': 'ru',
    'pl': 'pl',
    'ro': 'ro',
    'lt': 'lt',
    'uk': 'uk',
    'sk': 'sk',
    'sl': 'sl'
}

def translate_value(translator, value):
    if not isinstance(value, str):
        return value
    text = value.strip()
    if not text:
        return value
    try:
        return translator.translate(value)
    except Exception:
        return value

def translate_dict(code):
    translator = GoogleTranslator(source='hu', target=code)
    text_block = {k: translate_value(translator, v) for k, v in root_text.items()}
    aria_block = {k: translate_value(translator, v) for k, v in root_aria.items()}
    return {'text': text_block, 'aria': aria_block}

for lang, code in lang_map.items():
    data[lang] = translate_dict(code)

path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
