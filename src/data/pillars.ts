/**
 * Pillar (hub) pages: the top of each topic cluster described in docs/SEO-STRATEGY.md and keyword-strategy.json.
 *
 * These are code-owned pages, not WordPress posts. The slugs match `hubs[].slug` in keyword-strategy.json so the
 * programmatic engine treats each hub as already published: it then stops offering the hub as a candidate (no
 * duplicate WordPress post under a slug a code route would shadow) and starts offering its spokes, which are
 * required to link back to `/{hubSlug}/`.
 *
 * `guides` below is the curated series index, verified against the live sitemap. Spokes published later by the
 * engine are NOT auto-listed here yet: updateHubIndex() writes its index into a WordPress post, which these
 * code-owned pillars do not have. Adding each new spoke to `guides` keeps the cluster linked both ways.
 *
 * Content rule: nothing here may state a price, capacity, award, partnership or statistic. Guides stay framework
 * level until the owner supplies verified facts (see docs/SEO-STRATEGY.md section 7).
 */

export interface PillarSection {
  h2: string;
  body: string[];
  bullets?: string[];
}

export interface Pillar {
  /** Must match a hubs[].slug in keyword-strategy.json. */
  slug: string;
  hubId: string;
  eyebrow: string;
  /** SEO title; tidyTitle() appends the brand when it fits in 60 characters. */
  title: string;
  h1: string;
  h1Accent: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lead: string;
  sections: PillarSection[];
  faqs: { q: string; a: string }[];
  /** City pages this pillar sends authority to. Every slug must be a real route. */
  cities: { label: string; href: string }[];
  /** Existing published guides that genuinely belong to this topic. Verified against the live sitemap. */
  guides: { label: string; href: string }[];
}

