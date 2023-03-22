# motowien
Website about motorcycle tours around Vienna

# deployment
To deploy commit to master.

# new approach with sitemplate
See `sitemplate` documentation for details
## to clean:
run source/clean.bat
## to build (clean and build)
run source/build.bat


# legacy approach with Powershell templates
HTML pages are made with custom templates. Before deployment, refresh templates by running from root folder:
`templates\refresh_templates.ps1`

You can clear templates to see page cleaner:
`templates\refresh_templates.ps1 clear`

# structure
/templates          <- all templates are here
/images             <- website styling images
/images/routes/xxx  <- images for specific routes
/day                <- day-long routes from Vienna  // removed for now, let all be trips
/trip               <- multi-day and outside Vienna // now all
/gps                <- GPX files with gps tracks
