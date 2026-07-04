param(
  [int]$Port = 8080
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
$listener.Start()
Write-Host "Journey to the West is running at http://127.0.0.1:$Port"
Write-Host "Press Ctrl+C to stop."

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()

      do {
        $headerLine = $reader.ReadLine()
      } while ($null -ne $headerLine -and $headerLine.Length -gt 0)

      $target = "/"
      if ($requestLine) {
        $parts = $requestLine.Split(" ")
        if ($parts.Length -gt 1) {
          $target = $parts[1]
        }
      }

      $relative = [System.Uri]::UnescapeDataString($target.Split("?")[0].TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($relative)) {
        $relative = "index.html"
      }

      $file = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $relative))
      $status = "200 OK"
      $contentType = "application/octet-stream"

      if (-not $file.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
        $status = "403 Forbidden"
        $body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        $contentType = "text/plain; charset=utf-8"
      } elseif (Test-Path -LiteralPath $file -PathType Leaf) {
        $body = [System.IO.File]::ReadAllBytes($file)
        switch ([System.IO.Path]::GetExtension($file).ToLowerInvariant()) {
          ".html" { $contentType = "text/html; charset=utf-8" }
          ".css" { $contentType = "text/css; charset=utf-8" }
          ".js" { $contentType = "application/javascript; charset=utf-8" }
          ".svg" { $contentType = "image/svg+xml" }
          ".webmanifest" { $contentType = "application/manifest+json" }
          default { $contentType = "application/octet-stream" }
        }
      } else {
        $status = "404 Not Found"
        $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
        $contentType = "text/plain; charset=utf-8"
      }

      $header = "HTTP/1.1 $status`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
