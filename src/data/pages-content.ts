/**
 * Copy for the inner pages. Rules followed here:
 * - only facts the business already publishes (Udaipur office, 500+ events, 10+ years, 9 services, 12 destinations,
 *   packages from Rs 30 Lacs, special hotel room rates for wedding groups);
 * - no invented awards, guarantees, response times or partnerships;
 * - each page targets one main keyword in the H1 and supporting keywords in H2s, FAQs and body copy.
 */
import type { ProseBlock } from '@/components/PageParts';

export const FACTS = [
  { value: '500+', label: 'Events planned' },
  { value: '10+', label: 'Years of experience' },
  { value: '9', label: 'Planning services' },
  { value: '12', label: 'Wedding destinations' },
];

export const PROCESS = [
  { title: 'Free consultation', text: 'Tell us your dates, guest count, destination and style. We listen first, then suggest venues and a plan that fits.' },
  { title: 'Venue and budget plan', text: 'We shortlist venues, arrange visits (or photo and video walk-throughs if you live abroad) and share a clear written estimate.' },
  { title: 'Design and vendors', text: 'Decor concepts, caterers, photographers, artists and logistics are confirmed with your approval at every step.' },
  { title: 'Guest and travel planning', text: 'Room blocks, arrivals, transfers, welcome plans and the function-by-function itinerary are arranged for your guests.' },
  { title: 'Final walk-through', text: 'We inspect the venue, brief every vendor and rehearse the key moments such as the entry, pheras and dinner service.' },
  { title: 'On-ground execution', text: 'The Rasm team runs the schedule on location so your family can celebrate while we manage the details.' },
];

/* ------------------------------ Services ------------------------------ */

export interface ServiceCopy {
  key: string;
  title: string;
  match: RegExp;
  text: string;
  points: string[];
}

export const SERVICES: ServiceCopy[] = [
  {
    key: 'venues', title: 'Destination and Venue Selection', match: /destination|venue/i,
    text: 'The venue sets your budget, your guest experience and your available dates. We shortlist wedding venues in Udaipur and across Rajasthan, arrange site visits, compare capacity and rules, and handle booking.',
    points: ['Palace, heritage hotel, resort and garden venues', 'Capacity, backup and permission checks', 'Site visits or video walk-throughs for NRI families', 'Special room rates for wedding groups at partner hotels'],
  },
  {
    key: 'decor', title: 'Wedding Decor Management', match: /decor/i,
    text: 'Our wedding decorators in Udaipur design mandaps, stages, entrances, floral ceilings and lighting around your story, and manage the build, the show and the teardown.',
    points: ['Mandap, stage and backdrop design', 'Floral, drape and lighting concepts', 'Decor for haldi, mehndi, sangeet and reception', 'Mock-ups shared before execution'],
  },
  {
    key: 'food', title: 'Food and Beverage', match: /food|beverage|cater/i,
    text: 'Wedding catering in Udaipur is about more than a menu. We plan tastings, live counters, regional thalis, international dishes, Jain and vegetarian options, and coordinate service with the venue or caterer.',
    points: ['Menu planning and tastings', 'Rajasthani and Mewari specialities', 'Live counters and beverage plans', 'Dietary and elderly-guest needs'],
  },
  {
    key: 'entertainment', title: 'Entertainment and Artist Management', match: /entertain/i,
    text: 'From sangeet choreography and DJs to live bands, folk performers and celebrity artists, we book and manage the entertainment for every function so the energy matches the occasion.',
    points: ['DJ, live band and folk artists', 'Sangeet choreography and anchors', 'Celebrity artist booking and coordination', 'Sound, stage and light technical planning'],
  },
  {
    key: 'hospitality', title: 'Hospitality and Guest Management', match: /hospitality|guest/i,
    text: 'A destination wedding depends on how guests are looked after. We manage accommodation, arrivals, welcome, itineraries and a help desk, so relatives travelling from India or abroad feel cared for.',
    points: ['Room allocation and room blocks', 'Airport and station pick-ups', 'Welcome kits and printed itineraries', 'On-site guest help desk'],
  },
  {
    key: 'logistics', title: 'Logistics and Transportation', match: /logistic/i,
    text: 'Moving people, equipment and vendors between hotels and venues is where weddings run late. We schedule vehicles, shuttles, load-ins and timings so every function starts on time.',
    points: ['Guest shuttles and airport transfers', 'Vendor and equipment movement', 'Baraat vehicles and entry coordination', 'Day-of timing control'],
  },
  {
    key: 'vendors', title: 'Vendor Management', match: /vendor/i,
    text: 'Photographers, videographers, makeup artists, florists, pandits and technicians all need one clear brief. We source, brief and supervise them so you deal with one point of contact.',
    points: ['Photographer and videographer coordination', 'Makeup, mehndi and pandit booking', 'Contracts and delivery schedules', 'Quality checks on the day'],
  },
  {
    key: 'budget', title: 'Budget Management', match: /budget/i,
    text: 'We prepare a transparent wedding budget with venue options at different price levels, track every commitment and show where spending can be reduced without hurting the experience.',
    points: ['Function-wise cost breakdown', 'Options at different budget levels', 'Payment schedule tracking', 'Clear written estimates'],
  },
  {
    key: 'invites', title: 'Invitations and Gifting', match: /invitation|gift/i,
    text: 'Invitations set the tone for your wedding. We coordinate design, printing and digital invites, plus welcome hampers and return gifts that suit your guests and your theme.',
    points: ['Print and digital invitation design', 'Welcome hampers and room gifts', 'Return gifts for guests', 'Delivery and RSVP coordination'],
  },
];

