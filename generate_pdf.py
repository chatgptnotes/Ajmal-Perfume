"""
SILK — Scent Intelligence & Luxury Kinetics
PDF Deck Generator for Ajmal Perfumes Pitch
Luxury gold/cream theme — landscape 16:9
"""

from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
import os

# Page size: 13.333 x 7.5 inches (16:9)
PAGE_W = 13.333 * inch
PAGE_H = 7.5 * inch

# Colors
GOLD = HexColor('#BC8B57')
GOLD_DARK = HexColor('#754C28')
GOLD_MEDIUM = HexColor('#7E6040')
GOLD_BRIGHT = HexColor('#E5AD23')
WARM_BLACK = HexColor('#2B2826')
CREAM = HexColor('#F9F5F1')
BEIGE = HexColor('#F3ECE3')
SAND = HexColor('#E4D5C7')
LIGHT_BEIGE = HexColor('#F0E6DB')
TEXT_SEC = HexColor('#727272')
TEXT_MUTED = HexColor('#A4A4A4')
WHITE = HexColor('#FFFFFF')
SUCCESS = HexColor('#00940F')
ERROR = HexColor('#BE4040')


def bg(c):
    """Fill page with cream background."""
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def gold_bar(c, y, w, h=4):
    """Draw a gold accent bar."""
    c.setFillColor(GOLD)
    c.rect(0, y, w, h, fill=1, stroke=0)


def card(c, x, y, w, h, fill=BEIGE, border=None):
    """Draw a rounded card."""
    c.setFillColor(fill)
    if border:
        c.setStrokeColor(border)
        c.setLineWidth(1.5)
        c.roundRect(x, y, w, h, 8, fill=1, stroke=1)
    else:
        c.roundRect(x, y, w, h, 8, fill=1, stroke=0)


def text(c, x, y, txt, size=18, color=WARM_BLACK, bold=False, align='left', max_w=None):
    """Draw text."""
    c.setFillColor(color)
    font = 'Helvetica-Bold' if bold else 'Helvetica'
    c.setFont(font, size)
    if align == 'center' and max_w:
        tw = c.stringWidth(txt, font, size)
        x = x + (max_w - tw) / 2
    elif align == 'right' and max_w:
        tw = c.stringWidth(txt, font, size)
        x = x + max_w - tw
    c.drawString(x, y, txt)


def tag(c, x, y, txt, color=GOLD):
    """Draw a small uppercase tag."""
    text(c, x, y, txt, size=9, color=color, bold=True)


def bullet_list(c, x, y, items, size=12, color=TEXT_SEC, spacing=22):
    """Draw a bullet list."""
    for item in items:
        text(c, x, y, item, size=size, color=color)
        y -= spacing
    return y


def stat_card(c, x, y, w, h, number, label, num_color=GOLD):
    """Draw a stat card with big number and label."""
    card(c, x, y, w, h, BEIGE, SAND)
    text(c, x, y + h - 35, number, size=32, color=num_color, bold=True, align='center', max_w=w)
    # Label (multiline split by \n)
    lines = label.split('\n')
    ly = y + 25 + (len(lines) - 1) * 7
    for line in lines:
        text(c, x, ly, line.strip(), size=10, color=TEXT_SEC, align='center', max_w=w)
        ly -= 14


output_path = os.path.join(os.path.dirname(__file__), 'SILK_Retail_Intelligence_Ajmal.pdf')
c = canvas.Canvas(output_path, pagesize=(PAGE_W, PAGE_H))

I = inch  # shorthand

# ============================================================
# SLIDE 1: TITLE
# ============================================================
bg(c)
gold_bar(c, PAGE_H - 6, PAGE_W, 6)

text(c, 0.8*I, PAGE_H - 1.0*I, 'SILK', size=36, color=GOLD_DARK, bold=True)
text(c, 2.8*I, PAGE_H - 0.95*I, 'Scent Intelligence & Luxury Kinetics', size=12, color=GOLD, bold=True)

