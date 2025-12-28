/**
 * Script to link all matches to the Season entry
 *
 * Run: npx ts-node scripts/link-matches-to-season.ts
 */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { createClient } = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID! as string;
const ENVIRONMENT_ID = 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN! as string;
const SEASON_SLUG = 'la-liga-2025-26';

const client = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  // Find the season
  console.log(`Finding season: ${SEASON_SLUG}...`);
  const seasonsResponse = await environment.getEntries({
    content_type: 'season',
    'fields.slug': SEASON_SLUG,
    limit: 1,
  });

  if (seasonsResponse.items.length === 0) {
    console.error(`❌ Season ${SEASON_SLUG} not found.`);
    process.exit(1);
  }

  const season = seasonsResponse.items[0];
  console.log(`✅ Found season: ${season.sys.id}`);

  // Find all matches for this season
  console.log(`\nFinding matches for season...`);
  const matchesResponse = await environment.getEntries({
    content_type: 'matchEvent',
    'fields.season.sys.id': season.sys.id,
    limit: 100,
  });

  console.log(`✅ Found ${matchesResponse.items.length} matches`);

  // Build array of match links
  const matchLinks = matchesResponse.items.map((match: any) => ({
    sys: {
      type: 'Link',
      linkType: 'Entry',
      id: match.sys.id,
    },
  }));

  console.log(`\nUpdating season with ${matchLinks.length} match references...`);

  // Check if season has a 'matches' field
  const seasonFields = season.fields;
  console.log('Season fields:', Object.keys(seasonFields));

  // Update the season with match links
  // Try common field names for matches array
  const possibleFieldNames = ['matches', 'fixtures', 'matchEvents', 'events'];
  let fieldName: string | null = null;

  for (const name of possibleFieldNames) {
    if (name in seasonFields || true) { // Try anyway
      fieldName = name;
      break;
    }
  }

  if (!fieldName) {
    console.log('\n⚠️  Could not determine the matches field name on Season.');
    console.log('Available fields:', Object.keys(seasonFields));
    console.log('\nPlease specify the field name for the matches array.');
    process.exit(1);
  }

  try {
    // Get latest version of season
    const latestSeason = await environment.getEntry(season.sys.id);

    // Update the matches field
    latestSeason.fields.matches = { 'en-US': matchLinks };

    const updatedSeason = await latestSeason.update();
    await updatedSeason.publish();

    console.log(`\n✅ Season updated with ${matchLinks.length} matches!`);
  } catch (error: any) {
    console.error('❌ Error updating season:', error.message);

    if (error.message?.includes('matches')) {
      console.log('\nThe Season content type might not have a "matches" field.');
      console.log('Please check the field name in Contentful and update the script.');
    }
  }
}

main().catch(console.error);
