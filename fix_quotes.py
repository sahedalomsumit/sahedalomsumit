import os
import re

dir_path = os.path.join(os.getcwd(), 'src', 'pages')
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file_name in files:
    file_path = os.path.join(dir_path, file_name)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    # Match description: [broken start] [content] [broken end],
    # The content might contain commas, so we look for the last comma before 'canonical:' or '})'
    
    # 1. Fix the broken backtick version: description: `part`, remaining part...,
    # We want to merge them into one backtick string
    broken_backtick_regex = r"description: `([\s\S]+?)`([\s\S]+?),\n"
    def merge_backticks(match):
        return f"description: `{match.group(1)}{match.group(2)}`,\n"
    
    if re.search(broken_backtick_regex, content):
        content = re.sub(broken_backtick_regex, merge_backticks, content)
        changed = True

    # 2. Fix the missing quotes version (if it didn't get partially backticked)
    # description: Some Text...,\n
    # We look for description: until the end of the line
    missing_entirely_regex = r"description: (?![`']) ([\s\S]+?),\n"
    def fix_missing_entirely(match):
        return f"description: `{match.group(1)}`,\n"
    
    if re.search(missing_entirely_regex, content):
        content = re.sub(missing_entirely_regex, fix_missing_entirely, content)
        changed = True

    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file_name}")
