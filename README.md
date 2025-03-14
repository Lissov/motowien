# motowien
Website about motorcycle tours around Vienna

# deployment
To deploy commit to `main`.

# new approach with `handlebars`
All sources are in `build`.
## To build
`cd source\build`
`npm install`

`node build.js`

## Test:
Open `C:/my/dev/motowien/index.html` in browser (just open `index.html` from explorer)

# structure
/source             <- source html for sitemplate
    /trip               <- multi-day and outside Vienna // now all
/images             <- website styling images
/images/routes/xxx  <- images for specific routes
/gps                <- GPX files with gps tracks
