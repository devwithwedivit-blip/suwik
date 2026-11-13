import json

engagement_data = {
    "disclaimer": "Sample/demo engagement data. All metrics and comments are fictional benchmarks created for student coursework purposes.",
    "isSampleData": True,
    "days": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    "posts": [
        {
            "postId": 1,
            "slug": "zomato-push-notifications-moment-marketing",
            "views": 4820,
            "likes": 387,
            "shares": 142,
            "dailyViews": [420, 610, 850, 920, 780, 690, 550],
            "comments": [
                {
                    "id": "c1_1",
                    "author": "Rohan Deshmukh",
                    "avatar": "RD",
                    "timeAgo": "2 days ago",
                    "text": "Honestly, Zomato notification copywriters deserve a massive raise. The biryani notification during the India-Pak match had my entire hostel ordering!",
                    "replies": [
                        {
                            "id": "c1_1_r1",
                            "author": "Ananya Iyer",
                            "avatar": "AI",
                            "timeAgo": "1 day ago",
                            "text": "Haha true, but sometimes it feels like too much spam when you're on a diet! Still don't have the heart to turn off notifications though."
                        }
                    ]
                },
                {
                    "id": "c1_2",
                    "author": "Vikram Malhotra",
                    "avatar": "VM",
                    "timeAgo": "2 days ago",
                    "text": "Good analysis, but does humor actually translate into higher average order value (AOV) or just app opens? Would love to see data on basket size."
                },
                {
                    "id": "c1_3",
                    "author": "Sneha Kulkarni",
                    "avatar": "SK",
                    "timeAgo": "3 days ago",
                    "text": "The chai and samosa alert at 4:30 PM on a gloomy Tuesday in Mumbai is unbeatable timing. Classic psychological trigger marketing."
                },
                {
                    "id": "c1_4",
                    "author": "Kabir Sen",
                    "avatar": "KS",
                    "timeAgo": "4 days ago",
                    "text": "Moment marketing works until everybody starts copying the same template. Now even banking apps try to make funny jokes and it feels so forced.",
                    "replies": [
                        {
                            "id": "c1_4_r1",
                            "author": "Tanvi Verma",
                            "avatar": "TV",
                            "timeAgo": "3 days ago",
                            "text": "Bilkul sahi baat! Authenticity is key. When fintech apps try to sound like college memers it just comes across as cringe."
                        }
                    ]
                },
                {
                    "id": "c1_5",
                    "author": "Aarav Mehta",
                    "avatar": "AM",
                    "timeAgo": "5 days ago",
                    "text": "Great takeaway for marketing students. Micro-copy is really where UX and brand voice meet."
                }
            ]
        },
        {
            "postId": 2,
            "slug": "swiggy-instamart-quick-commerce-storytelling",
            "views": 3940,
            "likes": 294,
            "shares": 89,
            "dailyViews": [380, 490, 640, 720, 680, 560, 470],
            "comments": [
                {
                    "id": "c2_1",
                    "author": "Divya Nambiar",
                    "avatar": "DN",
                    "timeAgo": "1 day ago",
                    "text": "The emergency guest ad hit way too close to home! Mummy literally made me order cashews and biscuits on Instamart while guests were ringing the doorbell."
                },
                {
                    "id": "c2_2",
                    "author": "Karthik Raja",
                    "avatar": "KR",
                    "timeAgo": "2 days ago",
                    "text": "10-minute delivery is brilliant for emergencies, but isn't it creating unrealistic consumer expectations and crazy stress on delivery riders?",
                    "replies": [
                        {
                            "id": "c2_2_r1",
                            "author": "Rohan Deshmukh",
                            "avatar": "RD",
                            "timeAgo": "1 day ago",
                            "text": "Fair point Karthik. That's why Swiggy tries to emphasize dark store proximity in their PR now rather than reckless speeding."
                        }
                    ]
                },
                {
                    "id": "c2_3",
                    "author": "Meera Joshi",
                    "avatar": "MJ",
                    "timeAgo": "3 days ago",
                    "text": "Loved the breakdown of need-state positioning. They shifted the pitch from luxury speed to household peacekeeper."
                },
                {
                    "id": "c2_4",
                    "author": "Aditya Roy",
                    "avatar": "AR",
                    "timeAgo": "4 days ago",
                    "text": "Swiggy's storytelling is definitely warmer than Zepto or Blinkit, which feel more aggressive on raw discount callouts."
                },
                {
                    "id": "c2_5",
                    "author": "Pooja Hegde",
                    "avatar": "PH",
                    "timeAgo": "5 days ago",
                    "text": "Super crisp case study. Good reference material for our upcoming digital marketing presentation!"
                }
            ]
        },
        {
            "postId": 3,
            "slug": "amul-topical-billboards-amul-girl-branding",
            "views": 5610,
            "likes": 462,
            "shares": 215,
            "dailyViews": [510, 720, 980, 1050, 940, 790, 620],
            "comments": [
                {
                    "id": "c3_1",
                    "author": "Suresh Gopinath",
                    "avatar": "SG",
                    "timeAgo": "2 days ago",
                    "text": "Growing up in Mumbai, reading the Amul billboard near Worli was a daily routine. Unbelievable consistency for over 50 years!"
                },
                {
                    "id": "c3_2",
                    "author": "Nandita Sen",
                    "avatar": "NS",
                    "timeAgo": "2 days ago",
                    "text": "The fact that Dr. Kurien gave the creative agency total autonomy without boardroom interference was revolutionary for its time.",
                    "replies": [
                        {
                            "id": "c3_3",
                            "author": "Aarav Mehta",
                            "avatar": "AM",
                            "timeAgo": "1 day ago",
                            "text": "100%! If Amul had modern corporate committee sign-offs, half of those sharp political cartoons would never see the light of day."
                        }
                    ]
                },
                {
                    "id": "c3_4",
                    "author": "Harshvardhan Jain",
                    "avatar": "HJ",
                    "timeAgo": "3 days ago",
                    "text": "Do younger Gen Z kids still connect with Amul's puns, or is the format starting to age compared to animated short-form reels?"
                },
                {
                    "id": "c3_5",
                    "author": "Kavita Rao",
                    "avatar": "KR",
                    "timeAgo": "4 days ago",
                    "text": "They adapt very well on Instagram too! Whenever an Olympic medal happens or Chandrayaan lands, Amul's post is the first one people share on WhatsApp stories."
                },
                {
                    "id": "c3_6",
                    "author": "Zeeshan Ali",
                    "avatar": "ZA",
                    "timeAgo": "5 days ago",
                    "text": "Utterly Butterly Delicious is perhaps the most protected brand slogan in Asia. Case study highlighted the cooperative roots nicely."
                },
                {
                    "id": "c3_7",
                    "author": "Priya Sharma",
                    "avatar": "PS",
                    "timeAgo": "6 days ago",
                    "text": "Masterclass in brand resilience and emotional cultural integration."
                }
            ]
        },
        {
            "postId": 4,
            "slug": "cred-unconventional-celebrity-subversion",
            "brand": "CRED",
            "category": "Disruptive Celebrity Casting & Anti-Advertising",
            "views": 4130,
            "likes": 318,
            "shares": 167,
            "dailyViews": [340, 580, 790, 840, 670, 520, 390],
            "comments": [
                {
                    "id": "c4_1",
                    "author": "Aryan Chawla",
                    "avatar": "AC",
                    "timeAgo": "1 day ago",
                    "text": "Indiranagar ka Gunda remains the greatest IPL ad moment of the decade. Nobody ever expected Rahul Dravid to smash steering wheels!"
                },
                {
                    "id": "c4_2",
                    "author": "Ishita Ganguly",
                    "avatar": "IG",
                    "timeAgo": "2 days ago",
                    "text": "Unpopular opinion: The ads were hilarious entertainment, but I still had friends asking 'wait, what does CRED actually do?' for two years.",
                    "replies": [
                        {
                            "id": "c4_2_r1",
                            "author": "Vikram Malhotra",
                            "avatar": "VM",
                            "timeAgo": "1 day ago",
                            "text": "That was intentional though! The 'Not Everyone Gets It' tagline literally weaponized that confusion to build exclusivity."
                        }
                    ]
                },
                {
                    "id": "c4_3",
                    "author": "Deepak Nair",
                    "avatar": "DN",
                    "timeAgo": "3 days ago",
                    "text": "Subverting celebrity personas works so much better than traditional brand ambassador endorsements where they read a bland script."
                },
                {
                    "id": "c4_4",
                    "author": "Rhea Bhatia",
                    "avatar": "RB",
                    "timeAgo": "4 days ago",
                    "text": "The retro 90s nostalgia with Kumar Sanu and Neeraj Chopra was pure comedic genius. Excellent case breakdown."
                },
                {
                    "id": "c4_5",
                    "author": "Shubham Srivastava",
                    "avatar": "SS",
                    "timeAgo": "5 days ago",
                    "text": "Kunal Shah understands viral cultural codes better than almost any Indian founder. Great write-up!"
                }
            ]
        },
        {
            "postId": 5,
            "slug": "nykaa-content-led-commerce-community",
            "brand": "Nykaa",
            "category": "Content-to-Commerce & Community Advocacy",
            "views": 1480,
            "likes": 74,
            "shares": 31,
            "dailyViews": [120, 190, 260, 310, 280, 180, 140],
            "comments": [
                {
                    "id": "c5_1",
                    "author": "Simran Kaur",
                    "avatar": "SK",
                    "timeAgo": "2 days ago",
                    "text": "Nykaa's foundation shade finder and creator swatches saved me so much money. Buying beauty online without tutorials is impossible."
                },
                {
                    "id": "c5_2",
                    "author": "Anjali Deshmukh",
                    "avatar": "AD",
                    "timeAgo": "3 days ago",
                    "text": "Content-led commerce sounds fancy, but at its heart it's simply solving customer fear. Well put in the article."
                },
                {
                    "id": "c5_3",
                    "author": "Gaurav Bansal",
                    "avatar": "GB",
                    "timeAgo": "4 days ago",
                    "text": "Curious how Nykaa handles increasing competition from Tira and Sephora now. Content alone might not suffice in Tier 2 cities."
                },
                {
                    "id": "c5_4",
                    "author": "Meghna Roy",
                    "avatar": "MR",
                    "timeAgo": "5 days ago",
                    "text": "Their physical kiosks really closed the trust gap for cautious buyers who wanted to test smells and textures before ordering online."
                },
                {
                    "id": "c5_5",
                    "author": "Naveen Thomas",
                    "avatar": "NT",
                    "timeAgo": "6 days ago",
                    "text": "Solid case study showing that educating customers before selling yields lower return rates."
                }
            ]
        },
        {
            "postId": 6,
            "slug": "boat-lifestyle-branding-gen-z-affordability",
            "brand": "boAt",
            "category": "Lifestyle Repositioning & Gen Z Advocacy",
            "views": 1890,
            "likes": 86,
            "shares": 43,
            "dailyViews": [150, 240, 340, 410, 360, 230, 160],
            "comments": [
                {
                    "id": "c6_1",
                    "author": "Pranav Pillai",
                    "avatar": "PP",
                    "timeAgo": "1 day ago",
                    "text": "Aman Gupta realized early that college kids care way more about bass and colors than audiophile flat response curves. Smart positioning."
                },
                {
                    "id": "c6_2",
                    "author": "Rahul Khanna",
                    "avatar": "RK",
                    "timeAgo": "2 days ago",
                    "text": "True, but as an audiophile their sound profile is too boomy. However, from a marketing perspective, 'boAthead' tribe branding is undeniably effective.",
                    "replies": [
                        {
                            "id": "c6_2_r1",
                            "author": "Pranav Pillai",
                            "avatar": "PP",
                            "timeAgo": "1 day ago",
                            "text": "Haha audio purists hate it, but the mass market loves thumping Punjabi and hip-hop beats!"
                        }
                    ]
                },
                {
                    "id": "c6_3",
                    "author": "Geetika Chadha",
                    "avatar": "GC",
                    "timeAgo": "3 days ago",
                    "text": "Collaborating with Sunburn and IPL gave them immediate street cred among youngsters. Exactly what Sony and Sennheiser failed to do."
                },
                {
                    "id": "c6_4",
                    "author": "Tarun Saxena",
                    "avatar": "TS",
                    "timeAgo": "4 days ago",
                    "text": "The lesson for students is spot on: never compete on technical specs when you can redefine the entire emotional category."
                },
                {
                    "id": "c6_5",
                    "author": "Bhavna Mishra",
                    "avatar": "BM",
                    "timeAgo": "5 days ago",
                    "text": "Fascinating growth story. Affordable fashion wearables was the right wave to ride."
                }
            ]
        },
        {
            "postId": 7,
            "slug": "nike-just-do-it-purpose-storytelling",
            "brand": "Nike",
            "category": "Purpose-Driven Branding & Mythic Storytelling",
            "views": 1220,
            "likes": 58,
            "shares": 26,
            "dailyViews": [90, 160, 230, 280, 210, 150, 100],
            "comments": [
                {
                    "id": "c7_1",
                    "author": "Farhan Qureshi",
                    "avatar": "FQ",
                    "timeAgo": "1 day ago",
                    "text": "No brand understands the Hero's Journey archetype quite like Nike. You feel inspired to lace up and hit the road just watching their 60-second commercials."
                },
                {
                    "id": "c7_2",
                    "author": "Shalini Sundaram",
                    "avatar": "SS",
                    "timeAgo": "2 days ago",
                    "text": "The Colin Kaepernick campaign 'Believe in something, even if it means sacrificing everything' was the ultimate high-risk, high-reward purpose play."
                },
                {
                    "id": "c7_3",
                    "author": "Devendra Bisht",
                    "avatar": "DB",
                    "timeAgo": "3 days ago",
                    "text": "Nike never sells rubber and foam; they sell courage and self-transcendence. Timeless lesson for every aspiring brand strategist."
                },
                {
                    "id": "c7_4",
                    "author": "Neha Agarwal",
                    "avatar": "NA",
                    "timeAgo": "4 days ago",
                    "text": "Great point in section 2 about how Nike plays the role of the mentor, not the hero. The consumer is always the hero."
                },
                {
                    "id": "c7_5",
                    "author": "Amitabh Sen",
                    "avatar": "AS",
                    "timeAgo": "5 days ago",
                    "text": "Excellent coursework benchmark. Purpose marketing done authentically stands the test of decades."
                }
            ]
        },
        {
            "postId": 8,
            "slug": "coca-cola-share-a-coke-personalisation",
            "brand": "Coca-Cola",
            "category": "Mass Personalisation & Experiential Gifting",
            "views": 1640,
            "likes": 79,
            "shares": 38,
            "dailyViews": [130, 210, 290, 360, 310, 200, 140],
            "comments": [
                {
                    "id": "c8_1",
                    "author": "Vikas Oberoi",
                    "avatar": "VO",
                    "timeAgo": "1 day ago",
                    "text": "I remember hunting through supermarket coolers for 20 minutes just to find a bottle with my sister's name! Unbelievable psychological hook."
                },
                {
                    "id": "c8_2",
                    "author": "Tanya Mendonca",
                    "avatar": "TM",
                    "timeAgo": "2 days ago",
                    "text": "De-commoditizing a carbonated beverage into a personalized gift was pure genius. It removed all advertising cynicism."
                },
                {
                    "id": "c8_3",
                    "author": "Mohit Kapoor",
                    "avatar": "MK",
                    "timeAgo": "3 days ago",
                    "text": "And the user-generated content was free! Millions of people voluntarily posted pictures holding Coke cans on Instagram.",
                    "replies": [
                        {
                            "id": "c8_3_r1",
                            "author": "Vikas Oberoi",
                            "avatar": "VO",
                            "timeAgo": "2 days ago",
                            "text": "Exactly! The product packaging itself became the organic ad banner."
                        }
                    ]
                },
                {
                    "id": "c8_4",
                    "author": "Shruti Nair",
                    "avatar": "SN",
                    "timeAgo": "4 days ago",
                    "text": "Reversing an iconic trademarked logo for first names took immense corporate courage from the brand team."
                },
                {
                    "id": "c8_5",
                    "author": "Rajeshwari Patel",
                    "avatar": "RP",
                    "timeAgo": "5 days ago",
                    "text": "Brilliant closing takeaway. When consumers feel personal ownership, organic word-of-mouth follows automatically."
                }
            ]
        }
    ]
}

# Verify comment counts match array lengths (including nested replies)
for p in engagement_data["posts"]:
    count = 0
    for c in p["comments"]:
        count += 1
        if "replies" in c:
            count += len(c["replies"])
    p["commentCount"] = count
    print(f"Post {p['postId']}: {p['views']} views, {p['likes']} likes, {p['shares']} shares, {count} comments")

with open('f:/supiiiii/data/engagement.json', 'w', encoding='utf-8') as f:
    json.dump(engagement_data, f, indent=2, ensure_ascii=False)

print("Saved data/engagement.json successfully.")