text(c, 0.8*I, PAGE_H - 2.2*I, 'AI-Powered', size=48, color=GOLD, bold=True)
text(c, 0.8*I, PAGE_H - 3.0*I, 'Retail Intelligence', size=48, color=WARM_BLACK, bold=True)
text(c, 0.8*I, PAGE_H - 3.8*I, 'Platform', size=48, color=WARM_BLACK, bold=True)

text(c, 0.8*I, PAGE_H - 4.8*I, "Built for India's Premium Retail Chains", size=20, color=TEXT_SEC)

c.setFillColor(GOLD)
c.rect(0.8*I, PAGE_H - 5.6*I, 2.5*I, 3, fill=1, stroke=0)
text(c, 0.8*I, PAGE_H - 5.9*I, 'FROM BILLING TO BRILLIANCE', size=10, color=TEXT_MUTED, bold=True)

text(c, 0, PAGE_H - 6.2*I, 'Prepared for Ajmal Perfumes', size=12, color=GOLD_MEDIUM, align='right', max_w=12.5*I)

c.showPage()

# ============================================================
# SLIDE 2: INDUSTRY LANDSCAPE
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'INDUSTRY LANDSCAPE')
text(c, 0.8*I, PAGE_H - 1.3*I, "India's Organized Retail Is at an Inflection Point", size=30, color=WARM_BLACK, bold=True)

stats = [("$28B", "India Beauty & Personal Care\nMarket by 2028"),
         ("18-22%", "Premium Fragrance\nCAGR"),
         ("78%", "Retail Chains Still on\nLegacy Billing Systems"),
         ("2.3x", "Faster Growth for Chains\nwith Real-Time Analytics")]
for i, (num, lbl) in enumerate(stats):
    sx = 0.8*I + i * 3.05*I
    stat_card(c, sx, PAGE_H - 4.0*I, 2.6*I, 1.5*I, num, lbl)

text(c, 0.8*I, PAGE_H - 5.0*I,
     "The industry is growing fast — but most retail infrastructure was built for a different era.",
     size=14, color=TEXT_SEC)
text(c, 0.8*I, PAGE_H - 5.3*I,
     "The winners will be the chains that close the gap between brand ambition and operational backbone.",
     size=14, color=TEXT_SEC)

c.showPage()

# ============================================================
# SLIDE 3: THE PROBLEM
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'THE PATTERN WE SEE', ERROR)
text(c, 0.8*I, PAGE_H - 1.3*I, 'What We Hear From Every Growing Retail Chain', size=30, color=WARM_BLACK, bold=True)

# Brand side
card(c, 0.8*I, PAGE_H - 4.6*I, 5.2*I, 2.5*I, BEIGE, SUCCESS)
text(c, 1.0*I, PAGE_H - 2.2*I, 'The Brand Side', size=14, color=SUCCESS, bold=True)
brand_items = ["Beautiful stores, strong heritage", "Loyal customer base, growing footprint",
               "Premium positioning, expanding portfolio", "Multi-channel presence (retail, e-commerce, shop-in-shop)"]
bullet_list(c, 1.2*I, PAGE_H - 2.6*I, ["  " + b for b in brand_items], size=12, color=TEXT_SEC)

# Ops side
card(c, 6.8*I, PAGE_H - 4.6*I, 5.5*I, 2.5*I, BEIGE, ERROR)
text(c, 7.0*I, PAGE_H - 2.2*I, 'The Operations Side', size=14, color=ERROR, bold=True)
ops_items = ["Manual billing slowing down peak hours", "No real-time visibility across stores",
             "HQ decisions based on yesterday's data", "Staff performance invisible until quarterly reviews",
             "Franchise and owned stores on different systems"]
bullet_list(c, 7.2*I, PAGE_H - 2.6*I, ["  " + o for o in ops_items], size=12, color=ERROR)

# Quote
card(c, 0.8*I, PAGE_H - 5.8*I, 11.5*I, 0.8*I, LIGHT_BEIGE, GOLD)
text(c, 1.2*I, PAGE_H - 5.3*I,
     '"We have 100+ stores but our HQ team spends Monday mornings calling store managers for weekend numbers."',
     size=12, color=TEXT_SEC)

c.showPage()

