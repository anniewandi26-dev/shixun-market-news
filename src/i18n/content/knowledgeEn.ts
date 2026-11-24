import type { KnowledgeArticle } from '../../types'

export const KNOWLEDGE_EN: KnowledgeArticle[] = [
  {
    id: 'what-is-stock',
    title: 'What Is a Stock? From Ownership to Pricing',
    category: '入门',
    readMinutes: 22,
    summary:
      'Buying a stock is not buying a flickering number—it is buying a claim on the company’s future cash flows.',
    sections: [
      {
        heading: 'Stock, in plain language',
        paragraphs: [
          'A stock represents a share of ownership in a company. When you buy its shares, you become one of its shareholders: when the business earns money and its valuation rises, your stake is usually worth more; when operations weaken or sentiment collapses, you can lose heavily. Grasping this matters more than memorizing any technical indicator.',
          'Many people watching a quote screen for the first time get hypnotized by red and green ticks and think investing is guessing tomorrow’s move. In fact, the exchange is only matching prices at which ownership changes hands. What you really buy is the profit and dividends the company might create in the future, plus the multiple the market is willing to pay for those earnings.',
          'So the first step in learning stocks is not learning how to “buy the dip,” but learning to ask: How does this company make money? Why can customers not do without it? Who are its competitors? Will management waste capital? Those questions are closer to the essence of investing than whether volume spiked today.',
        ],
      },
      {
        heading: 'Where price comes from: short-term auction, long-term anchor',
        paragraphs: [
          'Share prices are set by buyers and sellers matching on an exchange. In the short run, it is like an auction: whoever is more urgent or more aggressive moves the price. News, flows, sentiment, and leverage can push prices far in a few days.',
          'Over the long run, price tends to orbit around how much free cash flow the company can generate. When rates rise, the present value of the same future cash falls, and valuations often come under pressure; when rates fall and liquidity is ample, high-growth stories are easier to chase.',
          'Think of short-term volatility as noise and long-term earning power as signal. Loud noise does not mean there is no signal; a real signal does not mean you can nail tomorrow’s level. Investing trains probability and patience, not fortune-telling.',
        ],
      },
      {
        heading: 'Three distinctions you must keep straight',
        paragraphs: [
          'Price vs. value: price changes every day; value usually shifts more slowly. Cheap or expensive is judged relative to value, not relative to yesterday’s close.',
          'Volatility vs. risk: drawdowns hurt, but what kills accounts is usually permanent loss of capital—wrong company, wrong leverage, forced sale at the worst time. Volatility can smooth out over time; bankruptcy and margin calls do not.',
          'Making money vs. quality of earnings: thematic speculation can pay too, but uncertainty is higher and drawdowns nastier. Money backed by business growth and free cash flow tends to be more durable. Know which kind you are earning and match position size and mindset.',
        ],
      },
      {
        heading: 'Costly mistakes beginners make',
        paragraphs: [
          'Equating “it went up” with “I was right.” A short-term rally may be nothing but sentiment and flows; it does not prove your thesis. Likewise, a short-term drop does not automatically mean the business got worse.',
          'Spending all your energy predicting the open. Even if you guess right a few times, replication is hard. A steadier path: build a framework for understanding the company, then decide whether to bear the uncertainty.',
          'Betting heavily on rumors. When the source is unclear or unverifiable, size should be tiny—or zero. Information edge rarely sits with retail; discipline can.',
        ],
      },
      {
        heading: 'How to start learning without getting lost',
        paragraphs: [
          'Suggested order: stocks and account rules → rough meaning of the three financial statements → common valuation yardsticks → only then trading rhythm and charts. Skipping ahead to “must-rise patterns” turns luck into skill in your head.',
          'For each concept, check it against a company you know—Moutai, Tencent, Apple, NVIDIA, whatever. Abstract words stick when tied to a real business.',
          'This site offers quotes and education to lower the information barrier, not to decide for you. Any buy or sell should fit your horizon and risk tolerance, and you should cross-check official filings.',
        ],
      },
    ],
  },
  {
    id: 'bull-bear',
    title: 'Bull and Bear Markets: Cycles, Sentiment, and Your Position',
    category: '术语',
    readMinutes: 20,
    summary:
      'Bull and bear are not on/off switches—they are phases shaped by risk appetite, liquidity, and earnings expectations.',
    sections: [
      {
        heading: 'What bull and bear actually mean',
        paragraphs: [
          'Bull markets usually show broad uptrends, active turnover, easier financing and issuance, and optimistic media narratives; bear markets often bring declines, risk aversion, credit tightening, and crushed confidence. They rarely flip overnight—more often they warm up or freeze slowly.',
          'You can read them as “how much the market will pay for uncertainty.” When optimistic, people pay higher multiples for the future; when pessimistic, even sure cash flows get discounted.',
        ],
      },
      {
        heading: 'Do not trap yourself in “−20% = bear”',
        paragraphs: [
          'In practice, some use “about a 20% drawdown from the peak” as a bear-market rule of thumb, but that is a statistical label, not a law of physics. Some slow bulls feel like warm water; some fast bears feel like a dive. In structural markets the index may sit flat while one sector soars, and simple bull/bear buckets fail.',
          'More useful is a bundle of signals: are earnings being revised down, is credit contracting, is volatility rising systemically, is money leaving risk for cash and bonds? A single price rule is a reminder, not a verdict.',
        ],
      },
      {
        heading: 'Your enemy changes by phase',
        paragraphs: [
          'In a bull, the biggest enemy is leverage and FOMO chasing. When everyone is winning, you feel left behind—you add size, add leverage, cut research time. Often you end up catching the last baton.',
          'In a bear, the biggest enemy is being forced to sell at the bottom—usually from oversizing, maturity mismatch, or betting long stories with short money. Bears also create traps that look cheap while fundamentals still deteriorate.',
          'Sideways markets are the most grinding: strategy whiplash, fees and psychology both bleed. Then reducing turnover and knowing whether you are trend-trading or value-allocating beats hunting for daily inspiration.',
        ],
      },
      {
        heading: 'A position framework you can keep',
        paragraphs: [
          'Work backward from “how much drawdown can I take without breaking?” If 25% would cost you sleep and blow up your plan, exposure is too high.',
          'Use “how many years before I need this money” to choose asset types. Shorter money should not sit in high-volatility growth.',
          'Use “what if I am wrong?” to design exits. Forecasts can be wrong; plans cannot be empty. Bull/bear labels go stale; position discipline does not.',
        ],
      },
    ],
  },
  {
    id: 'pe-pb',
    title: 'P/E and P/B: Using Valuation Multiples Correctly',
    category: '估值',
    readMinutes: 24,
    summary:
      'PE and PB are not “cheap” stickers—they translate price into what the market is paying for.',
    sections: [
      {
        heading: 'P/E: paying for how many years of profit',
        paragraphs: [
          'Price-to-earnings (P/E) = share price ÷ earnings per share. In plain terms: at today’s profit, how many years to “earn back” the price. It turns “expensive or cheap” into a comparable multiple.',
          'Low P/E is not automatically cheap—it may be a sunset industry, one-off earnings, or profits about to fall; high P/E is not automatically a bubble—the market may be paying for faster growth and higher-quality cash flow.',
          'Distinguish trailing P/E, rolling P/E, and forward P/E. For growth names, institutions often talk PEG (P/E vs. growth) and next-year consensus. Low P/E without growth and high P/E backed by fast growth are different animals.',
        ],
      },
      {
        heading: 'P/B: better when assets are tangible',
        paragraphs: [
          'Price-to-book (P/B) = share price ÷ book value per share. Banks, insurers, and heavy cyclical manufacturers use P/B more; light-asset internet firms often understate brand, software, and network effects on the balance sheet, so P/B matters less.',
          'Read P/B with ROE. High P/B supported by high ROE can be fair; high P/B with low ROE usually warrants caution. In the Buffett stack, quality of capital returns beats any single multiple.',
        ],
      },
      {
        heading: 'Why “one multiple only” hurts',
        paragraphs: [
          'At minimum, look together at revenue and profit growth, ROE or ROIC, leverage, free cash flow, peer medians, and historical percentiles. Valuation is a comparison tool, not a fortune formula.',
          'Cyclicals at peak profit can look cheap on P/E (earnings inflated); at trough, P/E can be sky-high or N/A. Mechanical “low P/E” buying often lands the night before the cycle turns.',
          'Accounting can be bent by M&A, buybacks, impairments, and one-offs. Footnotes beat rote formulas for avoiding landmines.',
        ],
      },
      {
        heading: 'Practical checklist',
        paragraphs: [
          'Where does this stock’s P/E and P/B sit vs. its own five-year range? Vs. peers?',
          'Are earnings recurring, or one-time? Does free cash flow keep up with reported profit?',
          'If growth halves, does this valuation still hold? Writing it down beats gut feel.',
        ],
      },
    ],
  },
  {
    id: 'a-hk-us',
    title: 'A-Shares, Hong Kong, and U.S. Markets: Rules and Mindset',
    category: '市场',
    readMinutes: 25,
    summary:
      'The same company can trade on very different paths in different markets.',
    sections: [
      {
        heading: 'A-shares: clear rules, vivid sentiment',
        paragraphs: [
          'Mainland A-shares are quoted in RMB; most main-board names have daily limits (about ±10%, wider on ChiNext/STAR), settlement is mostly T+1, retail share is relatively high, and thematic and sentiment trading are active. Policy, liquidity, and industrial plans strongly shape style rotation.',
          'Price limits change the game: liquidity and feedback near limit-up differ a lot from U.S. continuous auction. T+1 also means you cannot sell the same day you buy—less room for short-term mistakes.',
        ],
      },
      {
        heading: 'Hong Kong: global pricing, blunt volatility',
        paragraphs: [
          'Hong Kong stocks trade in HKD, with no daily limit and T+0; institutions and international capital weigh heavily. The same issuer often shows A+H premium or discount—driven by investor base, liquidity, margin convenience, and risk appetite, not “which market is right.”',
          'Hong Kong is sensitive to global dollar liquidity. U.S. Treasury yields, the dollar index, and southbound flows often explain the day’s style more than local midday chatter.',
        ],
      },
      {
        heading: 'U.S.: rates, megacaps, and disclosure',
        paragraphs: [
          'U.S. stocks trade in USD, with no daily limit (circuit breakers in extremes), active pre- and post-market sessions, and a more mature disclosure and class-action environment. Tech giants dominate indices; valuations are sensitive to rates and dollar liquidity.',
          'Cross-market comparisons need FX and session alignment. Mainland daytime sentiment does not map cleanly to U.S. overnight hours, and vice versa.',
        ],
      },
      {
        heading: 'Practical advice',
        paragraphs: [
          'First clarify your base currency, trading access, and tax friction; then whether you are tracking the company or market beta. Many think they are picking stocks when they are only betting risk appetite.',
          'If you watch all three venues, keep one short list: key indices, DXY, Treasury yields, northbound/southbound flows, and your holdings’ earnings calendar. Few stable inputs beat being dragged by headlines.',
          'If the same name has A, H, and ADR listings, compare liquidity, valuation gap, and trading friction you can accept—then pick a venue, instead of chasing whichever moved today.',
        ],
      },
    ],
  },
  {
    id: 'risk',
    title: 'Risk and Position Size: Survive First, Then Earn',
    category: '风控',
    readMinutes: 22,
    summary:
      'The first principle of investing is not maximizing gain—it is avoiding one mistake that ends compounding.',
    sections: [
      {
        heading: 'Risk is not just volatility',
        paragraphs: [
          'Single names, single themes, and high leverage are the classic personal-account blow-up recipe. Diversification is not buying twenty junk names—it is ensuring no one black swan can wipe net worth.',
          'Correlated “diversification” is one bet in disguise. An all-in new-energy chain looks diversified until policy or demand flips and everything falls together.',
        ],
      },
      {
        heading: 'Position size: bake sleep quality into the plan',
        paragraphs: [
          'Position size is sleep quality: can you still execute the plan through 20% or 30% drawdowns? If not, you are already too large. Trimming when uncertain beats levering up to “win it back.”',
          'A practical habit: hard caps per theme—e.g., no single name above 10% of assets, no single sector above 30%. Tune the numbers, but write them first.',
        ],
      },
      {
        heading: 'Four risk layers and how to handle them',
        paragraphs: [
          'Market risk: systemic declines. Response—control total equity exposure, keep cash or uncorrelated assets.',
          'Single-stock risk: fundamentals break. Response—research, diversification, and discipline to cut when the thesis fails.',
          'Liquidity risk: cannot sell or huge slippage. Watch small caps, halts, pre/post-market.',
          'Behavioral risk: chase, panic sell, revenge trading. Response—lower screen time, pre-set trade lists, avoid impulsive intraday ideas.',
        ],
      },
      {
        heading: 'Minimum discipline list',
        paragraphs: [
          'Per-name cap, per-theme cap, cash floor, regular review. Discipline does not make you right every time—it makes sure you still have tomorrow when wrong.',
          'Maturity mismatch is a silent killer: betting a three-year story with money needed next week can force exit at the worst time even in a good company.',
          'Again: quotes and content here are for learning, not investment advice.',
        ],
      },
    ],
  },
  {
    id: 'read-kline',
    title: 'How to Read Candlesticks: Structure First, Patterns Second',
    category: '技术',
    readMinutes: 21,
    summary:
      'Candles record price negotiation, not prophecy—read location and trend before single-bar shapes.',
    sections: [
      {
        heading: 'What one candle says',
        paragraphs: [
          'Each candle has open, high, low, close. The body is open-to-close range; wicks show intraday push and rejection. Bullish/bearish color only means close vs. open direction—not automatic “continues tomorrow.”',
          'Long upper wicks may mean rejection or supply test; long lower wicks may mean support or a pause in decline. Pattern without location means little.',
        ],
      },
      {
        heading: 'Structure before novelty',
        paragraphs: [
          'Many candles together form structure: pullbacks in uptrends, bounces in downtrends, false breaks in ranges. Beginners gravitate to “hammers” and “engulfing” but ignore where they appear—the same pattern can mean opposite things at highs vs. lows.',
          'Trend can be helped by simpler tools: are highs/lows rising or falling, do moving averages agree? Answer “trend or range?” before choosing a strategy.',
        ],
      },
      {
        heading: 'Volume: a second dimension, not a master key',
        paragraphs: [
          'Volume breakouts sometimes mean consensus, sometimes distribution; quiet declines may be reluctance to sell or drying liquidity. Volume-price divergence needs longer context—do not decide on one day.',
          'Volume definitions differ by market. A-shares vs. U.S. participant mix means “heavy volume” is not perfectly comparable. Reuse one volume playbook across markets with care.',
        ],
      },
      {
        heading: 'Learning order and boundaries',
        paragraphs: [
          'Suggested order: weekly for direction → daily for structure → intraday only for execution. Minute noise is interference, not edge, for most retail traders.',
          'Technical analysis is probabilistic, not a crystal ball. It works best with fundamentals, sizing, and macro context; pattern worship alone often has negative expectancy.',
          'If charts make you trade constantly and regret it, the problem is missing constraints, not the chart. Cut size and frequency before chasing technical perfection.',
        ],
      },
    ],
  },
  {
    id: 'us-market-guide',
    title: 'U.S. Equities Primer: Indices, Megacaps, and Sessions',
    category: '美股',
    readMinutes: 26,
    summary:
      'Understand the Dow, S&P 500, Nasdaq, and the Magnificent Seven before obsessing over single names.',
    sections: [
      {
        heading: 'Three “broad market” benchmarks',
        paragraphs: [
          'U.S. “the market” is usually described with three index families: the Dow Jones Industrial Average (price-weighted, fewer names), the S&P 500 (cap-weighted, large-cap America), and Nasdaq benchmarks (higher tech/growth weight; Nasdaq-100 in particular).',
          'The three can diverge on the same day—that often signals style rotation, not “the market broke.” Dow steady and Nasdaq down may mean rate-sensitive growth is adjusting.',
        ],
      },
      {
        heading: 'Megacap weight: opportunity and risk together',
        paragraphs: [
          'For a decade, U.S. narrative centered on tech and platforms. Apple, Microsoft, Google, Amazon, Meta, NVIDIA, Tesla, and peers both lifted indices and amplified drawdowns.',
          'Index funds passively hold heavy weights in these names; single-stock buyers should ask if they truly have an edge. Many think they diversified but still concentrate the same AI/tech factor.',
        ],
      },
      {
        heading: 'Sessions and extended hours',
        paragraphs: [
          'Regular U.S. hours are roughly 9:30–16:00 Eastern—about 22:30–05:00 Beijing in winter, 21:30–04:00 in summer. Pre- and post-market moves can be large while liquidity is thin; gaps and slippage are common.',
          'Cross-market investors: mainland daytime mood does not map cleanly to U.S. night. Overnight gaps are normal—size plans for waking up to a big move.',
        ],
      },
      {
        heading: 'Rates, earnings, and compliance',
        paragraphs: [
          'Rates are a master valve on U.S. valuation. Rising real rates often hurt long-duration growth most; ample liquidity favors themes and high multiples. Tracking 10-year yields and Fed communication beats doom-scrolling.',
          'Earnings season is “weather shock” for U.S. stocks. Guidance, buybacks, splits, M&A, and regulatory suits reprice fast. A calendar beats chasing personality headlines after the fact.',
          'Compliance reminder: broker channel, ADR vs. ordinary shares, tax and FX costs all change realized returns. Know your rails before trading.',
        ],
      },
    ],
  },
  {
    id: 'nvidia-huang',
    title: 'NVIDIA and Jensen Huang: A Playbook for the Compute Bull Market',
    category: '案例',
    readMinutes: 28,
    summary:
      'Huang’s keynotes inspire, but investing means orders, capacity, competition, and policy—four separate threads.',
    sections: [
      {
        heading: 'NVIDIA sells more than chips',
        paragraphs: [
          'NVIDIA (NVDA) became the symbol of the AI cycle not only by selling GPUs but by bundling accelerated compute, networking, and software (CUDA, etc.) into a platform. Huang frames the roadmap as industry revolution: data centers shift from storing data to producing intelligence.',
          'For platform businesses the questions are: how high is switching cost, does the ecosystem self-reinforce? If yes, the market pays a higher multiple; if customers drift to ASICs or alternatives, the narrative reprices fast.',
        ],
      },
      {
        heading: 'Three bets behind a high multiple',
        paragraphs: [
          'The market usually prices NVIDIA as if three things hold together: training/inference demand keeps expanding; cloud and sovereign AI capex lands; rivals cannot fully replace performance plus ecosystem soon.',
          'If any link weakens, elasticity is huge—that is normal for high-expectation assets. Your job is not blind faith but watching for cracks in all three.',
        ],
      },
      {
        heading: 'How to read Huang headlines',
        paragraphs: [
          'Layer information: (1) signed/delivered facts; (2) qualitative demand outlook; (3) competition and export-control remarks; (4) media emotion. Treating (2) and (4) as (1) is expensive tuition for retail.',
          'Speeches and interviews teach industry direction, not entry/exit. Turn sound bites into trackable metrics: shipment pace, hyperscaler capex, gross margin, inventory, lead times.',
        ],
      },
      {
        heading: 'Supply chain, competition, policy',
        paragraphs: [
          'Leading-edge fab, advanced packaging, HBM, and optical modules all gate shipments. Optimism still hits capacity walls. Conversely, if supply eases while demand holds, margin and delivery certainty may improve.',
          'Competition includes AMD, cloud ASICs, and other accelerators. Moat stories often rest on software and full-stack optimization—investors should check whether customers are locked in or merely “best for now.”',
          'Export controls reshape or remove regional demand and force compliant SKUs. That does not end the story but changes growth and mix—and the valuation model.',
        ],
      },
      {
        heading: 'If you trade around this',
        paragraphs: [
          'At minimum: position cap, earnings-volatility plan, and “what if capex slows?” News can be bullish; size must stay restrained.',
          'NVIDIA is a great case study—technology, supply chain, policy, and market expectations in one name. A case study is not a recommendation. Do your own work and control risk.',
        ],
      },
    ],
  },
  {
    id: 'musk-tesla',
    title: 'Musk and Tesla: Unpacking the Founder Premium',
    category: '案例',
    readMinutes: 24,
    summary:
      'Musk amplifies volatility; investing in Tesla still comes down to deliveries, profit, and execution.',
    sections: [
      {
        heading: 'Personal brand cuts both ways',
        paragraphs: [
          'Musk is among the entrepreneurs who move markets most on the Forbes lists. Tesla’s valuation often embeds far-out bets on autonomy, robotics, and energy networks, plus a premium on Musk’s execution.',
          'Premium means good news scales fast—and controversy scales fast. When tracking Musk headlines, ask: does this change deliveries, gross margin, or the regulatory backdrop? If not, it is mostly sentiment trading.',
        ],
      },
      {
        heading: 'Split the story into testable modules',
        paragraphs: [
          'Auto core: deliveries, average selling price, cost, inventory. That is the cash-flow base.',
          'Autonomy and software: regulatory progress, mileage data, willingness to pay. Long story; pace of proof drives valuation elasticity.',
          'Energy and other: can storage become a second curve? Verify with filings, not keynote energy.',
        ],
      },
      {
        heading: 'Discipline when trading',
        paragraphs: [
          'Sizing up on one Musk post turns investing into entertainment. You can watch and discuss—but position rules should be set before emotion arrives.',
          'Tesla swings hard; it fits a small learning sleeve or a defined trend approach, not life-expense money. Headlines will keep coming; your account needs to stay in the game.',
        ],
      },
    ],
  },
  {
    id: 'how-to-read-news',
    title: 'How to Read Financial News: Filters for the Clickbait Era',
    category: '方法',
    readMinutes: 18,
    summary:
      'News is input, not orders—tier it well or headlines will drive your trading.',
    sections: [
      {
        heading: 'Four-tier information',
        paragraphs: [
          'Sort news into: fact (who announced what), explanation (why it matters), opinion (what analysts say), emotion (is the market panicking or euphoric?). Decisions should rest mainly on facts and verifiable data; opinions are reference only.',
          'Train yourself to find checkable sentences: amounts, dates, regulatory filings, reported figures. Without those, treat it as background noise.',
        ],
      },
      {
        heading: 'One red candle, five headlines',
        paragraphs: [
          '“Crash,” “correction,” “healthy pullback,” “distribution,” and “golden pit” can describe the same down day. Look at magnitude, volume, and whether fundamentals changed before acting.',
          'Headlines serve clicks, not your account. “Data panel first, headline second” saves tuition.',
        ],
      },
      {
        heading: 'Right distance on people news',
        paragraphs: [
          'For high-frequency figures like Huang, Musk, or Powell, keep perspective: they narrate well; price still settles on supply, demand, and cash flow. Treat people as leads; filings and macro as evidence.',
          'This site’s “Forbes leaders” hub helps you track in one place—not to chase every headline. Themed reading with filters beats being pushed around.',
        ],
      },
      {
        heading: 'Build your information menu',
        paragraphs: [
          'Fix a few daily inputs: indices, rates, your holdings’ announcements; batch-scan the rest. Information overload is its own risk.',
          'Weekly review: which news moved your decisions? In hindsight, what was noise? Write it down—you will be calmer next month.',
        ],
      },
    ],
  },
]

export const KNOWLEDGE_EN_BY_ID: Record<string, KnowledgeArticle> = Object.fromEntries(
  KNOWLEDGE_EN.map((a) => [a.id, a]),
)