export const SERVICES_FAQ = [
  { q: 'What does a wedding planner in Udaipur actually do?', a: 'A wedding planner takes ownership of the whole celebration: shortlisting and booking venues, designing decor, coordinating caterers, artists and photographers, managing guest travel and stay, and running the schedule on the wedding days. With Rasm you can take complete planning or choose individual services.' },
  { q: 'How much do your wedding planning packages cost?', a: 'Rasm wedding planning packages start from Rs 30,00,000 (30 Lacs) and go up to Rs 1 Crore or more depending on guest count, venue, number of functions, decor scale and customisation. We share a written estimate after the first consultation.' },
  { q: 'Can I hire Rasm for only one service, such as decor or venue booking?', a: 'Yes. Each of the nine services can be taken separately, although most couples find that planning and decor managed by one team saves time and avoids coordination gaps.' },
  { q: 'Do you plan weddings outside Udaipur?', a: 'Yes. We plan destination weddings in Jaipur, Jodhpur, Jaisalmer, Kumbhalgarh, Mount Abu, Nathdwara, Pushkar, Ranakpur, Kota, Goa and Thailand, along with Ahmedabad and Gandhinagar.' },
  { q: 'Can you plan my wedding if I live abroad?', a: 'Yes. Many of our couples live overseas. We plan through video calls, shared proposals and photo and video updates, and our Udaipur team represents you on location.' },
  { q: 'How early should I contact a wedding planner in Udaipur?', a: 'For palace and lake venues in peak months, contact us 10 to 12 months ahead. For hotels and resorts, 6 to 8 months is usually enough. Earlier is always easier for venue and date availability.' },
];

export const SERVICES_PROSE: ProseBlock[] = [
  {
    h: 'Complete Wedding Planning Services in Udaipur, Rajasthan',
    p: [
      'Rasm Weddings & Events is a full-service wedding planner in Udaipur. Our nine services cover everything a destination wedding needs: venues, decor, food, entertainment, hospitality, logistics, vendors, budgets and invitations. You can hand over the entire wedding or choose only the parts you need.',
      'Working from our office in Ashok Nagar, Udaipur, we have planned more than 500 events in over ten years, including palace weddings, lake weddings, heritage fort weddings and multi-day celebrations for families in India, the UK, the USA, the UAE, Canada and Australia.',
    ],
    links: [{ text: 'palace weddings', href: '/wedding-planner-in-udaipur/' }],
  },
  {
    h: 'Why One Team for Planning, Decor and Hospitality Works Better',
    p: [
      'Most wedding stress comes from gaps between separate vendors: the decorator and the venue disagree on timings, the caterer and the hotel do not share guest numbers, and no one owns the schedule. When the same team handles planning, wedding decor in Udaipur, guest hospitality and on-ground execution, those gaps close and you deal with one point of contact from the first call to the last guest departure.',
    ],
  },
];