# ============================================================
# SLIDE 4: PLATFORM ARCHITECTURE
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'PLATFORM OVERVIEW')
text(c, 0.8*I, PAGE_H - 1.3*I, 'One Platform. Every Store. Every Insight.', size=30, color=WARM_BLACK, bold=True)

# Experience Layer
card(c, 0.8*I, PAGE_H - 3.2*I, 11.5*I, 1.1*I, LIGHT_BEIGE, GOLD)
text(c, 1.0*I, PAGE_H - 2.3*I, 'EXPERIENCE LAYER', size=9, color=GOLD, bold=True)
for i, item in enumerate(['AI Fragrance Advisor', 'WhatsApp CRM', 'Dynamic Pricing', 'L&D Academy']):
    card(c, 1.0*I + i * 2.8*I, PAGE_H - 3.1*I, 2.5*I, 0.4*I, BEIGE, GOLD)
    text(c, 1.0*I + i * 2.8*I, PAGE_H - 2.95*I, item, size=10, color=GOLD_DARK, align='center', max_w=2.5*I)

# Intelligence Layer
card(c, 0.8*I, PAGE_H - 4.5*I, 11.5*I, 1.1*I, LIGHT_BEIGE, GOLD_MEDIUM)
text(c, 1.0*I, PAGE_H - 3.6*I, 'INTELLIGENCE LAYER', size=9, color=GOLD_MEDIUM, bold=True)
for i, item in enumerate(['Demand Forecasting', 'Customer Analytics', 'Inventory Intelligence', 'Staff Performance AI']):
    card(c, 1.0*I + i * 2.8*I, PAGE_H - 4.4*I, 2.5*I, 0.4*I, BEIGE, GOLD_MEDIUM)
    text(c, 1.0*I + i * 2.8*I, PAGE_H - 4.25*I, item, size=10, color=GOLD_DARK, align='center', max_w=2.5*I)

# Foundation Layer
card(c, 0.8*I, PAGE_H - 5.8*I, 11.5*I, 1.1*I, BEIGE, GOLD_DARK)
text(c, 1.0*I, PAGE_H - 4.9*I, 'FOUNDATION LAYER — START HERE', size=9, color=GOLD_DARK, bold=True)
for i, item in enumerate(['Smart POS & Store Operations', 'Real-Time Command Center & Dashboards']):
    card(c, 1.2*I + i * 5.5*I, PAGE_H - 5.7*I, 4.8*I, 0.5*I, GOLD)
    text(c, 1.2*I + i * 5.5*I, PAGE_H - 5.5*I, item, size=12, color=WHITE, bold=True, align='center', max_w=4.8*I)

text(c, 0, PAGE_H - 6.3*I, 'The foundation powers the intelligence. The intelligence powers the experience.',
     size=12, color=TEXT_SEC, align='center', max_w=PAGE_W)

c.showPage()

# ============================================================
# SLIDE 5-12: Feature slides (simplified for PDF)
# ============================================================

