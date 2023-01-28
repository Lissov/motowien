#to run - from parent folder execute: templates\refresh_templates.ps1

param($mode = 'fill')

$templateStart = "<!--injecttemplate";
$templateEnd = "<!--end_injecttemplate";

$files = (Get-Childitem "*.html" | % { $_.Name }) `
    + (Get-Childitem "day\*.html" | % { "day\" + $_.Name })
foreach ($file in $files) {
    $file
    $content = [System.IO.File]::ReadAllText($file);
    $start = 0;

    $deep = $file.split("\").Length - 1
    $prefix = "";
    for ($j = 1; $j -le $deep; $j++) {
        $prefix = $prefix + "..\";
    }
    $file + ": Hrefs will be replaced only in templates: " + $prefix
    
    while ($content.IndexOf($templateStart, $start) -ge 0) {
        $start = $content.IndexOf($templateStart, $start) + $templateStart.Length + 1;
        $l = $content.IndexOf("-->", $start) - $start;
        $templateName = $content.substring($start, $l)
        $replaceStart = $start + $l + 3;
        $end = $content.IndexOf($templateEnd + " " + $templateName, $start);

        $toReplace = $content.substring($replaceStart, $end - $replaceStart);
        if ($mode -eq 'clear') {
            $template = ""
            $file + ": Clearing template: " + $templateName
        } else {
            $template = [System.IO.File]::ReadAllText(".\templates\" + $templateName)
            $template = $template.replace("href=""", "href=""" + $prefix);
            $file + ": Injecting template: " + $templateName
        }
        $content = $content.substring(0, $replaceStart) + $template + $content.substring($end);

        [System.IO.File]::WriteAllText($file, $content)
    }
}
