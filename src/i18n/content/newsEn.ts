import type { NewsItem } from '../../types'

/** English pack keyed by news id — tag/source keep Chinese originals for i18n maps */
export const NEWS_EN_BY_ID: Record<string, Pick<NewsItem, 'title' | 'summary' | 'body'>> = {
  'huang-return-1': {
    title: 'Jensen Huang Returns to Nvidia: Board Unanimously Restores CEO Role',
    summary:
      'Nvidia says Jensen Huang is back as president, CEO, and board member; markets watch how the governance saga winds down.',
    body: [
      'Nvidia issued a statement saying that after discussion the board voted unanimously to restore Jensen Huang as president, chief executive officer, and board member, effective immediately. The release stressed that the board values his candor and his ability to lead the company.',
      'Once the news broke, markets quickly priced in lower uncertainty: whether the governance flare-up cools, and whether customer and supply-chain confidence holds steady, are the main things to watch over the next few sessions.',
      'For operations, the core story is still data-center demand, delivery capacity, and gross margin. Leadership settled does not automatically strengthen fundamentals, but it removes the narrative discount that comes from a leadership vacuum.',
      'Investors should split the "return" into two layers: whether governance and reputation risk are converging, and whether earnings and guidance keep validating AI infrastructure spending. The first drives sentiment; the second determines whether valuations can hold.',
      'Reminder: personality-driven news can move prices sharply; position discipline should come before headline heat. This site is for learning only and is not investment advice.',
    ],
  },
  'huang-return-2': {
    title: 'Huang Back at Headquarters: Cheers and Apology Footage Surface',
    summary:
      'Public videos show Huang at the Santa Clara campus with employees embracing him; he also apologized for the turmoil from the controversy.',
    body: [
      'Multiple outlets cited video and official social posts showing Huang had returned to Nvidia’s California headquarters. Clips show employees applauding and hugging him, with cheers of his name "Jensen."',
      'In public remarks, Huang apologized for the unease the episode caused the team and reiterated focus on the company’s long-term path. For culture and talent retention, showing up in person often calms nerves more than a cold press release.',
      'From a media angle, the comeback narrative quickly dominated finance headlines, and short-term money may trade a sentiment rebound. Over the medium term, you still need capex from cloud giants, shipment cadence, and next-gen product milestones to pan out.',
      'For everyday investors, separate social buzz from order validation: you can watch the excitement, but decisions should rest on checkable operating metrics.',
    ],
  },
  'huang-return-3': {
    title: 'Trump Voices Support: Calls Restoring Huang the "Right Decision"',
    summary:
      'The U.S. president publicly congratulated Nvidia’s board; markets also fold political statements into short-term sentiment.',
    body: [
      'Around the time Nvidia announced Huang’s reinstatement, Trump said on social media that restoring him was the "right and appropriate decision," and that America needs Huang to keep leading Nvidia.',
      'Political endorsements amplify headlines but do not rewrite revenue and earnings. What shapes medium-term pricing is still export-control boundaries, major-customer purchases, and the competitive landscape.',
      'Analytically, treat "political backing" as a sentiment catalyst and "regulatory and compliant product specs" as structural variables. Conflating them makes short-term noise look like a trend inflection.',
      'If you change positions because of this, be clear whether you are trading a sentiment fix or a fundamental upgrade, and set drawdown and time-based stops.',
    ],
  },
  'huang-return-4': {
    title: 'After Huang’s Return: How to Price Liquid Cooling, Optics, and the Compute Chain',
    summary:
      'Reinstatement lifted risk appetite in related themes, but thematic trades still need orders and capacity proof.',
    body: [
      'After word of Huang’s return spread, some A-share and Hong Kong names tied to compute, liquid cooling, and optical modules saw warmer sentiment. The usual chain: stable Nvidia shipment expectations → upgraded orders for supporting layers.',
      'Watch the stretch from "personality headline" to "theme mapping." Liquid cooling and optical modules are real trends, but earnings timing, valuations, and crowding differ stock by stock; one-size-fits-all does not work.',
      'A sturdier track: cloud capex guidance, delivery language from Nvidia and peers, and domestic suppliers’ order books and utilization—not just the reinstatement headline.',
      'Theme trades fit small size and strict rules; treating them as sure growth and loading up often skews risk-reward the wrong way.',
    ],
  },
  'huang-return-5': {
    title: 'Reviewing Huang’s Brief Exit: How Governance Rows Hit Tech Giant Premiums',
    summary:
      'From departure to return, markets repriced "key-person risk"; high-multiple tech names faced a stress test.',
    body: [
      'Huang’s short leave and return made investors revisit key-person risk at tech giants: founders and CEOs tied to brand are part of the moat story and can also amplify volatility.',
      'High-multiple assets are especially sensitive to governance uncertainty because distant cash flows need more trust. When trust cracks, multiples can compress fast; on repair, valuations can snap back just as sharply.',
      'For portfolio management: even with a solid story, budget risk for people and governance. Caps on single-name, single-narrative exposure matter more than explanations after the fact.',
      'Huang’s return cuts near-term uncertainty but does not erase competition, cycles, or policy risk. Treat it as a case study, not a perpetual-growth fairy tale.',
    ],
  },
  'musk-1': {
    title: 'Musk and Tesla: Autonomy Narrative Again Drives Valuation Elasticity',
    summary:
      'Markets keep trading Robotaxi and FSD progress expectations; deliveries and gross margin remain the floor.',
    body: [
      'Musk’s recent public schedule and comments again pull Tesla’s valuation focus toward self-driving and a future mobility network. For believers, that is a second growth curve; for skeptics, a high-uncertainty option.',
      'When breaking down pricing, use three layers: auto core deliveries and profit, software subscription monetization, and regulatory approval progress. When those layers diverge, the stock can swing hard.',
      'Personality moves amplify volatility but do not automatically change factory yield or the cost curve. Treat social heat as catalyst and quarterly numbers as anchor to avoid chasing headlines.',
      'Volatile names need position caps. You can follow Musk without betting the farm on conviction alone.',
    ],
  },
  'musk-2': {
    title: 'Musk’s Ecosystem: How Tesla, AI, and Capital Markets Cross-Feed',
    summary:
      'Investors often bake Musk’s personal brand premium into Tesla—and must guard against brand markdown moments.',
    body: [
      'Musk is tightly linked to EVs, space, social media, and AI narratives. For Tesla shareholders, that means brand spillover: good news may come from outside the core business, and bad news can flow back in.',
      'A typical cross-impact path: personality controversy → shifts in brand and political risk premium → risk appetite adjusts → stock volatility. It is fast but not always lasting.',
      'At the portfolio level, Tesla plus other crowded tech growth can mean more correlated risk than it looks. Correlations tend to rise under stress.',
      'The lesson: entrepreneur narratives can create a narrative dividend and a narrative tax. Pricing the premium matters more than picking sides.',
    ],
  },
  'musk-3': {
    title: 'How to Read Musk Headlines: Separate Facts, Vision, and Sentiment',
    summary:
      'Turn sound bites into verifiable milestones so keynotes are not mistaken for earnings reports.',
    body: [
      'Musk is skilled at using vision to hold attention. For media and short-term flows, that is traffic; for long-term investors, it is a language that needs translation.',
      'A practical read: tag what has already happened (deliveries, recalls, regulatory filings), then future promises (timelines, feature visions), and only then market sentiment (price interpretations).',
      'If a story has vision but no milestone, it belongs on a watchlist—not an immediate position change. Hard data on regulation or deliveries deserves more weight.',
      'This site publishes full Musk features in-house so you can read slowly and layer ideas instead of being dragged by external headlines.',
    ],
  },
  'musk-4': {
    title: 'Tesla Energy: Is Musk’s "Second Curve" Measurable?',
    summary:
      'Storage and related businesses are cited often; contribution must be verified by segment disclosures.',
    body: [
      'In Musk’s public story, energy and storage are often framed as major growth. If they deliver, worries about "pure auto cycles" ease; if scale and profit lag, narrative discount returns.',
      'Verification is straightforward: rising segment revenue and margin, stable project delivery, guidance not repeatedly cut. Hot slogans do not mean the curve has inflected.',
      'Theme investors often multiply "huge future" straight into today’s market cap. Safer: run bullish, base, and bear cases for the second curve and cap its impact on total exposure.',
      'Musk will keep telling big stories; your spreadsheet still needs a row for "what if assumptions fail."',
    ],
  },
  'musk-5': {
    title: 'Musk Heat and Trading Discipline: Do Not Let the Timeline Place Orders',
    summary:
      'High-frequency personality news is fine for input, poor as an instant trigger.',
    body: [
      'When a Musk headline hits, the reflex is often "buy/sell now." On volatile names that is costly: slippage, reversals, and overnight gaps punish impulse.',
      'A steadier flow: log the event → judge impact tier (sentiment/operations/regulation) → check your strategy list → then decide to trade. Ten minutes between "saw it" and "clicked" usually helps win rate.',
      'If the event does not change your original thesis, the best action is often no action. Waiting flat is also a position.',
      'Personalities stay on trend; discipline must stay in your account rules.',
    ],
  },
  'fin-01': {
    title: 'Fed Meeting Near: Markets Debate "Higher for Longer" vs. Rate Cuts',
    summary:
      'Rate-path expectations swing; growth stocks and dollar assets see volatility in sync.',
    body: [
      'Global markets are again pricing around Fed meeting expectations. Hawkish officials lift real-rate expectations and often pressure long-duration growth; dovish signals can revive risk appetite quickly.',
      'For cross-market investors, focus is not only "cut or not" but dot plot, statement wording, and conditional language at the press conference. Expectation gaps move short-term vol more than the level itself.',
      'Operationally, use Treasury yields, the dollar index, and the Nasdaq together to see if the narrative is coherent. Watching equities alone invites style-switch misreads.',
    ],
  },
  'fin-02': {
    title: '10-Year Treasury Yield Swings: Why Tech Gets Hit First',
    summary:
      'When discount rates move, high-multiple assets reprice first.',
    body: [
      'When the 10-year yield rises, markets discount future cash flows at higher rates, so companies that earn more in the distant future see valuations react more. That is why growth tech often moves first.',
      'It does not mean fundamentals instantly worsen—it means the pricing anchor shifted. If earnings growth offsets higher discount rates, weakness may not persist; if both worsen, valuation and earnings compression can stack.',
      'Treat rates as weather and the company as the body: in bad weather, fitness matters more.',
    ],
  },
  'fin-03': {
    title: 'Stronger Dollar: Liquidity Implications for EM and Hong Kong Stocks',
    summary:
      'A firm dollar often tightens global risk appetite; Hong Kong is sensitive to external liquidity.',
    body: [
      'When the dollar strengthens, dollar-denominated global liquidity tends to tighten and de-dollarization gets harder; emerging markets often feel pressure. Hong Kong, as an open market, often reacts directly to that pulse.',
      'It is not mechanical: local policy, buybacks, and southbound flows can offset. But ignoring the dollar means ignoring a major exogenous variable in portfolio construction.',
      'Cross-market accounts should watch the dollar index, Treasuries, Hang Seng Tech, and southbound turnover together.',
    ],
  },
  'fin-04': {
    title: 'A-Share Turnover Eases: Lower Activity Does Not Spell Direction',
    summary:
      'Shrinking volume can mean wait-and-see or a pause in trend—it depends on where prices sit.',
    body: [
      'When A-share turnover falls from highs, bulls and bears read opposite stories: momentum fading vs. selling exhaustion. Using volume alone to call direction fails often.',
      'More useful is structure: is thematic crowding loosening or rotation from high to low; are index weights stable or are themes fading. Activity is temperature, not the steering wheel.',
      'Short-term traders should cut frequency in thin markets; long-term investors should lean on earnings and valuation, not intraday pulses.',
    ],
  },
  'fin-05': {
    title: 'Northbound Flows More Volatile: One Day Is Not a Verdict',
    summary:
      'Foreign flow day-to-day is noisy; moving averages and holdings beat daily fixation.',
    body: [
      'Big northbound inflows or outflows in a single day are often used to explain index moves. Quotas, channels, and reporting create noise; intraday narratives overfit easily.',
      'Safer: multi-day net flow trends, whether sector preferences persist, and alignment with FX and global risk appetite.',
      'Treat it as one reference indicator, not the only driver.',
    ],
  },
  'fin-06': {
    title: 'Crude and Industrial Metals Slide: Crack in the Re-Inflation Trade?',
    summary:
      'Commodity swings hit equities through cost channels and risk appetite.',
    body: [
      'Some LME industrial metals fell sharply while oil volatility picked up. For stocks, that can mean a reset in inflation and corporate cost expectations.',
      'Path one is costs: cheaper inputs help downstream manufacturing margins; path two is risk appetite—if the drop reads as demand collapse, cyclicals and risk assets can fall together.',
      'First decide whether markets are trading "supply shock easing" or "demand deterioration," then pick sectors.',
    ],
  },
  'fin-07': {
    title: 'Banks and Dividend Strategies: Where Money Hides When Growth Gets Crowded',
    summary:
      'High yield and stable cash flow get attention again in choppy markets.',
    body: [
      'When tech growth trades crowd up and volatility rises, some money rotates to banks, utilities, and other high-dividend names for cash flow and relatively steadier drawdowns.',
      'Dividends are not risk-free: rates, asset quality, and payout sustainability all affect pricing. Low vol is not no risk—just different risk shape.',
      'Size dividend exposure with "payout quality + valuation + rate backdrop," not the yield number alone.',
    ],
  },
  'fin-08': {
    title: 'Semiconductor Chain Divergence: Why Equipment, Design, and Packaging Desync',
    summary:
      'Up and down the same chain, cycle and valuation can move at completely different speeds.',
    body: [
      'AI demand does not lift every semiconductor segment in lockstep. Designers ride product cycles and key customers; equipment rides capex and order visibility; packaging rides utilization and pricing.',
      'A common mistake is one index for the whole chain. Inventory, pricing, and capacity constraints differ by segment, so earnings land at different times.',
      'Before picking a name, know which slice of profit you are betting on—not just the word "semiconductors."',
    ],
  },
  'fin-09': {
    title: 'Hong Kong Tech Repatriation Trade: Limits of Buybacks, Southbound, and Re-Rating',
    summary:
      'Whether a rebound lasts depends on earnings catching up to higher multiples.',
    body: [
      'Phases of Hong Kong tech inflows are often driven together by southbound money, company buybacks, and easier external liquidity. Re-rating from very low percentiles can be very elastic.',
      'The ceiling: valuation repair without earnings has limited upside; if profits and free cash flow improve together, moves are more durable.',
      'Verify "cheap" and "getting better" separately to avoid maxing out late in a bounce.',
    ],
  },
  'fin-10': {
    title: 'CNY Swings: P&L Reminders for Exporters and Globalizers',
    summary:
      'FX is a hidden line item—double-check around earnings season.',
    body: [
      'RMB appreciation or depreciation directly hits export competitiveness, FX gains and losses, and offshore revenue translation. The same company can show very different profit elasticity under different FX paths.',
      'In filings, watch hedging policy, foreign-currency debt, and revenue mix by currency. Revenue growth without FX context misjudges quality.',
      'For global supply chains, FX is risk management—not an after-the-fact excuse.',
    ],
  },
  'fin-11': {
    title: 'IPO and Refi Pace: Liquidity Drain or Risk Appetite Signal?',
    summary:
      'More supply diverts cash short term but can also show the market can absorb deals.',
    body: [
      'When IPOs and secondary offerings pick up, markets complain about "liquidity drain." The flip side: deals getting done means pricing and risk appetite are not frozen.',
      'Structure matters: where cash is drawn, whether incumbents weaken in tandem, and whether issue pricing is crowded.',
      'Treat supply as a constraint on sizing, not an emotional veto.',
    ],
  },
  'fin-12': {
    title: 'Insurance and Asset Manager Allocations: What Long Money Adds and Cuts',
    summary:
      'Institutional rebalancing is slow, but once it turns, it can outlast hot money.',
    body: [
      'Insurance and pension allocation shifts are tracked via top holdings and research notes. They may not chase themes fastest, but they tend to persist once direction is set.',
      'Watch equity allocation weights, the split between dividend and growth, and whether they are adding high yield or core assets.',
      'Long money is not infallible, but it offers a rhythm different from retail.',
    ],
  },
  'fin-13': {
    title: 'Late in Earnings Season: Guidance Beats the Word "Beat"',
    summary:
      'One-off beats fade; management outlook drives the next quarter’s pricing.',
    body: [
      'Big post-earnings moves often come not from a penny on the past quarter but from next-quarter guidance and tone shifts. Markets trade the future.',
      'In transcripts, prioritize demand visibility, inventory, capex, buybacks and dividends, competition, and regulatory language.',
      'Treat "beat" as the headline and guidance as the body.',
    ],
  },
  'fin-14': {
    title: 'Gold Pullback: Re-Rating Safe Havens When Real Rates Rise',
    summary:
      'Gold does not only rise; real rates and the dollar still explain a lot.',
    body: [
      'When spot gold falls hard, debates erupt over broken safe-haven logic. More often, higher real rates and a stronger dollar press gold—not a sudden safe world.',
      'Gold’s role in a portfolio is hedge and diversification, not a perpetual engine. Size it to overall risk budget.',
      'Use one macro frame for stocks, bonds, FX, and gold to avoid gold-only confusion.',
    ],
  },
  'fin-15': {
    title: 'Buyback Wave Heating Up: Real Vote of Confidence or EPS Makeup?',
    summary:
      'Buybacks can support price, but free cash flow must keep pace.',
    body: [
      'When companies enlarge repurchase authorizations, it is read as management liking their stock. Short term it can shrink float and lift EPS.',
      'If buybacks rely on leverage or crowd out needed capex, long-term value creation may suffer. Focus on free cash flow, leverage, and repurchase price discipline.',
      'Treat buybacks as signal and cash flow as evidence.',
    ],
  },
  'fin-16': {
    title: 'Disputed Consumption Recovery Slope: Why Discretionary and Staples Diverge',
    summary:
      'Under the same "consumer" label, cash-flow quality can differ wildly.',
    body: [
      'Staples hinge more on price tiers and costs; discretionary on income expectations and wealth effects. Macro improvement does not lift both equally.',
      'Channel inventory, promo intensity, and ticket size often explain company results better than headline retail sales.',
      'When picking consumer names, know whether you are betting "people still buy" or "people can afford pricier."',
    ],
  },
  'fin-17': {
    title: 'Geopolitical Heat: Energy Chokepoints and Shipping Insurance in Prices',
    summary:
      'Geopolitical risk enters assets via oil, freight rates, and risk premia.',
    body: [
      'When key straits or routes face blockade rhetoric or escalation, markets quickly trade energy supply fear and shipping risk premia. Equities see higher vol and style rotation.',
      'For corporates, costs and delivery cycles may slip; for investors, it is mostly risk appetite and sector rotation.',
      'Geopolitics is hard to predict—use sizing and hedging, not a need to call every conflict twist.',
    ],
  },
  'fin-18': {
    title: 'Rising Quant and Passive Share: How Retail Should Reset Expectations',
    summary:
      'Who provides liquidity changed—so did the rhythm of moves and drawdowns.',
    body: [
      'As passive index and quant strategies grow, single-name and factor vol can look more "rule-based": pulses around open, close, and rebalance days are common.',
      'For discretionary traders, chasing momentum may cost more, and understanding crowded factors matters more.',
      'Cutting trade frequency and deepening research usually fits the new microstructure better.',
    ],
  },
  'fin-19': {
    title: 'Local Debt and Fiscal Timing: Gauging Infrastructure Order Visibility',
    summary:
      'Policy push does not instantly show up in listed company financials.',
    body: [
      'Fiscal and local bond issuance cadence shapes infrastructure demand expectations. But orders, construction, and revenue recognition lag—theme trades often lead fundamentals by quarters.',
      'Assess special bond use, project equity, order books, and collection quality—not policy headlines alone.',
      'Cyclical sectors hurt most when expectations are full and delivery is slow.',
    ],
  },
  'fin-20': {
    title: 'Global Style Rotation Speeds Up: A Checklist to Avoid Chase and Panic',
    summary:
      'When leadership spins fast, rules beat inspiration.',
    body: [
      'When markets whip between growth, value, dividends, and resources, the biggest cost is often not missing a move but friction and mental wear from constant switching.',
      'A simple checklist works: What is core vs. satellite? What is the cap per theme? What if one theme crowds? Can you sleep with overnight risk?',
      'This site keeps news in-house so you read slower, click less, and keep your own rules. Markets stay loud; your plan can stay clear.',
    ],
  },
}