export const PILLARS: Pillar[] = [
  {
    slug: 'destination-weddings-in-india-guide',
    hubId: 'destination',
    eyebrow: 'Complete planning guide',
    title: 'Destination Weddings in India: Planning Guide',
    h1: 'Destination Weddings in India:',
    h1Accent: 'The Complete Planning Guide',
    description:
      'How to plan a destination wedding in India: choosing a region and season, venue types, guest travel and logistics, a budget framework and what a planner handles for you.',
    primaryKeyword: 'destination wedding in india',
    secondaryKeywords: [
      'destination wedding planner india',
      'how to plan a destination wedding in india',
      'best destination wedding places in india',
      'destination wedding season india',
      'destination wedding guest logistics',
    ],
    lead:
      'A destination wedding in India means moving your celebration, and everyone you love, to a place none of you live. That is a logistics problem before it is a design problem. This guide walks through the decisions in the order they actually matter: region, season, venue type, guest travel, budget structure, and where a planner earns their fee.',
    sections: [
      {
        h2: 'Start with the region, not the venue',
        body: [
          'Couples usually start by collecting venue photographs. It is more useful to start one level up, with the region, because the region sets your weather window, your flight connections, your vendor availability and most of your guest-travel cost. A venue you love in a region that fights your dates will cost you more than a good venue in a region that suits them.',
          'India offers genuinely different wedding settings, and they are not interchangeable. Rajasthan is built around palace, fort and heritage architecture with lake and desert backdrops. Goa and the western coast offer beachfront and resort celebrations. Hill destinations give cooler weather and compact, intimate celebrations. Each has a different peak season, a different arrival pattern for guests and a different practical ceiling on guest numbers.',
          'Choose the region that matches three things at once: the look you want, the season you can marry in, and the travel your guest list can realistically absorb. If those three conflict, change the region before you change the guest list.',
        ],
        bullets: [
          'Rajasthan: palace, fort, heritage and lakeside settings; strongest in the cooler months.',
          'Goa and the coast: beach and resort celebrations, a more relaxed multi-day rhythm.',
          'Hill destinations: cooler weather, smaller guest counts, more road transfer time.',
          'Temple and pilgrimage towns: ritual significance, usually paired with a nearby hotel base.',
        ],
      },
      {
        h2: 'Fix the season before you fix the date',
        body: [
          'Season drives comfort, cost and risk. In most of India the cooler months are the preferred wedding window, which also makes them the most competitive: the venues and vendors you want are booked earliest and priced highest. The hot months and the monsoon are cheaper and more available, but they bring real operational risk for outdoor functions.',
          'Work the other way round from how most couples do it. Decide which months are acceptable for the region you picked, then look at which dates inside those months your families can travel. Only then approach venues. Walking into a venue conversation with a flexible two or three week window instead of a single fixed date is the single biggest piece of negotiating leverage most couples have and do not use.',
          'If your dates fall outside the comfortable window, that is workable, but budget for it honestly: shade and cooling for daytime functions, heating for late evenings in winter, and a genuine indoor alternative for every outdoor function rather than a vague plan to "move inside".',
        ],
      },
      {
        h2: 'Understand what each venue type actually asks of you',
        body: [
          'Venue categories differ in more than appearance. They differ in how much infrastructure you bring in, how much control you have over timings and noise, and how your guests are housed.',
          'Heritage and palace properties bring atmosphere no amount of decor can manufacture, but they often come with restrictions: protected structures limit where you can rig, load-in windows are narrow, and sound limits may be firm. Resorts and hotels are far easier operationally and usually house most of your guests on site, but you may be sharing the property. Private villas, farms and lawns give you a blank canvas and the most control, and they also mean you are importing nearly everything, including power, kitchens and washrooms.',
          'The practical question for each shortlisted venue is not "is it beautiful" but "what does this venue not provide, and what will it cost me to bring that in".',
        ],
        bullets: [
          'Heritage and palace properties: atmosphere, with rigging, timing and sound constraints.',
          'Resorts and hotels: easiest logistics, guests housed on site, shared property.',
          'Private lawns, farms and villas: maximum control, maximum infrastructure to import.',
          'Multi-property plans: more choice, more transfer time between functions.',
        ],
      },
      {
        h2: 'Guest travel and hospitality is the real work',
        body: [
          'At a destination wedding your guests are not attending an event, they are taking a trip. Everything that makes that trip easy is hospitality work, and it is where most destination weddings either feel effortless or feel chaotic.',
          'The pattern that works is simple to describe and laborious to execute: collect arrival and departure details early, group arrivals into as few airport and station transfer runs as you can, keep accommodation close to the main functions, and give every guest one printed or messaged schedule that tells them where to be, when, and what to wear. Appoint someone who is not in the wedding party to answer guest questions.',
          'Pay particular attention to the guests who need it: elderly relatives, anyone travelling with small children, and anyone flying in from abroad on a tight connection. Their experience is what people remember and talk about afterwards.',
        ],
        bullets: [
          'Collect flight and train details early, then group transfers rather than running them one by one.',
          'House guests close to the main functions; minimise transfer legs between events.',
          'Send one clear schedule per guest, with dress codes and travel times included.',
          'Give elderly guests and families with children shorter transfers and accessible rooms.',
        ],
      },
      {
        h2: 'A budget framework that survives contact with reality',
        body: [
          'Published "average cost" figures for Indian weddings are close to meaningless, because the same guest count can differ by an order of magnitude depending on region, season, venue category and how many functions you hold. A framework is more useful than a number.',
          'Build your budget from three drivers, in this order. First, guest count, because it multiplies almost every other line: food, rooms, transfers, seating, hospitality. Second, number of functions, because each one is a separate build with its own decor, catering and crew. Third, venue category and season, which set your base rate. Decide those three before you fall in love with anything, and you will have a budget you can actually hold.',
          'Then protect it two ways. Keep a genuine contingency for weather contingency, guest-count drift and the small additions that always appear in the final fortnight. And insist on written, itemised quotes, so you are comparing like with like rather than comparing one vendor\'s optimism against another\'s thoroughness.',
        ],
        bullets: [
          'Guest count multiplies nearly every other cost: settle it early and hold it.',
          'Each additional function is a separate build, not a small add-on.',
          'Venue category and season set the base rate; flexible dates lower it.',
          'Hold a real contingency and insist on itemised written quotes.',
        ],
      },
      {
        h2: 'What a planner actually does for you',
        body: [
          'A destination wedding planner is worth engaging for the coordination load rather than for taste. The work is venue shortlisting against your real constraints, vendor selection and contracting, a production timeline that survives a late baraat, guest hospitality and transfers, and someone on site making decisions while your family is celebrating rather than fielding calls.',
          'When you compare planners, compare the unglamorous things: what is in the written scope, who is physically present on each function day, how changes are priced, and how vendor payments flow. Ask for an itemised quote and ask what is excluded. A planner who is specific about exclusions is usually the one who has run the most weddings.',
          'Rasm Weddings & Events is based in Udaipur and plans palace, fort and resort weddings across Rajasthan and other Indian destinations, including for families travelling from abroad. If you want to talk through a region, a season or a rough budget before committing to anything, the first consultation is free.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How far in advance should we plan a destination wedding in India?',
        a: 'For a peak-season date at a sought-after property, start venue conversations as early as you can; popular venues and vendors in the cooler months are committed a long way ahead. Outside peak season you have more room. The genuinely time-critical items are the venue, your core vendors and guest accommodation; most design decisions can follow later.',
      },
      {
        q: 'Which is the best destination for a wedding in India?',
        a: 'There is no single best one, because the right answer depends on your dates, your guest list and the setting you want. Rajasthan suits palace, fort and heritage celebrations; Goa and the coast suit beach and resort weddings; hill destinations suit smaller, cooler-weather celebrations. Pick the region whose peak season matches the dates you can actually marry on.',
      },
      {
        q: 'How many days should a destination wedding be?',
        a: 'Most destination weddings in India run across two to four days of functions, because guests have travelled and a single-day event wastes that journey. Remember that each additional function is a separate build with its own decor, catering and crew, so the number of functions affects the budget more than the number of nights does.',
      },
      {
        q: 'Is a destination wedding more expensive than a wedding at home?',
        a: 'Not necessarily, and the comparison is rarely like for like. A destination wedding usually concentrates spending on fewer guests who stay longer, and it adds travel, transfers and accommodation. Many families find the total is comparable to a large hometown wedding with a much bigger guest list. The honest answer depends on your guest count, region and season.',
      },
      {
        q: 'Do we need a planner for a destination wedding, or can we manage it ourselves?',
        a: 'You can manage it yourself if you have time, local knowledge of the destination and someone willing to be on site making decisions during the functions. Most families engage a planner for the coordination load rather than for design: vendor contracting, production timelines, guest transfers and on-the-day problem solving in a city they do not live in.',
      },
      {
        q: 'What should we ask a destination wedding planner before hiring them?',
        a: 'Ask what is in the written scope and what is explicitly excluded, who from the team is physically present on each function day, how changes and additions are priced, how vendor payments flow, and for an itemised quote rather than a single figure. Specific answers about exclusions usually indicate experience.',
      },
    ],
    cities: [
      { label: 'Wedding planner in Udaipur', href: '/wedding-planner-in-udaipur/' },
      { label: 'Wedding planner in Jaipur', href: '/wedding-planner-in-jaipur/' },
      { label: 'Wedding planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' },
      { label: 'Wedding planner in Jaisalmer', href: '/wedding-planner-in-jaisalmer/' },
      { label: 'Wedding planner in Goa', href: '/wedding-planner-in-goa/' },
      { label: 'Wedding planner in Kumbhalgarh', href: '/wedding-planner-in-kumbhalgarh/' },
      { label: 'Wedding planner in Mount Abu', href: '/wedding-planner-in-mount-abu/' },
      { label: 'All wedding destinations', href: '/wedding-destination/' },
    ],
    guides: [
      { label: 'Destination wedding checklist for your dream wedding', href: '/checklist-for-your-dream-wedding/' },
      { label: 'Top destination wedding planning tips', href: '/top-destination-wedding-planning-tips/' },
      { label: 'Top 15 wedding destinations in Rajasthan', href: '/top-15-wedding-destinations-in-rajasthan/' },
      { label: 'Why Udaipur is the wedding capital of India', href: '/why-udaipur-is-the-wedding-capital-of-india/' },
      { label: 'How to plan a beach wedding in Goa', href: '/how-to-plan-a-beach-wedding-in-goa/' },
      { label: 'Why hiring a wedding planner is essential', href: '/why-to-hire-a-wedding-planner-is-essential/' },
    ],
  },
  {
    slug: 'palace-and-heritage-weddings-in-rajasthan-guide',
    hubId: 'venues',
    eyebrow: 'Venue planning guide',
    title: 'Palace Weddings in Rajasthan: Venue Guide',
    h1: 'Palace and Heritage Weddings in Rajasthan:',
    h1Accent: 'A Venue Planning Guide',
    description:
      'A practical guide to palace and heritage wedding venues in Rajasthan: the venue categories, what heritage properties restrict, how to shortlist, season and the questions to ask on a site visit.',
    primaryKeyword: 'palace wedding in rajasthan',
    secondaryKeywords: [
      'heritage wedding venues rajasthan',
      'palace wedding venues in udaipur',
      'fort wedding rajasthan',
      'royal wedding in rajasthan',
      'rajasthan wedding venue site visit',
    ],
    lead:
      'Rajasthan is the reason a large share of destination weddings happen in India at all: palaces, forts, havelis and lakeside properties give you a setting that decor cannot imitate. They also come with real constraints. This guide explains the venue categories, what heritage architecture restricts, and how to shortlist and inspect a property properly.',
    sections: [
      {
        h2: 'The venue categories, and what each one trades away',
        body: [
          'Not every impressive building in Rajasthan is the same kind of wedding venue. The useful distinction is how much the property gives you and how much you import, because that determines both your budget and how much of your attention the build will consume.',
          'Palace and fort properties, many of them operating as heritage hotels, give you architecture, courtyards and scale. Havelis and smaller heritage houses give intimacy and character for a shorter guest list. Lakeside and garden properties trade architectural drama for setting and open space. Modern luxury resorts give you the smoothest operation, on-site rooms for most of your guests and far fewer restrictions, at the cost of being purpose-built rather than historic.',
          'Most strong Rajasthan weddings mix categories rather than forcing everything into one venue: a courtyard for the intimate ritual, an open lawn for the reception, a resort as the guest base.',
        ],
        bullets: [
          'Palace and fort heritage hotels: architecture and scale, with conservation constraints.',
          'Havelis and heritage houses: character and intimacy for smaller guest lists.',
          'Lakeside and garden properties: setting and open space over architecture.',
          'Modern luxury resorts: easiest operations and on-site accommodation.',
        ],
      },
      {
        h2: 'What heritage properties genuinely restrict',
        body: [
          'This is the part couples discover late, and it is worth knowing before you fall in love with a courtyard. Historic structures are protected, and the restrictions that follow are not negotiable in the way a hotel\'s preferences sometimes are.',
          'Expect limits on what you may fix to walls, floors and columns, which rules out some rigging, some lighting positions and some heavy structures. Expect narrow load-in and load-out windows, often outside guest hours, which lengthens the build and raises crew cost. Expect sound limits and curfews, which affect sangeet and after-party planning more than anything else. Expect restrictions on open flame, fireworks and sometimes on the havan arrangements, which need to be resolved early with the property rather than assumed.',
          'None of this is a reason to avoid heritage venues. It is a reason to get the property\'s written event guidelines before you sign, and to let your planner and production team read them before you commit to a design.',
        ],
        bullets: [
          'Rigging and fixing restrictions on protected walls, floors and columns.',
          'Narrow load-in and load-out windows, often outside guest hours.',
          'Sound limits and curfews that shape sangeet and after-party plans.',
          'Rules on open flame, fireworks and havan arrangements.',
        ],
      },
      {
        h2: 'How to shortlist without wasting months',
        body: [
          'Shortlisting works best as elimination against hard constraints, not as collecting favourites. Four filters remove most of the field quickly.',
          'Start with your date window and ask only about availability; a venue that cannot host you is not a candidate however beautiful it is. Then filter on guest count against the property\'s realistic capacity for your largest function, not its maximum on paper. Then filter on accommodation: how many of your guests the property can house, and where the rest would stay. Only then look at design fit.',
          'Four to six properties is a workable shortlist. Beyond that you are comparing photographs rather than making a decision, and the good dates are going to other couples while you do it.',
        ],
        bullets: [
          'Filter one: is the date window actually available.',
          'Filter two: realistic capacity for your largest function.',
          'Filter three: how many guests sleep on site, and where the rest go.',
          'Filter four: design and atmosphere fit.',
        ],
      },
      {
        h2: 'Season: the cooler months, and what to do if you miss them',
        body: [
          'Rajasthan\'s comfortable wedding window is the cooler part of the year, broadly the post-monsoon to early-spring months. That window is also the competitive one, so the properties and vendors you want are committed earliest.',
          'Within the cool months, plan for a genuine daily temperature swing. Daytime functions may need shade and cooling while the same day\'s late evening needs heaters, particularly for older guests sitting still outdoors. Build both into the budget rather than deciding on the day.',
          'Outside the window it is still perfectly possible, and cheaper and more available, provided you design for the weather rather than hoping: daytime functions moved early or indoors, real shade and cooling, and a committed indoor alternative for every outdoor function during the monsoon months.',
        ],
      },
      {
        h2: 'The site visit: what to actually check',
        body: [
          'A site visit spent admiring the architecture is a wasted trip. Walk the property as your guests and your crew will use it, and check the things that cause problems later.',
          'Walk each function space and ask where power comes from, where the kitchen is relative to the dining area, and where the crew work and store equipment out of sight. Walk the route your elderly guests will take from room to ceremony, counting steps and uneven ground. Stand in the ceremony space at the time of day the ceremony will happen, to see the real light and hear the real noise. Ask what else is booked on the property on your dates.',
          'Then ask for the written event guidelines, the itemised quote with exclusions stated, and the load-in window. Those three documents tell you more about how your wedding will run than any photograph.',
        ],
        bullets: [
          'Power, kitchen position and crew back-of-house for every function space.',
          'The walking route and surfaces your elderly guests will actually use.',
          'The ceremony space at the real time of day, for light and noise.',
          'What else is booked on the property on your dates.',
          'Written event guidelines, itemised quote with exclusions, and load-in window.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you get married inside a palace or fort in Rajasthan?',
        a: 'Many heritage palaces, forts and havelis operate as heritage hotels and host weddings in their courtyards, lawns and halls. Which specific spaces you may use, and what you may build in them, varies by property and is governed by that property\'s event guidelines and by conservation rules, so ask for those guidelines in writing before committing to a design.',
      },
      {
        q: 'What is the best month for a palace wedding in Rajasthan?',
        a: 'The cooler months from roughly October to March are generally preferred for outdoor celebrations, and they are also the most competitive and most expensive. Expect a daily temperature swing within those months: shade or cooling for daytime functions and heating for late winter evenings, especially for guests sitting outdoors.',
      },
      {
        q: 'Are heritage venues more difficult to plan than resorts?',
        a: 'Generally yes, operationally. Heritage properties usually restrict what you can fix to protected structures, give narrower load-in windows, and apply sound limits and curfews. Modern resorts are simpler to run and house more guests on site. Heritage venues repay the extra effort with atmosphere that cannot be built.',
      },
      {
        q: 'How many venues do we need for a multi-day Rajasthan wedding?',
        a: 'Many couples use more than one space, often a courtyard for the intimate ritual, an open lawn for the larger reception and a resort as the guest base. Each additional venue adds transfer legs for guests and crew, so weigh the variety against the time your guests spend moving between functions.',
      },
      {
        q: 'What should we ask a Rajasthan venue before signing?',
        a: 'Ask for the written event guidelines, an itemised quote with exclusions clearly stated, the load-in and load-out windows, the sound limit and curfew, the rules on open flame and fireworks, how many of your guests can be housed on site, and what else is booked on the property on your dates.',
      },
    ],
    cities: [
      { label: 'Wedding planner in Udaipur', href: '/wedding-planner-in-udaipur/' },
      { label: 'Wedding planner in Jaipur', href: '/wedding-planner-in-jaipur/' },
      { label: 'Wedding planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' },
      { label: 'Wedding planner in Jaisalmer', href: '/wedding-planner-in-jaisalmer/' },
      { label: 'Wedding planner in Kumbhalgarh', href: '/wedding-planner-in-kumbhalgarh/' },
      { label: 'Wedding planner in Pushkar', href: '/wedding-planner-in-pushkar/' },
      { label: 'Wedding planner in Ranakpur', href: '/wedding-planner-in-ranakpur/' },
      { label: 'Wedding decoration and mandap design', href: '/traditional-decoration/' },
    ],
    guides: [
      { label: 'Top 15 wedding destinations in Rajasthan', href: '/top-15-wedding-destinations-in-rajasthan/' },
      { label: 'Best wedding venues in Kumbhalgarh', href: '/best-wedding-venues-in-kumbhalgarh/' },
      { label: 'A palace wedding in Rajasthan without breaking the bank', href: '/palace-wedding-in-rajasthan-without-breaking-the-bank/' },
      { label: 'Why Udaipur is the wedding capital of India', href: '/why-udaipur-is-the-wedding-capital-of-india/' },
      { label: 'A dream wedding in Jaisalmer', href: '/dream-wedding-in-jaisalmer/' },
      { label: 'Wedding entry ideas for Rajasthan weddings', href: '/wedding-entry-for-destination-weddings-in-rajasthan/' },
    ],
  },
  {
    slug: 'nri-wedding-in-india-guide',
    hubId: 'nri',
    eyebrow: 'Guide for families abroad',
    title: 'NRI Wedding in India: Planning from Abroad',
    h1: 'Planning an Indian Wedding from Abroad:',
    h1Accent: 'The Complete NRI Guide',
    description:
      'A practical guide for NRI and overseas families planning a wedding in India: timelines across time zones, deciding remotely, vendor coordination, guest travel from abroad and what to handle on your one scouting trip.',
    primaryKeyword: 'nri wedding in india',
    secondaryKeywords: [
      'planning indian wedding from abroad',
      'destination wedding in india from usa',
      'nri wedding planner india',
      'indian wedding from uk',
      'remote wedding planning india',
    ],
    lead:
      'Planning a wedding in India while living in another country is a different problem from planning one at home. You cannot drop in on a venue, you are awake when your vendors are asleep, and you are asking relatives to book international flights a long way ahead. This guide covers how to decide remotely, how to use a scouting trip well, and how to look after guests flying in.',
    sections: [
      {
        h2: 'Decide the three things that are hard to change first',
        body: [
          'When you are planning remotely, sequencing matters more than it does for a local wedding, because every reversal costs you weeks rather than an afternoon. Three decisions are expensive to undo: the city, the date window, and the venue. Settle those before anything else.',
          'The city determines which airport your relatives fly into and how long the onward transfer is, which in turn shapes the cost and difficulty of the whole trip for everyone travelling. The date window has to clear three separate calendars: the season in your chosen region, your own leave from work, and the school holidays or leave constraints of the families flying in. The venue follows from both.',
          'Everything else, design, menus, outfits, entertainment, can be decided later and changed without penalty. Do not let those discussions crowd out the three that cannot.',
        ],
        bullets: [
          'City: sets the airport, the transfer and the cost of travel for everyone.',
          'Date window: must clear the region\'s season, your leave and the families\' leave.',
          'Venue: follows from the first two, and is the hardest to re-book.',
        ],
      },
      {
        h2: 'Make the time difference work for you',
        body: [
          'A significant time difference is manageable once you stop fighting it. The pattern that works is a small number of scheduled live calls plus a lot of asynchronous decision-making, rather than constant ad hoc messaging at awkward hours.',
          'Set one recurring call each week at a time that is genuinely workable at both ends, and treat it as the decision point: everything that needs a real conversation waits for it. Between calls, ask for written updates and let your planner or vendor send options, photographs and quotes for you to review when you are awake. The useful habit is asking for every option as a written, itemised comparison rather than a verbal recommendation, because you cannot read a room you are not in.',
          'Agree explicitly who may approve what in your absence, and up to what value. A planner who can approve small operational decisions without waking you saves days over the course of a long engagement; one who approves large ones without asking causes problems.',
        ],
        bullets: [
          'One scheduled weekly call at a time that works at both ends.',
          'Written, itemised options between calls rather than verbal recommendations.',
          'Video walkthroughs of spaces and samples instead of still photographs.',
          'Written approval limits: what can be decided without you, and up to what value.',
        ],
      },
      {
        h2: 'Use your scouting trip properly',
        body: [
          'Most overseas families manage one trip to India before the wedding, sometimes two. An unplanned trip is largely wasted on pleasant venue tours; a planned one can settle almost everything that needs physical presence.',
          'Front-load the trip with the things that genuinely require you to be there: walking the shortlisted venues, tasting food, seeing decor and floral samples in person, and meeting the people who will actually be on site during your functions, not just the person who sells. Where you can, do the banking and documentation errands that are easier in person on the same trip.',
          'Build the itinerary so the venue visits come early, leaving the back half of the trip free to act on what you learned, including a second look at whichever property you are leaning towards. Travelling with the family members whose opinion will matter avoids relitigating the decision later from another continent.',
        ],
        bullets: [
          'Walk every shortlisted venue; stand in each space at the real time of day.',
          'Taste the food and see decor and floral samples physically.',
          'Meet the people who will be on site on the day, not only the salesperson.',
          'Schedule venue visits early in the trip so you can revisit your favourite.',
        ],
      },
      {
        h2: 'Guests flying in need more lead time than you think',
        body: [
          'Guests travelling internationally are committing to flights, leave from work and often a visa. They need to know far earlier than guests who can drive over, and the information they need is different.',
          'Give overseas guests their dates as early as you can fix them, even before invitations are formally sent, so they can book affordable flights and request leave. Tell them which airport to fly into and how long the onward journey is; the difference between a direct arrival and a long road transfer changes which flight they should book. Be explicit about which days are functions and which are travel, so nobody books a flight that lands two hours before the ceremony.',
          'Be clear and early about anything requiring paperwork. Guests who are not Indian citizens may need a visa, and that is their responsibility and their timeline, not something to raise a month out. Point them to the official sources rather than advising them yourself.',
        ],
        bullets: [
          'Share dates as early as possible, ahead of formal invitations, for flights and leave.',
          'Name the arrival airport and the real onward transfer time.',
          'Mark which days are functions and which are travel days.',
          'Flag visa or documentation needs early, pointing to official sources.',
        ],
      },
      {
        h2: 'What to insist on when you are not in the country',
        body: [
          'Distance removes your ability to drop in and check, so it has to be replaced by documentation and by one accountable point of contact. These are the things worth being firm about.',
          'Insist on itemised written quotes with exclusions stated, so you can compare vendors properly and are not surprised later. Insist on a single named point of contact who is accountable for the whole wedding, rather than coordinating six vendors yourself across a time difference. Insist on knowing how payments flow and to whom, and keep records. Insist on a written production schedule for each function day, and on video walkthroughs at build stage so you can see the space before your guests do.',
          'Rasm Weddings & Events is based in Udaipur and regularly plans weddings for families living abroad, handling venue shortlisting, vendor contracting, guest transfers and on-site coordination from this end. If you want to talk through a city, a season or a rough budget before you commit, the first consultation is free and we will work around your time zone.',
        ],
        bullets: [
          'Itemised written quotes with exclusions clearly stated.',
          'One named, accountable point of contact for the whole wedding.',
          'A written record of how payments flow and to whom.',
          'A written production schedule per function day, plus video walkthroughs at build.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do we plan a wedding in India while living abroad?',
        a: 'Settle the three decisions that are expensive to reverse first: the city, the date window and the venue. Then run the engagement on one scheduled weekly call plus written, itemised options in between, give one person on the ground accountability for the whole wedding, and use your scouting trip for the things that genuinely need you physically present.',
      },
      {
        q: 'How many trips to India do we need before the wedding?',
        a: 'Many overseas families manage with one well-planned trip, and some make two. One trip is usually enough if you use it for venue walkthroughs, food tasting, seeing decor samples and meeting the people who will be on site, and if everything else is handled remotely with written options and video walkthroughs.',
      },
      {
        q: 'How much notice do overseas guests need?',
        a: 'More than local guests, because they are booking international flights, requesting leave and possibly arranging a visa. Share your dates as early as you can fix them, even before formal invitations, and tell them the arrival airport, the onward transfer time and which days are functions rather than travel days.',
      },
      {
        q: 'Do our foreign-national guests need a visa for the wedding?',
        a: 'Visa requirements depend on the guest\'s nationality and current Indian government rules, which change. Flag the question early so guests have time, and point them to the official Indian government visa sources rather than advising them yourself. Do not rely on second-hand information for anyone\'s travel documents.',
      },
      {
        q: 'How do we handle the time difference with vendors in India?',
        a: 'Stop improvising around it. Fix one recurring weekly call at a time that genuinely works at both ends and treat it as the decision point, ask for written itemised options and video walkthroughs between calls, and agree in writing what your planner may approve without you and up to what value.',
      },
      {
        q: 'Can a planner in India handle everything if we cannot be there?',
        a: 'A planner can handle venue shortlisting, vendor contracting, production timelines, guest transfers and on-site coordination. What you should still do yourself is approve the itemised quotes, keep records of payments, and make the design and guest-list decisions. Insist on one named point of contact who is accountable for the whole wedding.',
      },
    ],
    cities: [
      { label: 'Wedding planner in Udaipur', href: '/wedding-planner-in-udaipur/' },
      { label: 'Wedding planner in Jaipur', href: '/wedding-planner-in-jaipur/' },
      { label: 'Wedding planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' },
      { label: 'Wedding planner in Goa', href: '/wedding-planner-in-goa/' },
      { label: 'Wedding planner in Thailand', href: '/wedding-planner-in-thailand/' },
      { label: 'All wedding destinations', href: '/wedding-destination/' },
      { label: 'Wedding planning services', href: '/services/' },
      { label: 'Contact our Udaipur team', href: '/contact-us/' },
    ],
    guides: [
      { label: 'Destination wedding checklist for your dream wedding', href: '/checklist-for-your-dream-wedding/' },
      { label: 'Top destination wedding planning tips', href: '/top-destination-wedding-planning-tips/' },
      { label: 'Why Udaipur is the wedding capital of India', href: '/why-udaipur-is-the-wedding-capital-of-india/' },
      { label: 'Why hiring a wedding planner is essential', href: '/why-to-hire-a-wedding-planner-is-essential/' },
      { label: 'The 7 sacred vows in Hindu marriages', href: '/7-sacred-vows-in-hindu-marriages/' },
      { label: '8 unique Rajasthani wedding traditions', href: '/8-unique-rajasthani-wedding-traditions/' },
    ],
  },
];

export const PILLAR_BY_SLUG: Record<string, Pillar> = Object.fromEntries(PILLARS.map((p) => [p.slug, p]));

/** Slugs owned by code. The programmatic engine treats these hubs as published (see the file header). */
export const PILLAR_SLUGS: string[] = PILLARS.map((p) => p.slug);

/** Cross-links between pillars, so each hub passes authority to the others. */
export const otherPillars = (slug: string) =>
  PILLARS.filter((p) => p.slug !== slug).map((p) => ({ label: p.title, href: `/${p.slug}/` }));