/* ------------------------------ About ------------------------------ */

export const ABOUT_POINTS = [
  { title: 'One team, start to finish', text: 'Venue, decor, food, entertainment, guests and logistics are planned and run by the same Udaipur team, so nothing falls between vendors.' },
  { title: 'Local base in Udaipur', text: 'Our office is at 510, City Centre, Ashok Nagar, Udaipur. We know the venues, the vendors and the season, and we are available to meet in person.' },
  { title: 'Clear, written estimates', text: 'You see venue options at different budget levels and a function-wise breakdown before you commit to anything.' },
  { title: 'Special hotel rates for groups', text: 'We arrange special room rates for wedding groups at partner hotels, which helps families manage guest accommodation costs.' },
  { title: 'Planning from anywhere', text: 'Video consultations, shared design boards and photo and video updates let NRI and international couples plan without being in India.' },
  { title: 'Traditions respected', text: 'We help you keep the rituals that matter to your family, whether that is a Rajasthani baraat, a Sikh Anand Karaj or a Gujarati wedding.' },
];

export const ABOUT_FAQ = [
  { q: 'Who is Rasm Weddings & Events?', a: 'Rasm Weddings & Events is a wedding and event planning company based in Udaipur, Rajasthan. We have more than ten years of experience and have planned over 500 events, from intimate ceremonies to multi-day destination weddings.' },
  { q: 'Where is your office?', a: 'Our office is at 510, City Centre, Ashok Nagar, Udaipur, Rajasthan 313001. You are welcome to visit; please call or message us first to fix a time.' },
  { q: 'What kinds of events do you plan?', a: 'We plan weddings and wedding functions such as haldi, mehndi, sangeet, cocktail nights and receptions, as well as corporate and VIP events in Udaipur and across Rajasthan.' },
  { q: 'Do you work with couples from abroad?', a: 'Yes. Many of our weddings are planned for couples and families living in the UK, USA, UAE, Canada and Australia, with planning handled remotely and execution handled by our Udaipur team.' },
];

export const ABOUT_PROSE: ProseBlock[] = [
  {
    h: 'The Wedding Planner in Udaipur Families Come Back To',
    p: [
      'Rasm Weddings & Events began with a simple idea: a wedding should feel like the couple, and the people planning it should carry the pressure so the family does not have to. Over more than ten years in Udaipur we have turned that idea into a repeatable way of working: listen first, plan in writing, confirm every vendor with your approval and be on location when it matters.',
      'Udaipur is known as the wedding capital of India for good reason. Lake palaces, heritage havelis, hilltop resorts and a hospitality culture that suits large families make it ideal for destination weddings. Our job is to match the right venue and the right plan to your dates, guests and budget.',
    ],
    links: [{ text: 'destination weddings', href: '/wedding-destination/' }],
  },
];

/* ------------------------------ Decoration ------------------------------ */

export const DECOR_TYPES = [
  { title: 'Mandap decoration', text: 'Traditional, floral, minimal or palace-style mandaps built for the pheras, with seating, canopy and aisle designed for photographs and comfort.' },
  { title: 'Stage and reception decor', text: 'Backdrops, stage furniture and lighting for the reception, engagement or sangeet, designed to look good in photographs and on video.' },
  { title: 'Entrances and pathways', text: 'Gateways, floral walkways, drapes and lighting that welcome guests and set the tone before they reach the main venue.' },
  { title: 'Floral decoration', text: 'Fresh and artificial floral work in marigold, rose, tuberose, orchids and mogra, planned for the season, venue and budget.' },
  { title: 'Haldi, mehndi and sangeet decor', text: 'Colourful, relaxed setups with low seating, cushions, swings, props and fabric work for the smaller functions.' },
  { title: 'Lighting and lanterns', text: 'Chandeliers, string lights, lanterns and uplighting to turn courtyards, lawns and lakesides into evening venues.' },
  { title: 'Table and banquet decor', text: 'Centrepieces, linens, candles and seating layouts for dinners, from intimate family tables to long banquet setups.' },
  { title: 'Theme and custom concepts', text: 'Traditional red and gold, white and gold, pastel, Rajasthani heritage or a theme from your own story.' },
];

