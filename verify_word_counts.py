import json
import re

with open('f:/supiiiii/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

print(f"{'#':<3} | {'Brand':<10} | {'Body Words':<12} | {'Total Words':<12} | {'Status (300-500 words)'}")
print("-" * 65)

all_valid = True
for p in posts:
    body_text = " ".join([s['heading'] + " " + s['body'] for s in p['sections']]) + " " + p['takeaway']
    total_text = p['title'] + " " + p['subtitle'] + " " + body_text
    
    body_words = len(re.findall(r'\b\w+\b', body_text))
    total_words = len(re.findall(r'\b\w+\b', total_text))
    
    # Check if within 300-500
    is_valid = 300 <= total_words <= 500 and 300 <= body_words <= 500
    if not is_valid:
        all_valid = False
    status = "PASS (Valid)" if is_valid else "FAIL"
    print(f"{p['id']:<3} | {p['brand']:<10} | {body_words:<12} | {total_words:<12} | {status}")

print("-" * 65)
if all_valid:
    print("ALL 8 POSTS MEET THE 300-500 WORD REQUIREMENT STRICTLY!")
else:
    print("WARNING: Some posts need adjustment to be strictly 300-500 words.")