feature_slides = [
    ("FOUNDATION MODULE", "Smart POS — The Nerve Center of Every Store",
     ["One-tap billing with auto product recognition",
      "Auto-applied promotions — no manual discount entry",
      "Offline-first — works without internet, syncs when back",
      "Franchise + company-owned on one unified system",
      "Multi-format: full store, kiosk, shop-in-shop counter",
      "Integrated payments: UPI, card, wallet — auto-reconciled",
      "GST-ready invoicing with instant digital receipts"],
     [("4-5 min → 45 sec", "Billing time"), ("Manual → Auto", "Promo application"),
      ("90 min → 5 min", "End-of-day reconciliation"), ("Next day → Real-time", "Data to HQ")]),

    ("FOUNDATION MODULE", "Command Center — See Everything. Right Now.",
     ["Store-by-store sales — today, this week, vs target",
      "Staff performance heatmap by store & region",
      "Top-selling SKUs by city, format, season",
      "Role-based views: store manager, area head, HQ, CEO",
      "Mobile-first: CEO checks Sunday sales from Dubai",
      "Auto-reports: daily, weekly, monthly — no spreadsheets",
      "Franchise owner portal with controlled visibility"],
     []),

    ("AI MODULE", "AI Fragrance Advisor — Turn Every Associate Into an Expert",
     ["Matches by occasion, intensity, budget, note preferences",
      "Learns from purchase history: 'Customers who bought X love Y'",
      "Cross-sell: attar buyer → suggest matching bakhoor",
      "Handles full range: Rs 375 body mist to Rs 7,500+ luxury oud",
      "Works on store tablet or associate's phone",
      "22-35% increase in average basket size",
      "New hire gets 80% of a 10-year expert's knowledge on day one"],
     []),

    ("AI MODULE", "Know What Will Sell, Where, Before It Happens",
     ["AI predicts SKU-level demand by store, by week",
      "Factors: Eid, Diwali, wedding season, weather",
      "Regional intelligence — South ≠ North ≠ Metro",
      "Computer vision: phone camera scans shelf, counts units",
      "Auto-replenishment triggers to warehouse",
      "Dead stock alerts: 'SKU hasn't moved in 60 days at 14 stores'",
      "40% stockout reduction  |  25% overstock reduction"],
     []),

    ("AI MODULE", "Your People Are Your Stores. Now You Can See.",
     ["Individual scorecards: sales/hour, conversion, basket size, upsell rate",
      "AI coaching: 'Ravi at Store 47 — high conversion but low basket'",
      "Gamification: leaderboards, streaks, benchmarking",
      "Replaces travel-heavy trainer model entirely",
      "AI tests associate before they face a customer",
      "Fragrance family quizzes, note profiles, scenarios",
      "New hire ramp-up: 3 weeks → 5 days"],
     []),

    ("AI MODULE", "SILK Academy — Where Your Team Levels Up",
     ["Micro-learning: bite-sized modules on product knowledge & selling",
      "Role-based paths: new hire, store manager, franchise partner",
      "AI-personalized curriculum adapts to performance gaps",
      "XP points, leaderboards, badges ('Oud Expert', 'Top Seller')",
      "Streak rewards: 7-day learning streaks unlock perks",
      "Team battles: store vs. store competitions tied to real KPIs",
      "3x completion rate  |  60% retention improvement  |  85% daily engagement"],
     []),

    ("AI MODULE", "Know Your Customer. Reach Them. Keep Them.",
     ["Unified profiles: retail, Shoppers Stop, Nykaa, Amazon, airports",
      "Segments: first-time, repeat, lapsed (90+ days), high-value",
      "LTV prediction: 'These 2,000 customers = 40% of next year's revenue'",
      "WhatsApp automation: restock reminders, birthday offers, campaigns",
      "Clienteling: top 20 customers with preferences & next-buy suggestions",
      "Two-way chat: questions, repeat orders via WhatsApp",
      "'Hi Priya, running low on Wisal? Reply YES to reorder.'"],
     []),

    ("AI MODULE", "The Right Price. The Right Store. The Right Time.",
     ["AI-recommended adjustments based on demand, stock, competition",
      "Markdown optimization: '15% off moves volume; 30% destroys margin'",
      "Channel harmonization: retail = Nykaa = Amazon",
      "Franchise pricing governance: floors & ceilings with flexibility",
      "Alert on marketplace price drift",
      "3-8% margin improvement  |  Zero channel price conflicts",
      "Markdown optimization alone typically pays for the platform"],
     []),
]

for tag_text, title, features, metrics in feature_slides:
    bg(c)
    tag(c, 0.8*I, PAGE_H - 0.6*I, tag_text)
    text(c, 0.8*I, PAGE_H - 1.3*I, title, size=28, color=WARM_BLACK, bold=True)
    bullet_list(c, 1.0*I, PAGE_H - 2.2*I, ["  " + f for f in features], size=13, color=TEXT_SEC, spacing=24)

    if metrics:
        card(c, 7.5*I, PAGE_H - 5.0*I, 4.8*I, 2.5*I, BEIGE, GOLD)
        text(c, 7.7*I, PAGE_H - 2.8*I, 'What Changes', size=16, color=GOLD, bold=True)
        my = PAGE_H - 3.3*I
        for before_after, label in metrics:
            text(c, 7.7*I, my, before_after, size=13, color=GOLD, bold=True)
            text(c, 7.7*I, my - 16, label, size=10, color=TEXT_MUTED)
            my -= 38

    c.showPage()