export const DECOR_STEPS = [
  { title: 'Brief and venue visit', text: 'We understand your style, functions and budget, and study the venue space, light and rules.' },
  { title: 'Concept and mood boards', text: 'You receive colour palettes, references and layouts for each function, which you can refine.' },
  { title: 'Mock-up and approval', text: 'We share the final design and material plan so you approve before anything is built.' },
  { title: 'Sourcing and build', text: 'Flowers, fabrics, structures and lighting are sourced and set up on a fixed schedule at the venue.' },
  { title: 'Event-day styling', text: 'Our team does the final styling, checks lighting after dark and fixes issues during the function.' },
  { title: 'Teardown', text: 'Clearing and handover to the venue are managed so your family is not left with loose ends.' },
];

export const DECOR_FAQ = [
  { q: 'Who is the best wedding decorator in Udaipur?', a: 'The best decorator is the one who understands your style and venue and works within your budget. Rasm Weddings & Events designs and manages wedding decor in Udaipur as part of full planning or as a stand-alone service, and shares mock-ups before execution.' },
  { q: 'How much does wedding decoration in Udaipur cost?', a: 'Cost depends on the venue, stage and mandap scale, flower volume, lighting and the number of functions. We prepare a function-wise estimate after the first consultation, with options at different budget levels.' },
  { q: 'Can you decorate a venue that we have already booked?', a: 'Yes. You can take decor as a separate service even if you have already chosen a venue. We will visit or review the venue and share a concept for approval.' },
  { q: 'Do you use fresh or artificial flowers?', a: 'Both. Fresh flowers suit mandaps, garlands and aisles when the season and budget allow, while artificial or mixed florals are practical for large backdrops and long-running setups. We recommend the right mix for each element.' },
  { q: 'How early should we book wedding decor?', a: 'For peak dates between October and March, 4 to 6 months ahead is comfortable, and earlier if you want custom structures. Shorter timelines are possible depending on availability.' },
];

export const DECOR_PROSE: ProseBlock[] = [
  {
    h: 'Wedding Decorators in Udaipur for Palaces, Lakes and Gardens',
    p: [
      'Decor is where a venue becomes your wedding. Our team designs and builds mandaps, stages, entrances, florals and lighting for palace courtyards, lakeside lawns, heritage hotels, resort gardens and ballrooms in Udaipur and across Rajasthan.',
      'Each setup is planned for how it will be experienced: how guests walk in, where the family sits, how the stage looks in photographs and how the lighting works after dark. That practical thinking is what separates beautiful decor from decor that works.',
    ],
    links: [{ text: 'wedding venues', href: '/wedding-destination/' }],
  },
  {
    h: 'Traditional Wedding Decoration Rooted in Rajasthani Heritage',
    p: [
      'Traditional wedding decoration in Rajasthan draws on marigold garlands, brass urns, rich fabrics, carved arches and warm red, gold and orange palettes. We combine these elements with modern lighting and clean layouts so the result feels classic rather than crowded.',
      'If you prefer something contemporary, we also design pastel, white and gold and minimal concepts, and we can mix traditions for families that celebrate more than one custom.',
    ],
  },
];

/* ------------------------------ Corporate ------------------------------ */

