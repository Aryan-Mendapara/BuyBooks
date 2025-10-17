<#
PowerShell script to POST login payload and save response for debugging.
Usage:
  # provide args
  .\repro_login.ps1 -mobileno 9558636610 -email "you@example.com" -password "secret"

  # or rely on defaults in the script (change them)
#>
param(
    [string]$mobileno = "9558636610",
    [string]$email = "you@example.com",
    [string]$password = "password123",
    [string]$url = "https://buybooks-server.onrender.com/books/login/loginuser",
    [string]$out = "login_response.json"
)

$body = @{ mobileno = $mobileno; email = $email; password = $password } | ConvertTo-Json
Write-Host "Posting to: $url"
Write-Host "Payload:`n$body"

try {
    $response = Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType 'application/json' -ErrorAction Stop
    Write-Host "Status: $($response.StatusCode)"
    $content = $response.Content
    Write-Host "Response body:`n$content"
    $content | Out-File -FilePath $out -Encoding utf8
    Write-Host "Saved response to $out"
} catch {
    Write-Host "Request failed"
    if ($_.Exception.Response) {
        $status = $_.Exception.Response.StatusCode.Value__
        $reader = New-Object System.IO.StreamReader ($_.Exception.Response.GetResponseStream());
        $content = $reader.ReadToEnd();
        Write-Host "Status: $status"
        Write-Host "Body:`n$content"
        $obj = @{ status = $status; body = $content; timestamp = (Get-Date).ToString('o') }
        $obj | ConvertTo-Json | Out-File -FilePath $out -Encoding utf8
        Write-Host "Saved error response to $out"
    } else {
        Write-Host $_.Exception.Message
        $obj = @{ error = $_.Exception.Message; timestamp = (Get-Date).ToString('o') }
        $obj | ConvertTo-Json | Out-File -FilePath $out -Encoding utf8
        Write-Host "Saved error info to $out"
    }
}