# ============================================================
# SLIDE 13: 9 AI ENGINES
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'TECHNOLOGY')
text(c, 0.8*I, PAGE_H - 1.3*I, '9 AI Engines. One Platform. Compounding Intelligence.', size=28, color=WARM_BLACK, bold=True)

engines = [
    ("FragranceAI", "Personalized scent recommendations", GOLD),
    ("DemandAI", "Predictive demand forecasting", GOLD_DARK),
    ("VisionAI", "Computer vision inventory counting", GOLD_MEDIUM),
    ("PricingAI", "Dynamic pricing optimization", GOLD),
    ("PeopleAI", "Staff performance & coaching", GOLD_DARK),
    ("AcademyAI", "Gamified L&D platform", GOLD_MEDIUM),
    ("CustomerAI", "Segmentation & churn prevention", GOLD),
    ("ConversationAI", "WhatsApp automation & chatbot", GOLD_DARK),
    ("InsightAI", "Natural language business queries", GOLD_MEDIUM),
]
for i, (name, desc, clr) in enumerate(engines):
    col = i % 3
    row = i // 3
    ex = 0.8*I + col * 4.0*I
    ey = PAGE_H - (2.3 + row * 1.1)*I
    card(c, ex, ey - 0.7*I, 3.7*I, 0.8*I, BEIGE, clr)
    text(c, ex + 10, ey - 0.15*I, name, size=13, color=clr, bold=True)
    text(c, ex + 10, ey - 0.5*I, desc, size=10, color=TEXT_SEC)

text(c, 0, PAGE_H - 6.2*I,
     'Each AI engine gets smarter over time. They feed each other — compounding intelligence.',
     size=12, color=TEXT_SEC, align='center', max_w=PAGE_W)

c.showPage()

# ============================================================
# SLIDE 14: ROI
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'BUSINESS CASE')
text(c, 0.8*I, PAGE_H - 1.3*I, 'What the Numbers Look Like', size=30, color=WARM_BLACK, bold=True)

# Savings
card(c, 0.8*I, PAGE_H - 5.0*I, 5.2*I, 2.8*I, BEIGE, GOLD)
text(c, 1.0*I, PAGE_H - 2.3*I, 'OPERATIONAL SAVINGS', size=9, color=GOLD, bold=True)
savings = [("15-20 hrs/store", "Monthly billing time saved"), ("30+ hrs/month", "HQ dashboard work eliminated"),
           ("70% reduction", "Inventory counting time"), ("3 wks → 5 days", "New hire training"), ("Near-zero", "Pricing errors")]
sy = PAGE_H - 2.8*I
for val, lbl in savings:
    text(c, 1.2*I, sy, val, size=12, color=GOLD, bold=True)
    text(c, 3.5*I, sy, lbl, size=11, color=TEXT_SEC)
    sy -= 22

# Revenue
card(c, 6.8*I, PAGE_H - 5.0*I, 5.5*I, 2.8*I, BEIGE, GOLD)
text(c, 7.0*I, PAGE_H - 2.3*I, 'REVENUE UPLIFT', size=9, color=GOLD, bold=True)
uplift = [("22-35%", "Basket size increase (AI recs)"), ("40%", "Stockout reduction = captured sales"),
          ("15-20%", "Repeat purchase improvement"), ("3-8%", "Margin improvement (dynamic pricing)")]
uy = PAGE_H - 2.8*I
for val, lbl in uplift:
    text(c, 7.2*I, uy, val, size=13, color=GOLD, bold=True)
    text(c, 9.2*I, uy, lbl, size=11, color=TEXT_SEC)
    uy -= 24

