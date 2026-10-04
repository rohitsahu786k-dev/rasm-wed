/**
 * Long-form homepage copy (shown above the footer, collapsed with a "Read more" fade).
 * The full text is always in the HTML so search engines read all of it.
 * Facts used here are only those already published on rasmwed.com: Udaipur office, 500+ events, 10+ years,
 * 12 destinations, 9 planning services, packages from Rs 30 Lacs. Link targets are existing site URLs.
 */
export type SeoBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string; links?: { text: string; href: string }[] }
  | { type: 'ul'; items: string[] };

export const HOME_SEO_HEADING = 'Wedding in Udaipur: Your Complete Guide to Royal Destination Weddings with Rasm Weddings & Events';

export const HOME_SEO_CONTENT: SeoBlock[] = [
  {
    type: 'p',
    text: 'A wedding in Udaipur is not just an event, it is an experience that guests remember for a lifetime. Known worldwide as the City of Lakes, Udaipur combines white marble palaces, shimmering lakes, Aravalli hills and centuries of Mewar hospitality, which is exactly why it is called the wedding capital of India. Rasm Weddings & Events is a luxury wedding planner in Udaipur, based at 510, City Centre, Ashok Nagar, Udaipur, Rajasthan. For more than ten years our team has planned and managed over 500 events, from intimate palace ceremonies to multi-day destination weddings for families living in India, the UK, the USA, the UAE, Canada and Australia.',
    links: [{ text: 'Rasm Weddings & Events', href: '/about-us/' }],
  },
  {
    type: 'p',
    text: 'If you are searching for the best wedding planner in Udaipur, a trusted destination wedding planner in Rajasthan or a team that can deliver a palace wedding in Udaipur on budget and on time, this page explains how we work, what we plan, where we plan it and what you can expect. Everything below is written from real planning experience, so you can use it as a practical checklist for your own wedding.',
  },

  { type: 'h2', text: 'Why Couples Choose a Destination Wedding in Udaipur' },
  {
    type: 'p',
    text: 'Udaipur offers something very few cities can: a ready-made royal backdrop. A couple can exchange vows on a lakeside lawn, host the sangeet in a palace courtyard, arrive for the baraat on a decorated horse or vintage car, and watch the sunset over the water at the reception. A destination wedding in Udaipur also keeps the whole family together in one place for two or three days, which makes the celebration more relaxed and more personal than a city wedding where guests come and go.',
  },
  {
    type: 'ul',
    items: [
      'Iconic lake palaces, heritage havelis, hilltop resorts and luxury five-star hotels within a short drive of each other.',
      'A pleasant wedding season from October to March, with clear skies, mild evenings and golden sunsets.',
      'Excellent air, rail and road connectivity through Maharana Pratap Airport, Udaipur City station and the Ahmedabad and Jaipur highways.',
      'Skilled local artists, decorators, caterers, photographers, musicians and folk performers who understand Rajasthani wedding traditions.',
      'A hospitality culture that makes guests, especially NRI and international guests, feel welcomed from the moment they land.',
    ],
  },

  { type: 'h2', text: 'Wedding Planner in Udaipur: What Rasm Weddings & Events Handles for You' },
  {
    type: 'p',
    text: 'As a full-service wedding planner in Udaipur, Rasm takes ownership of the entire celebration so that the family can enjoy it instead of managing it. Our planning process is built around nine core services, and you can take all of them together or pick only the ones you need.',
    links: [{ text: 'nine core services', href: '/services/' }],
  },
  { type: 'h3', text: 'Venue Selection and Booking' },
  {
    type: 'p',
    text: 'Choosing the right venue decides the budget, the guest experience and even the dates you can get. We shortlist palaces, heritage hotels, lakeside resorts, garden estates and boutique properties based on your guest count, season, budget and style, arrange site visits and negotiate on your behalf. Udaipur has a deep bench of venues, including The Oberoi Udaivilas, The Leela Palace, Jagmandir Island Palace, Fateh Garh, The Ananta and Radisson Udaipur, and we help you compare them honestly for your dates and guest list.',
    links: [{ text: 'wedding venues', href: '/wedding-destination/' }],
  },
  { type: 'h3', text: 'Wedding Decor and Design' },
  {
    type: 'p',
    text: 'Decor is where a venue becomes your wedding. Our design team builds mandaps, stages, entrances, floral ceilings, lounge areas, table settings and lighting around your story, whether you want traditional marigold and rose, a modern white and gold look, or a rich Rajasthani palette of red, saffron and emerald. Every design is presented before execution so there are no surprises on the day.',
    links: [{ text: 'Wedding Decor and Design', href: '/traditional-decoration/' }],
  },
  { type: 'h3', text: 'Hospitality, Logistics and Guest Management' },
  {
    type: 'p',
    text: 'A destination wedding succeeds or fails on logistics. We manage guest arrivals, airport and station pick-ups, hotel room allocation, welcome kits, shuttle schedules, itinerary printing and a dedicated help desk, so a grandmother arriving from London or a cousin landing from Dubai is looked after at every step.',
  },
  { type: 'h3', text: 'Catering and Menu Planning' },
  {
    type: 'p',
    text: 'Udaipur weddings are remembered for their food. We plan multi-cuisine menus with authentic Mewari and Rajasthani thalis, live counters, Indian regional specialities, international dishes, jain and vegetarian options and custom beverage menus, and we coordinate tastings with the hotel or independent caterer.',
  },
  { type: 'h3', text: 'Photography, Videography and Entertainment' },
  {
    type: 'p',
    text: 'From candid wedding photographers and cinematic videographers to DJs, live bands, folk dancers, celebrity artists and sangeet choreographers, we build the entertainment line-up that fits each function. Drone coverage, pre-wedding shoots at lakes and palaces, and same-day highlight films can be added to any plan.',
  },
  { type: 'h3', text: 'On-ground Execution' },
  {
    type: 'p',
    text: 'On the wedding days, a dedicated Rasm team works on location from the first setup to the last guest departure. We run the schedule, brief vendors, manage timings of the baraat, pheras, dinner and farewell, and solve problems quietly in the background so the family never has to.',
  },

  { type: 'h2', text: 'Palace Wedding in Udaipur: Iconic Venues Worth Considering' },
  {
    type: 'p',
    text: 'A palace wedding in Udaipur typically means one of three experiences: a lake palace with water on every side, a city palace with grand courtyards and marble terraces, or a hilltop heritage hotel with sweeping views. Each offers a very different feeling and a different cost structure.',
  },
  {
    type: 'ul',
    items: [
      'Lake palaces: Island and lakeside properties on Lake Pichola and Fateh Sagar give the classic floating-mandap photograph, with boat arrivals and sunset ceremonies.',
      'Heritage palaces and havelis: Courtyards, durbar halls and gardens suit traditional pheras, royal baraat entries and large sangeet nights.',
      'Luxury hotels and resorts: Ballrooms, lawns and multiple venues in one property make logistics simple for larger guest lists.',
      'Boutique resorts and hill retreats: Smaller, quieter properties in the Aravalli foothills suit intimate weddings of 100 to 200 guests.',
    ],
  },
  {
    type: 'p',
    text: 'Because the best venues book up a year or more in advance for peak dates, early planning matters. If your dates are flexible, weekday weddings and the shoulder months of October, February and March can offer better availability and more favourable rates.',
  },

  { type: 'h2', text: 'Destination Wedding Planner Beyond Udaipur: 12 Destinations Across India and Abroad' },
  {
    type: 'p',
    text: 'While Udaipur is our home, Rasm plans destination weddings wherever your story leads. We work across twelve wedding destinations, each with its own character.',
  },
  {
    type: 'p',
    text: 'Wedding planner in Jaipur: pink-city forts, havelis and palace lawns for grand, colourful celebrations.',
    links: [{ text: 'Wedding planner in Jaipur', href: '/wedding-planner-in-jaipur/' }],
  },
  {
    type: 'p',
    text: 'Wedding planner in Jodhpur: the blue city and its sandstone palaces, ideal for imperial entries and desert-style receptions.',
    links: [{ text: 'Wedding planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' }],
  },
  {
    type: 'p',
    text: 'Wedding planner in Jaisalmer: golden fort cities and dune camps for a once-in-a-lifetime Thar desert wedding.',
    links: [{ text: 'Wedding planner in Jaisalmer', href: '/wedding-planner-in-jaisalmer/' }],
  },
  {
    type: 'p',
    text: 'Wedding planner in Kumbhalgarh and Mount Abu: quiet Aravalli retreats with fort views, forests and cool evenings.',
    links: [
      { text: 'Wedding planner in Kumbhalgarh', href: '/wedding-planner-in-kumbhalgarh/' },
      { text: 'Mount Abu', href: '/wedding-planner-in-mount-abu/' },
    ],
  },
  {
    type: 'p',
    text: 'Wedding planner in Goa: beachfront mandaps, coastal resorts and sunset receptions for a relaxed, modern wedding.',
    links: [{ text: 'Wedding planner in Goa', href: '/wedding-planner-in-goa/' }],
  },
  {
    type: 'p',
    text: 'Wedding planner in Thailand: tropical villas and beach resorts for international destination weddings.',
    links: [{ text: 'Wedding planner in Thailand', href: '/wedding-planner-in-thailand/' }],
  },
  {
    type: 'p',
    text: 'We also plan weddings in Nathdwara, Pushkar, Ranakpur, Kota, Ahmedabad, Gandhinagar and Rishikesh, so you can take your wedding to the temple town, riverside, heritage city or coast that matters most to your family.',
  },

  { type: 'h2', text: 'How Much Does a Wedding in Udaipur Cost?' },
  {
    type: 'p',
    text: 'Budget is the first question every couple asks, so here is a realistic picture. Rasm wedding planning packages start from Rs 30,00,000 (30 Lacs) and go up to Rs 1 Crore or more, depending on guest count, venue category, number of functions, decor scale, entertainment and the level of customisation. The final number is shaped by these main factors:',
  },
  {
    type: 'ul',
    items: [
      'Venue: a lake palace or heritage palace costs significantly more than a garden resort or boutique hotel, and peak dates cost more than off-peak dates.',
      'Guest count and stay: accommodation, meals and transport usually account for the largest share of a destination wedding budget.',
      'Decor and design: stage and mandap scale, floral volume, lighting, imported flowers and custom structures.',
      'Entertainment and artists: DJ, live band, folk performers and celebrity appearances.',
      'Number of functions: haldi, mehndi, sangeet, cocktail night, pheras and reception each add setup and catering costs.',
    ],
  },
  {
    type: 'p',
    text: 'During your first consultation we ask about guest count, dates, functions and priorities, and then prepare a transparent estimate with venue options at different budget levels, so you can decide where to spend and where to save.',
  },

  { type: 'h2', text: 'Best Time for a Wedding in Udaipur' },
  {
    type: 'p',
    text: 'The most popular wedding season in Udaipur runs from October to March. Winter days are bright and comfortable, evenings are cool enough for outdoor ceremonies and the lakes are full after the monsoon. November, December and February have the most auspicious dates and the highest demand, so venues, decorators and artists should be booked early. April to June gets hot, but morning weddings and indoor palace venues still work for budget-conscious families, and the monsoon months of July to September bring green hills and lower rates for smaller, more intimate celebrations.',
  },

  { type: 'h2', text: 'Wedding Planning Timeline: From First Call to the Last Vidaai' },
  {
    type: 'ul',
    items: [
      '10 to 12 months before: fix the budget, guest list, dates and shortlist venues. This is the best time to book popular palaces.',
      '8 to 9 months before: finalise venue, accommodation blocks, photographer, decor concept and core entertainment.',
      '5 to 6 months before: confirm menus, travel plans for guests, invitations, outfits and the full function-wise itinerary.',
      '2 to 3 months before: complete decor mock-ups, artist schedules, welcome kits and logistics plan.',
      'Final month: on-site walk-throughs, vendor briefings, rehearsal for the entry and pheras, and guest communication.',
      'Wedding days: Rasm manages setup, timings, guests and vendors from start to finish.',
    ],
  },
  {
    type: 'p',
    text: 'Shorter timelines are possible, but availability of the most sought-after venues and dates is naturally limited, so earlier is always easier.',
  },

  { type: 'h2', text: 'Wedding Planning for NRI and International Couples' },
  {
    type: 'p',
    text: 'Many of our couples live abroad and plan everything remotely. For NRI weddings in Udaipur, we run planning through video calls, shared design boards, WhatsApp updates and detailed written estimates, so you can approve decisions without being in India. Our team coordinates venue visits on your behalf, shares photos and videos of options, handles local permissions and vendor payments in a clear, documented way, and meets your family at the airport when they arrive. Whether you are flying in from London, Dubai, New York, Toronto or Sydney, the planning experience is designed to be calm, transparent and personal.',
  },

  { type: 'h2', text: 'Traditional Rajasthani Wedding Experiences We Create' },
  {
    type: 'p',
    text: 'Rajasthan has some of India\'s most beautiful wedding traditions, and we help couples weave them into their celebration in a way that feels authentic rather than staged. This can include a royal baraat with decorated horses, camels or vintage cars, traditional welcome with tilak, aarti and floral showers, folk performances such as Ghoomar and Kalbelia, a mehndi function with Rajasthani motifs, a haldi in marigold-filled courtyards, a Mewari banquet with live counters, and a poolside or lakeside cocktail evening. If you prefer a contemporary celebration, we also design clean, modern concepts while keeping the rituals that matter to your family.',
    links: [{ text: 'Rajasthani wedding traditions', href: '/blog/' }],
  },

  { type: 'h2', text: 'Corporate Events and Celebrations in Udaipur' },
  {
    type: 'p',
    text: 'Besides weddings, Rasm Weddings & Events also manages corporate events in Udaipur, including conferences, incentive trips, product launches, annual meets and gala dinners in the same palaces and resorts that make weddings special. The same planning discipline of venue, decor, hospitality and on-ground execution applies, with a focus on timelines and guest experience.',
    links: [{ text: 'corporate events in Udaipur', href: '/corporate-events/' }],
  },

  { type: 'h2', text: 'How to Choose the Right Wedding Planner in Udaipur' },
  {
    type: 'p',
    text: 'Before you hire any wedding planner, ask for a clear scope of work, a written estimate, examples of previous events in the same venue category and the names of the people who will actually be on-site. Look for a team that has a local office, long-standing vendor relationships and the ability to handle decor, hospitality, entertainment and logistics under one roof, because coordination between many separate vendors is where most wedding stress begins. At Rasm, you meet the planning team up front, receive a transparent proposal and have one point of contact from the first call until the last guest departs.',
  },

  { type: 'h2', text: 'Frequently Asked Questions About Wedding Planning in Udaipur' },
  { type: 'h3', text: 'Who is the best wedding planner in Udaipur?' },
  {
    type: 'p',
    text: 'The best planner is the one who fits your style, budget and guest profile. Rasm Weddings & Events is a luxury destination wedding planner in Udaipur with more than ten years of experience, over 500 events managed and an in-house team for venue selection, decor, hospitality, entertainment and on-ground execution. We encourage you to speak to us and compare before deciding.',
  },
  { type: 'h3', text: 'How early should I book a wedding in Udaipur?' },
  {
    type: 'p',
    text: 'For palace and lake venues in peak months, book 10 to 12 months ahead. For resorts and hotels, 6 to 8 months is usually enough. Contact us as soon as you have approximate dates so we can check availability.',
  },
  { type: 'h3', text: 'Can you plan a wedding if we live abroad?' },
  {
    type: 'p',
    text: 'Yes. A large share of our weddings are planned with couples overseas through video calls, shared proposals and photo and video updates, with our Udaipur team representing you on the ground.',
  },
  { type: 'h3', text: 'Do you only plan weddings in Udaipur?' },
  {
    type: 'p',
    text: 'No. Udaipur is our base, but we also plan weddings in Jaipur, Jodhpur, Jaisalmer, Kumbhalgarh, Mount Abu, Nathdwara, Pushkar, Ranakpur, Goa, Thailand and other destinations.',
  },
  { type: 'h3', text: 'Can I choose individual services instead of full planning?' },
  {
    type: 'p',
    text: 'Yes. You can take complete planning or select specific services such as venue booking, decor, catering coordination, entertainment or on-ground management.',
  },
  { type: 'h3', text: 'What is the starting budget for a destination wedding with Rasm?' },
  {
    type: 'p',
    text: 'Our packages start from Rs 30 Lacs and can go up to Rs 1 Crore or more depending on scale and customisation. Share your guest count and preferred dates and we will prepare an estimate.',
  },

  { type: 'h2', text: 'Start Planning Your Wedding in Udaipur Today' },
  {
    type: 'p',
    text: 'Your wedding should feel like you, in a place that takes everyone\'s breath away. Whether you are imagining a lake palace wedding, a heritage fort celebration, a garden ceremony in the hills or a multi-city destination wedding, Rasm Weddings & Events can turn the idea into a plan you can trust. Use the form above to request a free consultation, message us on WhatsApp or visit our Udaipur office, and let us begin your royal story together.',
    links: [{ text: 'request a free consultation', href: '/contact-us/' }],
  },
];
