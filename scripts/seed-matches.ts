/**
 * Seed script to create La Liga matches for Sevilla FC - Season 2025-26
 *
 * Usage:
 * 1. Add CONTENTFUL_MANAGEMENT_TOKEN to your .env.local
 * 2. Run: npx ts-node scripts/seed-matches.ts
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID! as string;
const ENVIRONMENT_ID = 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN! as string;

const client = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

const SEASON_SLUG = 'la-liga-2025-26';

// Sevilla FC matches for La Liga 2025-26
const matches = [
  // Played matches (with scores)
  {
    date: '2025-08-17T18:30:00',
    homeTeam: 'athletic-club',
    awayTeam: 'sevilla-fc',
    homeScore: 3,
    awayScore: 2,
    homeScorers: ['Nico Williams (pen)', 'Sannadi'],
    awayScorers: ['Dodi Lukébakio', 'Lucien Agoumé'],
    location: 'San Mamés, Bilbao',
  },
  {
    date: '2025-08-25T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'getafe-cf',
    homeScore: 1,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-08-30T18:30:00',
    homeTeam: 'girona-fc',
    awayTeam: 'sevilla-fc',
    homeScore: 0,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Estadi Montilivi, Girona',
  },
  {
    date: '2025-09-12T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'elche-cf',
    homeScore: 2,
    awayScore: 2,
    homeScorers: ['Isaac Romero', 'Peque Fernández'],
    awayScorers: ['André Silva', 'Rafa Mir'],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-09-20T16:15:00',
    homeTeam: 'deportivo-alaves',
    awayTeam: 'sevilla-fc',
    homeScore: 1,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Mendizorrotza, Vitoria-Gasteiz',
  },
  {
    date: '2025-09-23T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'villarreal-cf',
    homeScore: 1,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-09-28T14:00:00',
    homeTeam: 'rayo-vallecano',
    awayTeam: 'sevilla-fc',
    homeScore: 0,
    awayScore: 1,
    homeScorers: [],
    awayScorers: [],
    location: 'Estadio de Vallecas, Madrid',
  },
  {
    date: '2025-10-05T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'fc-barcelona',
    homeScore: 4,
    awayScore: 1,
    homeScorers: ['Alexis Sánchez (pen)', 'Isaac Romero', 'José Ángel Carmona', 'Akor Adams'],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-10-18T18:30:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'rcd-mallorca',
    homeScore: 1,
    awayScore: 3,
    homeScorers: [],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-10-24T21:00:00',
    homeTeam: 'real-sociedad',
    awayTeam: 'sevilla-fc',
    homeScore: 2,
    awayScore: 1,
    homeScorers: [],
    awayScorers: [],
    location: 'Reale Arena, San Sebastián',
  },
  {
    date: '2025-11-01T16:15:00',
    homeTeam: 'atletico-madrid',
    awayTeam: 'sevilla-fc',
    homeScore: 3,
    awayScore: 0,
    homeScorers: ['Julián Álvarez (pen)', 'Thiago Almada', 'Antoine Griezmann'],
    awayScorers: [],
    location: 'Cívitas Metropolitano, Madrid',
  },
  {
    date: '2025-11-08T18:30:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'ca-osasuna',
    homeScore: 0,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-11-24T14:00:00',
    homeTeam: 'rcd-espanyol',
    awayTeam: 'sevilla-fc',
    homeScore: 2,
    awayScore: 1,
    homeScorers: [],
    awayScorers: [],
    location: 'RCDE Stadium, Barcelona',
  },
  {
    date: '2025-11-30T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'real-betis',
    homeScore: 0,
    awayScore: 2,
    homeScorers: [],
    awayScorers: [],
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2025-12-20T21:00:00',
    homeTeam: 'real-madrid',
    awayTeam: 'sevilla-fc',
    homeScore: 2,
    awayScore: 0,
    homeScorers: [],
    awayScorers: [],
    location: 'Santiago Bernabéu, Madrid',
  },

  // Upcoming matches (no scores)
  {
    date: '2026-01-05T18:30:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'valencia-cf',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-01-12T16:15:00',
    homeTeam: 'rc-celta',
    awayTeam: 'sevilla-fc',
    location: 'Abanca-Balaídos, Vigo',
  },
  {
    date: '2026-01-19T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'ud-las-palmas',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-01-26T18:30:00',
    homeTeam: 'real-valladolid-cf',
    awayTeam: 'sevilla-fc',
    location: 'José Zorrilla, Valladolid',
  },
  {
    date: '2026-02-02T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'cd-leganes',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },

  // Second half of season (reverse fixtures)
  {
    date: '2026-02-09T18:30:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'athletic-club',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-02-16T16:15:00',
    homeTeam: 'getafe-cf',
    awayTeam: 'sevilla-fc',
    location: 'Coliseum Alfonso Pérez, Getafe',
  },
  {
    date: '2026-02-23T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'girona-fc',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-03-02T18:30:00',
    homeTeam: 'elche-cf',
    awayTeam: 'sevilla-fc',
    location: 'Estadio Martínez Valero, Elche',
  },
  {
    date: '2026-03-09T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'deportivo-alaves',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-03-16T16:15:00',
    homeTeam: 'villarreal-cf',
    awayTeam: 'sevilla-fc',
    location: 'Estadio de la Cerámica, Villarreal',
  },
  {
    date: '2026-03-30T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'rayo-vallecano',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-04-06T18:30:00',
    homeTeam: 'fc-barcelona',
    awayTeam: 'sevilla-fc',
    location: 'Spotify Camp Nou, Barcelona',
  },
  {
    date: '2026-04-13T21:00:00',
    homeTeam: 'rcd-mallorca',
    awayTeam: 'sevilla-fc',
    location: 'Estadi Mallorca Son Moix, Palma',
  },
  {
    date: '2026-04-20T16:15:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'real-sociedad',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-04-27T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'atletico-madrid',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-05-04T18:30:00',
    homeTeam: 'ca-osasuna',
    awayTeam: 'sevilla-fc',
    location: 'El Sadar, Pamplona',
  },
  {
    date: '2026-05-11T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'rcd-espanyol',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-05-18T18:30:00',
    homeTeam: 'real-betis',
    awayTeam: 'sevilla-fc',
    location: 'Benito Villamarín, Seville',
  },
  {
    date: '2026-05-21T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'real-madrid',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-05-25T16:15:00',
    homeTeam: 'valencia-cf',
    awayTeam: 'sevilla-fc',
    location: 'Mestalla, Valencia',
  },
  {
    date: '2026-05-28T21:00:00',
    homeTeam: 'sevilla-fc',
    awayTeam: 'rc-celta',
    location: 'Ramón Sánchez-Pizjuán, Seville',
  },
  {
    date: '2026-06-01T18:30:00',
    homeTeam: 'ud-las-palmas',
    awayTeam: 'sevilla-fc',
    location: 'Estadio Gran Canaria, Las Palmas',
  },
];

// Team name mapping for display
const teamNames: Record<string, string> = {
  'sevilla-fc': 'Sevilla FC',
  'athletic-club': 'Athletic Club',
  'getafe-cf': 'Getafe CF',
  'girona-fc': 'Girona FC',
  'elche-cf': 'Elche CF',
  'deportivo-alaves': 'Deportivo Alavés',
  'villarreal-cf': 'Villarreal CF',
  'rayo-vallecano': 'Rayo Vallecano',
  'fc-barcelona': 'FC Barcelona',
  'rcd-mallorca': 'RCD Mallorca',
  'real-sociedad': 'Real Sociedad',
  'atletico-madrid': 'Atlético Madrid',
  'ca-osasuna': 'CA Osasuna',
  'rcd-espanyol': 'RCD Espanyol',
  'real-betis': 'Real Betis',
  'real-madrid': 'Real Madrid',
  'valencia-cf': 'Valencia CF',
  'rc-celta': 'RC Celta',
  'ud-las-palmas': 'UD Las Palmas',
  'real-valladolid-cf': 'Real Valladolid CF',
  'cd-leganes': 'CD Leganés',
};

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log('Fetching existing teams...');

  // Get all teams to find their IDs
  const teamsResponse = await environment.getEntries({
    content_type: 'team',
    limit: 100,
  });

  const teamMap = new Map<string, string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamsResponse.items.forEach((team: any) => {
    const slug = team.fields.slug?.['en-US'] || team.fields.slug;
    if (slug) {
      teamMap.set(slug as string, team.sys.id);
    }
  });

  console.log(`Found ${teamMap.size} teams in Contentful:`);
  teamMap.forEach((id, slug) => console.log(`  - ${slug}: ${id}`));

  // Check if Sevilla FC exists
  const sevillaId = teamMap.get('sevilla-fc');
  if (!sevillaId) {
    console.error('\n❌ Sevilla FC not found in Contentful. Please create it first.');
    process.exit(1);
  }

  // Find season by slug
  console.log(`\nFinding season with slug: ${SEASON_SLUG}...`);
  const seasonsResponse = await environment.getEntries({
    content_type: 'season',
    'fields.slug': SEASON_SLUG,
    limit: 1,
  });

  if (seasonsResponse.items.length === 0) {
    console.error(`\n❌ Season ${SEASON_SLUG} not found. Please create it first.`);
    process.exit(1);
  }

  const seasonId = seasonsResponse.items[0].sys.id;

  console.log(`\n✅ Season found: ${seasonId}`);
  console.log(`\nCreating ${matches.length} matches...\n`);

  let created = 0;
  let skipped = 0;
  const missingTeams = new Set<string>();

  for (const match of matches) {
    const homeTeamId = teamMap.get(match.homeTeam);
    const awayTeamId = teamMap.get(match.awayTeam);

    if (!homeTeamId) missingTeams.add(match.homeTeam);
    if (!awayTeamId) missingTeams.add(match.awayTeam);

    if (!homeTeamId || !awayTeamId) {
      console.log(`⏭️  Skipping: ${teamNames[match.homeTeam]} vs ${teamNames[match.awayTeam]} (missing team)`);
      skipped++;
      continue;
    }

    const homeName = teamNames[match.homeTeam] || match.homeTeam;
    const awayName = teamNames[match.awayTeam] || match.awayTeam;
    const title = `${homeName} vs ${awayName}`;
    const dateStr = match.date.split('T')[0];
    const slug = `${match.homeTeam}-vs-${match.awayTeam}-${dateStr}`;

    // Check if match already exists
    const existingMatches = await environment.getEntries({
      content_type: 'matchEvent',
      'fields.slug': slug,
      limit: 1,
    });

    if (existingMatches.items.length > 0) {
      console.log(`⏭️  Skipping: ${title} (already exists)`);
      skipped++;
      continue;
    }

    try {
      // Build fields
      const fields: Record<string, unknown> = {
        title: { 'en-US': title },
        slug: { 'en-US': slug },
        date: { 'en-US': match.date },
        location: { 'en-US': match.location },
        competition: { 'en-US': 'La Liga' },
        teamHome: {
          'en-US': {
            sys: { type: 'Link', linkType: 'Entry', id: homeTeamId },
          },
        },
        teamAway: {
          'en-US': {
            sys: { type: 'Link', linkType: 'Entry', id: awayTeamId },
          },
        },
        season: {
          'en-US': {
            sys: { type: 'Link', linkType: 'Entry', id: seasonId },
          },
        },
      };

      // Add scores if match has been played
      if (match.homeScore !== undefined && match.awayScore !== undefined) {
        fields.homeScore = { 'en-US': match.homeScore };
        fields.awayScore = { 'en-US': match.awayScore };

        if (match.homeScorers && match.homeScorers.length > 0) {
          fields.homeScorers = { 'en-US': match.homeScorers };
        }
        if (match.awayScorers && match.awayScorers.length > 0) {
          fields.awayScorers = { 'en-US': match.awayScorers };
        }
      }

      const entry = await environment.createEntry('matchEvent', { fields });
      await entry.publish();

      const scoreStr = match.homeScore !== undefined
        ? ` (${match.homeScore}-${match.awayScore})`
        : ' (upcoming)';
      console.log(`✅ Created: ${title}${scoreStr}`);
      created++;
    } catch (error) {
      console.error(`❌ Error creating ${title}:`, error);
    }
  }

  if (missingTeams.size > 0) {
    console.log(`\n⚠️  Missing teams that need to be created in Contentful:`);
    missingTeams.forEach((slug) => console.log(`  - ${teamNames[slug] || slug} (slug: ${slug})`));
  }

  console.log(`\n✅ Done! Created: ${created}, Skipped: ${skipped}`);
}

main().catch(console.error);
