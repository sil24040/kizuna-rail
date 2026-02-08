import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
  const regions = await getListOfRegions();
  const seasons = await getListOfSeasons();

  // Normalize query params:
  // - missing OR "all" => no filter
  const rawRegion = req.query.region;
  const rawSeason = req.query.season;

  const region = rawRegion && rawRegion !== 'all' ? rawRegion : '';
  const season = rawSeason && rawSeason !== 'all' ? rawSeason : '';

  let routes = await getAllRoutes();

  // Filter by region (only if user selected a real one)
  if (region) {
    routes = routes.filter((r) => r.region === region);
  }

  // Filter by season (your view uses route.bestSeason)
  if (season) {
    routes = routes.filter((r) => r.bestSeason === season);
  }

  res.render('routes/list', {
    title: 'Scenic Train Routes',
    regions,
    seasons,
    routes,
    // Your EJS expects `query.region` and `query.season`
    query: {
      region: region || 'all',
      season: season || 'all',
    },
  });
};