export const CORPORATE_TYPES = [
  { title: 'Conferences and summits', text: 'Venue sourcing, stage and AV coordination, registration, speaker hospitality and delegate stay for one-day and multi-day programmes.' },
  { title: 'Incentive trips and retreats', text: 'Leadership retreats and team rewards at heritage hotels and resorts, with activities, dining and transfers planned end to end.' },
  { title: 'Gala dinners and award nights', text: 'Formal evenings with stage, lighting, entertainment, anchors and plated or buffet dining in palace and heritage settings.' },
  { title: 'Product launches and brand events', text: 'Stage design, guest flow, branding and technical production for launches, dealer meets and brand activations.' },
  { title: 'Annual meets and dealer conferences', text: 'Programmes that combine business sessions, recognition and entertainment for large teams travelling to Udaipur.' },
  { title: 'VIP and delegate hospitality', text: 'Arrivals, transport, accommodation and planning team support for senior guests, speakers and international visitors.' },
];

export const CORPORATE_FAQ = [
  { q: 'Do you organise corporate events in Udaipur?', a: 'Yes. Rasm Weddings & Events plans conferences, incentive trips, gala dinners, product launches, annual meets and VIP hospitality in Udaipur and across Rajasthan, using the same venue, decor, hospitality and execution team that plans our weddings.' },
  { q: 'Which venues do you use for corporate events?', a: 'Depending on group size and purpose, we work with palaces, heritage hotels, lakeside resorts and conference-capable hotels in Udaipur and other Rajasthan cities. We recommend venues after understanding your agenda, headcount and budget.' },
  { q: 'Can you handle delegate accommodation and transport?', a: 'Yes. We manage room blocks, airport and station transfers, local transport and guest help desks so delegates arrive and move comfortably.' },
  { q: 'How far ahead should we plan a corporate event in Rajasthan?', a: 'For groups of 100 or more in peak months from October to March, start planning 3 to 6 months ahead. Smaller programmes can be arranged faster depending on venue availability.' },
  { q: 'Can you manage entertainment and production?', a: 'Yes. We coordinate stage, sound, lighting, LED screens, anchors, artists and folk performances, with technical checks before the event.' },
];

export const CORPORATE_PROSE: ProseBlock[] = [
  {
    h: 'Corporate Event Management Company in Udaipur, Rajasthan',
    p: [
      'A palace courtyard can make a gala dinner memorable. A heritage hotel can give a leadership retreat a welcome change of pace. But a successful corporate event needs more than an impressive backdrop: guests must arrive comfortably, speakers need reliable production and the programme must fit the venue rules.',
      'Rasm Weddings & Events, based in Udaipur, plans corporate and VIP events with the same attention to venue, hospitality and on-ground execution that we bring to weddings. We work to your agenda, budget and brand, and give you one point of contact from planning to departure.',
    ],
    links: [{ text: 'on-ground execution', href: '/services/' }],
  },
  {
    h: 'Why Hold a Corporate Event in Udaipur',
    p: [
      'Udaipur offers direct air connectivity to major Indian cities, a large choice of heritage and luxury hotels, pleasant weather from October to March and a setting that delegates remember. For incentive trips and leadership retreats, the combination of lakes, palaces and Rajasthani hospitality is hard to match.',
    ],
  },
];

/* ------------------------------ Contact ------------------------------ */

export const CONTACT_FAQ = [
  { q: 'How do I book a free consultation with Rasm Weddings & Events?', a: 'Use the form on this page, call us or message us on WhatsApp. Tell us your approximate dates, guest count and preferred destination, and our Udaipur team will get back to you with next steps.' },
  { q: 'What should I share in my first enquiry?', a: 'Your wedding dates or season, number of guests, preferred city, the functions you want and a rough budget range. If you are not sure about any of these, that is fine; we help you decide.' },
  { q: 'Do your packages have a minimum budget?', a: 'Our wedding planning packages start from Rs 30,00,000 (30 Lacs) and go up to Rs 1 Crore or more depending on scale and customisation.' },
  { q: 'Can we meet in person in Udaipur?', a: 'Yes. Our office is at 510, City Centre, Ashok Nagar, Udaipur 313001. Please contact us first so we can fix a convenient time.' },
  { q: 'Can we speak on a video call if we live abroad?', a: 'Yes. We regularly hold planning calls with couples and families in the UK, USA, UAE, Canada and Australia, scheduled around your time zone.' },
];

