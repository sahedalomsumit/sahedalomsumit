$files = Get-ChildItem -Path public -Recurse -File
foreach ($f in $files) {
    $on = $f.Name
    $nn = $on.ToLower() -replace '\s+', '-' -replace '&', 'and' -replace '[()]', '' -replace '-+', '-'
    if ($on -ne $nn) {
        Rename-Item -Path $f.FullName -NewName $nn -Force
        Write-Output "$on -> $nn"
    }
}
