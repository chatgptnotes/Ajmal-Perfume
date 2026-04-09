"""
Bettroi Demo App — Gemini-Powered Design Generation
Generates UI mockup images for each platform screen using Ajmal's luxury brand identity.
"""

import base64
import json
import os
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyAe6iNfpMqXhw__3qsWi6es9rjq3aDEbUs")
OUTPUT_DIR = Path(__file__).parent / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

# ── Models ──────────────────────────────────────────────────
DESIGN_MODEL = "gemini-3-pro-image-preview"       # Best for UI mockups
PATTERN_MODEL = "gemini-3.1-flash-image-preview"   # Fast for patterns/textures

BRAND_CONTEXT = """
BRAND: Ajmal Perfumes — premium Arabian fragrance house, est. 1951, Dubai.
Indian retail presence: 100+ stores across Mumbai, Delhi, Hyderabad, Bangalore, Chennai, Lucknow, Jaipur.
Product range: EDP, EDT, Attar, Bakhoor, Body Mist, Gift Sets. Price range ₹375 to ₹7,500+.

EXACT BRAND COLORS (from ajmal.com):
- Signature Gold: #BC8B57 (primary accent — buttons, CTAs, highlights)
- Gold Dark: #754C28 (headings, titles)
- Gold Medium: #7E6040 (secondary headings)
- Warm Black: #2B2826 (body text — NEVER pure black)
- Cream Background: #F9F5F1 (primary page background — NEVER pure white)
- Beige Section: #F3ECE3 (card backgrounds, section fills)
- Sand: #E4D5C7 (tertiary areas, footer)
- Light Beige: #F0E6DB (sidebar, secondary backgrounds)

TYPOGRAPHY STYLE:
- Headings: elegant sans-serif, generous letter-spacing (1-2px), uppercase for labels
- Body: clean sans-serif, warm black text
- Numbers/metrics: bold, gold-accented

DESIGN LANGUAGE:
- Light, airy luxury — high-end boutique aesthetic, NOT a tech dashboard
- Warm cream/beige backgrounds with gold accents
- Cards with soft gold-tinted shadows (rgba(188, 139, 87, 0.25))
- Rounded corners (12-16px) on cards
- Pill-shaped buttons (border-radius: 50px)
- Subtle Middle Eastern geometric patterns as decorative elements
- Data visualizations in gold/bronze/amber tones
- Left sidebar navigation with cream/beige background
- Top bar with role switcher and notification bell
"""

# ── Screen Prompts ──────────────────────────────────────────