/* ------------------------------ Destinations ------------------------------ */

export const DEST_FAQ = [
  { q: 'Which is the best destination for a wedding in Rajasthan?', a: 'It depends on your style and guests. Udaipur suits lake palaces and large family celebrations, Jaipur suits forts and havelis, Jodhpur and Jaisalmer suit desert palaces and dunes, and Kumbhalgarh and Mount Abu suit quieter hill settings. We help you compare based on guest count, season and budget.' },
  { q: 'What is the best time for a destination wedding in Rajasthan?', a: 'October to March is the most popular season, with comfortable weather for outdoor ceremonies. The most sought-after dates fill early, so book venues well in advance.' },
  { q: 'Do you plan destination weddings outside Rajasthan?', a: 'Yes. We plan weddings in Goa, Thailand, Ahmedabad and Gandhinagar as well, and can discuss other locations on request.' },
  { q: 'How do I choose between Udaipur and Jaipur for my wedding?', a: 'Udaipur is known for lakes and palace settings with a romantic feel, while Jaipur offers grand forts, havelis and larger city infrastructure. We compare venues, travel access and costs for both so you can decide with facts.' },
  { q: 'Can you help guests travel to the destination?', a: 'Yes. We manage arrivals, transfers, accommodation and itineraries for guests, including family travelling from abroad.' },
];

export const DEST_PROSE: ProseBlock[] = [
  {
    h: 'Destination Wedding Planner in Rajasthan and Beyond',
    p: [
      'Rasm Weddings & Events plans destination weddings across 12 locations. Udaipur is our home, and from there we plan weddings in Jaipur, Jodhpur, Jaisalmer, Kumbhalgarh, Mount Abu, Nathdwara, Pushkar, Ranakpur and Kota in Rajasthan, as well as Goa and Thailand.',
      'Each destination has its own character, season and venue style. Choosing between them is easier when you compare them on the same points: how guests will travel, which months are comfortable, what kind of venues are available and what the likely cost drivers are. The table above and each destination page give you that information.',
    ],
    links: [{ text: 'Udaipur', href: '/wedding-planner-in-udaipur/' }],
  },
  {
    h: 'How to Choose Your Wedding Destination',
    p: [
      'Start with your guests. If many relatives are elderly or travelling from abroad, prioritise destinations with easy airport access and a large hotel base. Then decide on the setting you picture: a lake palace, a desert fort, a hill resort or a beachfront. Finally, check the season, since October to March is comfortable in Rajasthan while Goa is best from November to February.',
      'Talk to us once you have two or three options. We can arrange venue visits, share costs for each destination and recommend the one that fits your plan best.',
    ],
  },
];

/* ------------------------------ Gallery ------------------------------ */

export const GALLERY_PROSE: ProseBlock[] = [
  {
    h: 'Wedding Decor and Celebration Photos from Udaipur and Rajasthan',
    p: [
      'This gallery brings together photographs from weddings and events planned by Rasm Weddings & Events: mandaps, stages, entrances, floral work, lighting and guest setups at palaces, hotels, resorts and gardens in Udaipur and across Rajasthan.',
      'Use it to understand the styles you like, whether that is traditional red and gold, white florals or colourful haldi and mehndi setups, and share your favourites with us during your consultation so we can design something that feels like you.',
    ],
    links: [{ text: 'wedding decor', href: '/traditional-decoration/' }],
  },
];

/* ------------------------------ Blog ------------------------------ */

export const BLOG_PROSE: ProseBlock[] = [
  {
    h: 'Wedding Planning Guides for Udaipur and Destination Weddings in India',
    p: [
      'Our blogs collect practical guides written from real planning experience: how to choose a wedding venue in Udaipur, how to plan a destination wedding in Rajasthan, how much a wedding can cost, rituals and traditions explained, and ideas for decor, outfits and pre-wedding shoots.',
      'If you want help turning any of these ideas into a plan, our Udaipur team is happy to talk.',
    ],
    links: [{ text: 'Udaipur team', href: '/contact-us/' }],
  },
];