# CTA box
card(c, 0.8*I, PAGE_H - 6.6*I, 11.5*I, 1.2*I, GOLD)
text(c, 0, PAGE_H - 5.6*I, 'For a 100-store retail chain', size=12, color=WHITE, align='center', max_w=PAGE_W)
text(c, 0, PAGE_H - 6.05*I, 'Rs 8-12 Cr Annual Impact', size=30, color=WHITE, bold=True, align='center', max_w=PAGE_W)
text(c, 0, PAGE_H - 6.4*I, 'Within 18 months  |  Platform payback: 4-6 months', size=12, color=WHITE, align='center', max_w=PAGE_W)

c.showPage()

# ============================================================
# SLIDE 15: IMPLEMENTATION
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'ROLLOUT')
text(c, 0.8*I, PAGE_H - 1.3*I, 'Value in 8 Weeks. Full Platform in 6 Months.', size=30, color=WARM_BLACK, bold=True)

phases = [
    ("P1", "Foundation — Smart POS + Command Center", "Weeks 1-8",
     "Deploy across 10-15 pilot stores. HQ dashboards live. Zero disruption.", GOLD_DARK),
    ("P2", "Intelligence — Forecasting, Inventory AI, SILK Academy", "Weeks 9-16",
     "Activate demand forecasting, inventory intelligence, staff performance AI.", GOLD),
    ("P3", "Experience — FragranceAI, WhatsApp CRM, Dynamic Pricing", "Weeks 17-24",
     "Full AI suite deployed. Rollout across all stores.", GOLD_MEDIUM),
]
for i, (num, title, time, desc, clr) in enumerate(phases):
    py = PAGE_H - (2.3 + i * 1.2)*I
    card(c, 0.8*I, py - 0.8*I, 11.5*I, 1.0*I, BEIGE, clr)
    text(c, 1.0*I, py - 0.15*I, num, size=18, color=clr, bold=True)
    text(c, 1.6*I, py - 0.15*I, title, size=14, color=WARM_BLACK, bold=True)
    text(c, 0, py - 0.15*I, time, size=11, color=GOLD, bold=True, align='right', max_w=12.0*I)
    text(c, 1.6*I, py - 0.5*I, desc, size=11, color=TEXT_SEC)

c.showPage()

# ============================================================
# SLIDE 16: WHY SILK — CTA
# ============================================================
bg(c)
tag(c, 0.8*I, PAGE_H - 0.6*I, 'WHY SILK, WHY NOW')
text(c, 0.8*I, PAGE_H - 1.3*I, 'Built for This Moment', size=34, color=WARM_BLACK, bold=True)

pillars = [
    ("Retail-Native", "Built exclusively for retail. Not horizontal SaaS — retail-native, retail-only.", GOLD),
    ("India-First", "GST, UPI, Hindi support, offline-first, WhatsApp integration.", GOLD_DARK),
    ("AI-Native", "AI is the architecture. Every module generates data, every data point trains AI.", GOLD_MEDIUM),
    ("Scale-Ready", "100+ store chains. Multi-format, multi-channel, franchise-ready.", GOLD),
]
for i, (title, desc, clr) in enumerate(pillars):
    col = i % 2
    row = i // 2
    px = 0.8*I + col * 6.0*I
    py = PAGE_H - (2.3 + row * 1.5)*I
    card(c, px, py - 1.1*I, 5.5*I, 1.2*I, BEIGE, clr)
    text(c, px + 15, py - 0.2*I, title, size=16, color=clr, bold=True)
    text(c, px + 15, py - 0.6*I, desc, size=11, color=TEXT_SEC)

# CTA
card(c, 2.5*I, PAGE_H - 6.8*I, 8.0*I, 1.4*I, GOLD)
text(c, 2.5*I, PAGE_H - 5.7*I, "Let's Start With a Pilot", size=24, color=WHITE, bold=True, align='center', max_w=8.0*I)
text(c, 2.5*I, PAGE_H - 6.15*I, '10-15 stores  ·  8 weeks  ·  Let the results speak', size=14, color=WHITE, align='center', max_w=8.0*I)
text(c, 2.5*I, PAGE_H - 6.55*I, 'SILK  |  silkai.in', size=12, color=WHITE, align='center', max_w=8.0*I)

c.showPage()

# Save
c.save()
print(f"[OK] PDF saved to: {output_path}")
