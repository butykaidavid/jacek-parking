import json
from pathlib import Path

TRANSLATIONS_PATH = Path("translations.json")
TRANSLATIONS_SRC = Path("translations_src")


def load_translation(code: str) -> dict:
    src_path = TRANSLATIONS_SRC / f"{code}.json"
    if not src_path.exists():
        raise FileNotFoundError(f"Missing translation file for '{code}' at {src_path}")
    with src_path.open(encoding="utf-8") as fh:
        return json.load(fh)


def main() -> None:
    if not TRANSLATIONS_PATH.exists():
        raise FileNotFoundError(f"Missing {TRANSLATIONS_PATH}")

    TRANSLATIONS_SRC.mkdir(exist_ok=True)

    with TRANSLATIONS_PATH.open(encoding="utf-8") as fh:
        data = json.load(fh)

    for code in ("en", "ru", "uk", "sk", "sl", "pl", "ro"):
        data[code] = load_translation(code)

    with TRANSLATIONS_PATH.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
