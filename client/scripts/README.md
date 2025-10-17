# repro_login.ps1

This PowerShell script posts a login payload to the production login endpoint and saves the response to a file for debugging.

Usage (PowerShell on Windows):

```powershell
# from the client/scripts folder
.\repro_login.ps1 -mobileno 9558636610 -email "aryanmendapara20@gmail.com" -password "aryan@2302" -out "resp.json"
```

The script will print status and response body and save it to the `-out` file (default `login_response.json`).

Notes:
- Use this to reproduce the 500 and capture the server response body for inspection and sharing with the backend owner.
- Be careful with credentials in plain files; delete `resp.json` after use if it contains sensitive info.
