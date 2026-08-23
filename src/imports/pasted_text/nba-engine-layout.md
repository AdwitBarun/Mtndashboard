NBA ENGINE PAGE LAYOUT REFACTOR PROMPT
Redesign the Next Best Action Engine page to achieve a cleaner enterprise dashboard layout with perfect visual balance, zero unnecessary whitespace, no horizontal scrolling, and aligned component structure.
Overall Design Principles
Maintain the existing design language, colors, cards, typography, and hierarchy.
Do NOT redesign the visual style.
Only improve layout, alignment, spacing, responsiveness, and component positioning.
Eliminate all unnecessary white space.
Eliminate all horizontal scrolling.
Ensure every major container aligns to a clean grid.
Left and right columns should feel visually balanced with equal page weight.
All cards should share consistent heights whenever possible.
Components should snap to a 12-column enterprise dashboard grid.
1. Main Content Area Rebalancing
Current issue:
Left side feels content-heavy.
Right side becomes a long vertical stack.
Large white space appears below Offer Rankings section.
Required change:
Create a 2-column dashboard layout
Left Column (70%)
AI Recommendation Hero Card
ML Decision Factors
Offer Rankings & Alternatives
Right Column (30%)
Propensity Score
Signal Summary
Only these two cards should remain in the top-right area.
This creates visual balance and removes excess vertical scrolling.
2. Move Recommended Delivery Channel & Content Assignment
Current issue:
Recommended Delivery Channel
Content Assignment
are stacked far below on the right side.
This creates:
empty page space
broken visual flow
long scroll
Required change
Move both cards directly below:
Offer Rankings & Alternatives
Arrange horizontally.
New row structure:
Plain Text
---------------------------------------------------
| Offer Rankings & Alternatives                  |
---------------------------------------------------
---------------------------------------------------
| Recommended Delivery | Content Assignment      |
---------------------------------------------------
Rules:
Both cards must sit side-by-side.
Equal width.
Same height.
Top aligned.
Bottom aligned.
No vertical stacking.
3. Bottom Three Sections Horizontal Alignment
Current issue:
Lower page components are not aligned evenly.
Required change:
Place all bottom action-oriented cards in a single horizontal row.
Example:
Plain Text
---------------------------------------------------
| Offer Rankings & Alternatives                  |
---------------------------------------------------
---------------------------------------------------
| Delivery Channel | Content Assignment | Approval |
---------------------------------------------------
All 3 cards:
Same width
Same height
Same top edge
Same bottom edge
No staggered placement.
No floating sections.
No whitespace beneath them.
4. Approve Recommendation Button Position
Current issue:
Approval section sits alone under Content Assignment.
Looks disconnected from workflow.
Required change:
Move approval container into the same workflow row.
Structure:
Plain Text
-----------------------------------------------------------
| Delivery Channel | Content Assignment | Approval Panel |
-----------------------------------------------------------
Approval Panel contains:
Approve Recommendation button
Offer Value
Acceptance Probability
Channel
Revenue Impact
Button should:
span full panel width
remain visually prominent
stay aligned with neighboring cards
Never appear below the page.
Never float separately.
5. Footer Redesign
Current issues:
Horizontal scrollbar appears.
Customer ID causes overflow.
Footer content exceeds viewport width.
Required changes:
Remove
Customer ID / Subscriber ID completely.
Delete:
Plain Text
Customer ID
SUB-10001


Retain
Decision Time
Segment
Risk Band
Opportunity Window
Expected Revenue
Confidence
Footer Layout Rules
Use responsive grid:
Plain Text
Decision Time
Segment
Risk Band
Opportunity Window
Expected Revenue
Confidence
Requirements:
Fit fully within viewport width.
No horizontal scrolling.
No truncated content.
Equal spacing.
Responsive wrapping if necessary.
All footer values center-aligned vertically.
6. Alignment & Whitespace Optimization
Current issue:
Cards do not visually terminate at the same horizontal level.
Result:
uneven page weight
awkward gaps
large empty zones
Required changes:
Every section row must have aligned card heights
For example:
Plain Text
Propensity Score
Signal Summary
Should align perfectly.
Likewise:
Plain Text
Delivery Channel
Content Assignment
Approval Panel
Should share identical heights.
Remove Excess Bottom Whitespace
Page should end naturally after:
Plain Text
Delivery Channel
Content Assignment
Approval Panel
No giant blank canvas underneath.
No dead scrolling area.
7. Content Assignment Layout Improvement
Current card is tall and narrow.
Convert to a compact enterprise card.
Display metrics in a structured grid.
Example:
Plain Text
Language       Tone
English        Warm + Benefit
Personalization   Expected CTR
High             12.6%
Strategy Theme
Upsell Growth
Use:
2-column internal grid
consistent spacing
reduced height
8. Recommended Delivery Channel Layout Improvement
Current card uses excessive vertical spacing.
Compress into enterprise format.
Example:
Plain Text
WhatsApp (Primary)
Score 0.86
Reasons:
• Highest engagement
• Preferred channel
• Strong campaign history
Alternatives:
SMS | App Push
Reduce vertical card height by 25-30%.
9. Visual Grid Requirements
Every row should follow:
Row 1
Plain Text
Recommendation Hero
Propensity Score


Row 2
Plain Text
ML Decision Factors
Signal Summary


Row 3
Plain Text
Offer Rankings & Alternatives


Row 4
Plain Text
Delivery Channel
Content Assignment
Approval Panel


Footer
Plain Text
Decision Time | Segment | Risk Band | Opportunity Window | Expected Revenue | Confidence
No Customer ID.
No horizontal scrollbar.
No uneven card stacking.
No long right rail.
No excessive vertical whitespace.
Expected Outcome
The final NBA page should feel like a modern telecom decisioning cockpit where:
layout is perfectly balanced
all sections align to a clean grid
right side is no longer heavier than left side
footer remains fully visible without scrolling
bottom workflow cards sit in a single connected action row
recommendation approval becomes the natural workflow endpoint
no large blank areas exist anywhere on the page
dashboard appears presentation-ready and executive-grade.