SCREENS = {
    "01_command_center": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup image of a COMMAND CENTER DASHBOARD for this luxury retail intelligence platform.

LAYOUT:
- Left sidebar (220px wide, light beige #F0E6DB background) with navigation:
  Logo "Bettroi" at top in gold, then grouped menu items:
  FOUNDATION: Command Center (active, gold highlight), Smart POS
  INTELLIGENCE: Demand Forecast, Inventory, Staff, Customers
  EXPERIENCE: Fragrance AI, Academy, WhatsApp, Pricing
- Top bar: "Ajmal Perfumes" brand name, role dropdown "CEO View", notification bell, today's date
- Main content area on cream #F9F5F1 background

CONTENT (main area):
- Welcome banner: "Good Morning, Ajmal HQ" with today's date
- 4 stat cards in a row: "Today's Revenue ₹47.3L", "Transactions 1,847", "Avg Basket ₹2,560", "Active Stores 108/112"
  Each card: beige #F3ECE3 background, large gold number, subtle up/down trend arrow
- Below: 2-column layout
  Left: "Sales Trend" line chart (7 days) in gold/amber tones on beige card
  Right: "Top 5 Stores" horizontal bar chart in gold gradient
- Below that: 2-column
  Left: "Alerts" panel with 3 warning cards (amber border) — "Store 23 Mumbai below target", "Low stock: Dahn Al Oudh", "142 high-value customers inactive"
  Right: "Top Selling SKUs" — 5 product rows with gold-tinted rank badges

BOTTOM: A scrolling ticker strip showing recent transactions: "Store 47 Mumbai — Dahn Al Oudh 50ml — ₹4,200 — 2 min ago"

Style: warm, luxurious, clean. The feeling of a premium brand's private intelligence center.
Resolution: 1920x1080. Pixel-perfect, production-ready UI design.
""",

    "02_fragrance_advisor": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup image of an AI FRAGRANCE ADVISOR screen for this luxury retail platform.

LAYOUT: Same sidebar and top bar as the Command Center. Main content area on cream background.

CONTENT:
- Page title: "AI Fragrance Advisor" with subtitle "Turn Every Associate Into an Expert"
- A 3-step progress indicator at top: Step 1 "Preferences" (active, gold), Step 2 "AI Matching", Step 3 "Recommendations" — connected by a gold line

STEP 1 (shown as active):
- Elegant form with 4 selection areas:
  1. "Occasion" — pill-shaped selector buttons: Gift, Personal, Wedding, Eid Special, Date Night
  2. "Intensity" — 3 options: Light & Fresh, Medium & Balanced, Bold & Lasting (with gold radio dots)
  3. "Budget" — slider or 3 pill buttons: Under ₹1,000, ₹1,000-3,000, ₹3,000+
  4. "Preferred Notes" — tag-style multi-select: Floral, Woody, Oud, Musky, Fresh, Citrus, Amber
  Each section in its own beige card with gold section headers

- Right side: An elegant illustration/silhouette of a perfume bottle in gold outline on cream

- Bottom: Large gold pill button "Find Perfect Fragrance →"

Style: feels like a luxury concierge experience, not a form. Warm, inviting, with gold accents guiding the eye.
Resolution: 1920x1080. Pixel-perfect UI design.
""",

    "03_fragrance_results": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup of the AI FRAGRANCE ADVISOR RESULTS screen.

LAYOUT: Same sidebar and top bar. Main content on cream background.

CONTENT:
- Step indicator showing Step 3 "Recommendations" as active (gold)
- Title: "We Found 4 Perfect Matches" with sparkle icon

- 4 product recommendation cards in a row:
  Card 1 (BEST MATCH):
    - Gold "95% Match" badge, gold border glow
    - Product image placeholder (elegant perfume bottle silhouette)
    - "Dahn Al Oudh" — ₹6,500
    - "Rich oud base with rose heart, perfect for special occasions"
    - Gold star rating 4.8
    - "Talking Point: Customers who love this also buy Amber Wood"

  Card 2 (92% Match):
    - "Amber Wood" — ₹3,200
    - "Warm amber with sandalwood, versatile day-to-night"

  Card 3 (87% Match):
    - "Wisal" — ₹2,400
    - "Elegant floral with precious woods"

  Card 4 (82% Match):
    - "Evoke Gold" — ₹1,800
    - "Fresh citrus opening, warm dry down"

- Each card: beige background, soft gold shadow, rounded corners, heart/wishlist icon
- Below cards: "Cross-sell suggestion" banner: "Customers buying Dahn Al Oudh often add Bakhoor — ₹850. Bundle saves 15%"
- Bottom: Two buttons — "← New Search" (outline) and "Save to Clienteling" (gold filled)

Style: the reveal moment — luxurious product presentation. Cards should feel like they're displayed on velvet.
Resolution: 1920x1080.
""",

    "04_academy_leaderboard": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup of the L&D ACADEMY / LEADERBOARD screen.

LAYOUT: Same sidebar and top bar. Main content on cream background.

CONTENT:
- Page title: "Bettroi Academy" with subtitle "Where Your Team Levels Up"
- Tab bar: "Leaderboard" (active, gold underline), "My Learning", "Certifications", "Team Battles"

LEFT SECTION (60% width) — LEADERBOARD:
- Time filter pills: "This Week" (active, gold), "This Month", "All Time"
- Top 3 podium-style cards:
  #1: "Fatima K." — Store 12 Mumbai — 2,450 XP — Gold crown icon — "🏆 Oud Expert" badge
  #2: "Ravi S." — Store 47 Delhi — 2,180 XP — Silver badge
  #3: "Priya M." — Store 8 Bangalore — 1,920 XP — Bronze badge
  Each with XP progress bar in gold gradient, small avatar circle, store name

- Below: ranked list #4-#10 with smaller rows, XP bars, trend arrows (↑3, ↓1, →)

RIGHT SECTION (40% width):
- "Your Badges" card showing 6 badge icons in a 3x2 grid:
  Oud Expert (gold, earned), Top Seller (gold, earned), Customer Champion (gold, earned),
  Bakhoor Master (locked/gray), 30-Day Streak (locked), Regional Star (locked)
  Each badge: circular with ornate gold border, icon in center

- "Active Streak" card: "🔥 12 Days" with flame animation implied, "Keep it up! 3 more days for Gold Streak badge"

- "Store Battle" card: "Store 12 vs Store 23 — Mumbai Derby" with two progress bars and score

Style: gamification meets luxury — gold XP bars, ornate badge designs, excitement without being childish.
Resolution: 1920x1080.
""",

    "05_smart_pos": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup of a SMART POS (Point of Sale) billing screen.

LAYOUT: Same sidebar (collapsed to icon-only, 60px wide) and slim top bar. Main content maximized.

CONTENT:
- Split view:
  LEFT (55%): "Current Transaction"
    - Customer: "Arjun Mehta — Gold Member" with loyalty badge
    - Item list table:
      1. Dahn Al Oudh 50ml — ₹6,500 — Qty: 1
      2. Wisal EDP 50ml — ₹2,400 — Qty: 1
      3. Bakhoor Al Mas — ₹850 — Qty: 2
    - Auto-applied promo banner (green/gold): "Festival Offer: 10% off on 3+ items — ₹975 saved!"
    - Subtotal: ₹10,600 → After discount: ₹9,625
    - GST (18%): ₹1,732.50
    - TOTAL: ₹11,357.50 (large, gold, bold)

  RIGHT (45%): "Quick Actions"
    - Product search bar with gold border
    - 8 quick-access product tiles (2x4 grid) with product images, names, prices
    - Payment method pills: "UPI" (active), "Card", "Cash", "Wallet"
    - Large gold "Complete Transaction ✓" button at bottom

- Bottom status bar: "Store 12 Mumbai | Terminal 3 | Offline Mode: Synced ✓ | Today: 47 transactions"

Style: efficient but elegant. A luxury POS that feels premium, not clinical.
Resolution: 1920x1080.
""",

    "06_staff_performance": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup of a STAFF PERFORMANCE screen.

LAYOUT: Same sidebar and top bar. Main content on cream background.

CONTENT:
- Page title: "Staff Performance" with filter: "Store 12 — Mumbai" dropdown

LEFT (55%) — Individual Scorecard:
- Staff card header: Avatar circle, "Fatima Khan", "Senior Associate", "Store 12 Mumbai", "Joined: Mar 2024"
- Performance metrics in 2x2 grid of beige cards:
  "Sales/Hour: ₹4,200" (gold, ↑12% trend)
  "Conversion Rate: 34%" (green arrow up)
  "Avg Basket: ₹3,100" (gold)
  "Upsell Rate: 28%" (amber, needs improvement marker)
- Bar chart: "Monthly Performance Trend" — 6 months, gold bars
- "Certifications": 3 badge icons (Oud Expert, Product Master, POS Pro)

RIGHT (45%) — AI Coaching:
- "AI Coaching Insight" card with gold brain icon:
  "Fatima has high conversion (34%) but below-average upsell rate (28%).
   Recommended: Complete 'Cross-sell Mastery' module in Academy.
   Staff with similar profiles saw 40% upsell improvement after this module."
- "Quick Actions" buttons: "Assign Training", "Schedule 1:1", "View Full History"
- "Team Comparison" mini chart: showing Fatima vs store average vs top performer

Style: data-rich but warm. Performance data presented with dignity, not surveillance.
Resolution: 1920x1080.
""",

    "07_customer_analytics": f"""
{BRAND_CONTEXT}

Generate a SINGLE high-fidelity UI mockup of a CUSTOMER ANALYTICS / PROFILE screen.

LAYOUT: Same sidebar and top bar. Main content on cream background.

CONTENT:
- Page title: "Customer Intelligence" with search bar

CUSTOMER PROFILE (full width):
- Header card: "Priya Sharma" — "High-Value Loyalist" gold segment badge — LTV: ₹1,24,000 — Member since 2022
- Churn risk indicator: green "Low Risk" with small gauge

- 3-column layout below:
  Column 1 — "Purchase History":
    Timeline of purchases across channels:
    "Mar 2026 — Retail Store 8 BLR — Wisal 50ml — ₹2,400"
    "Jan 2026 — Nykaa — Amber Wood 100ml — ₹4,800"
    "Nov 2025 — Amazon — Gift Set — ₹3,200"
    "Sep 2025 — Retail Store 12 MUM — Dahn Al Oudh — ₹6,500"
    Channel icons (store, Nykaa, Amazon) next to each entry

  Column 2 — "Preferences & Patterns":
    "Preferred Notes: Oud, Amber, Rose"
    "Avg Purchase Cycle: 2.5 months"
    "Next Purchase Predicted: April 2026"
    "Preferred Channel: Retail (60%), Online (40%)"
    Pie chart of channel split in gold/amber tones

  Column 3 — "Recommended Actions":
    Action card 1: "Send restock reminder — Wisal likely running low"
    Action card 2: "Invite to Eid preview event — matches VIP segment"
    Action card 3: "Cross-sell: She hasn't tried Bakhoor yet"
    Each with gold "Execute →" button

Style: unified customer view that feels like a luxury concierge dossier, not a CRM spreadsheet.
Resolution: 1920x1080.
""",

    "08_pattern_sidebar": f"""
{BRAND_CONTEXT}

Generate a SEAMLESS TILEABLE PATTERN inspired by traditional Arabian geometric art (mashrabiya / Islamic geometric patterns).

Requirements:
- Extremely subtle — meant as a background texture at 5-8% opacity
- Gold (#BC8B57) lines on transparent or cream (#F9F5F1) background
- Clean geometric: interlocking stars, hexagons, or arabesque curves
- Should tile seamlessly when repeated
- Delicate thin lines (1-2px weight feel)
- NOT heavy or overwhelming — whisper-light decorative element
- Size: 400x400 pixels, tileable

This will be used as a subtle sidebar background texture in a luxury retail dashboard.
""",
}


def generate_image(prompt: str, output_name: str, model: str = DESIGN_MODEL) -> bool:
    """Call Gemini API to generate an image from a text prompt."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "temperature": 1.0,
        },
    }

    req = Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        print(f"  Calling {model}...")
        with urlopen(req, timeout=120) as resp:
            data = json.load(resp)
    except HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"  ERROR {e.code}: {body[:300]}")
        return False
    except Exception as e:
        print(f"  ERROR: {e}")
        return False

    # Extract image from response
    candidates = data.get("candidates", [])
    for candidate in candidates:
        parts = candidate.get("content", {}).get("parts", [])
        for part in parts:
            if "inlineData" in part:
                mime = part["inlineData"].get("mimeType", "image/png")
                ext = "png" if "png" in mime else "jpg" if "jpeg" in mime or "jpg" in mime else "webp"
                img_data = base64.b64decode(part["inlineData"]["data"])
                out_path = OUTPUT_DIR / f"{output_name}.{ext}"
                out_path.write_bytes(img_data)
                size_kb = len(img_data) / 1024
                print(f"  [OK] Saved: {out_path.name} ({size_kb:.0f} KB)")
                return True
            if "text" in part:
                # Some models return text alongside or instead of image
                text_snippet = part["text"][:200]
                if text_snippet.strip():
                    print(f"  (text response): {text_snippet}")

    print("  [FAIL] No image found in response")
    return False


def main():
    print("=" * 60)
    print("Bettroi Demo App — Gemini Design Generation")
    print("=" * 60)
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Design model: {DESIGN_MODEL}")
    print(f"Pattern model: {PATTERN_MODEL}")
    print()

    results = {}
    for name, prompt in SCREENS.items():
        # Skip already-generated mockups
        existing = list(OUTPUT_DIR.glob(f"{name}.*"))
        if existing:
            print(f"\n[{name}] -- SKIPPED (already exists: {existing[0].name})")
            results[name] = True
            continue
        print(f"\n[{name}]")
        model = PATTERN_MODEL if "pattern" in name else DESIGN_MODEL
        ok = generate_image(prompt.strip(), name, model)
        results[name] = ok
        if ok:
            # Save the prompt too for reference
            prompt_path = Path(__file__).parent / "prompts" / f"{name}.txt"
            prompt_path.write_text(prompt.strip(), encoding="utf-8")
        # Rate limit courtesy
        time.sleep(2)

    print("\n" + "=" * 60)
    print("RESULTS:")
    for name, ok in results.items():
        status = "[OK]" if ok else "[FAIL]"
        print(f"  {status}  {name}")

    success = sum(1 for v in results.values() if v)
    print(f"\n{success}/{len(results)} mockups generated successfully.")
    print(f"Check: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
