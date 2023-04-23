#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Please provide a parameter as a string"
  exit 1
fi

dir_name="$1"

cat > "${dir_name}.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
    <link href='${dir_name}_style.css' rel='stylesheet'>
    <style>
    body {
        font-family: OpenSans, Arial, Helvetica, sans-serif;
    }
    </style>
    <title>${dir_name^}</title>
</head>
<body>
    <div id="container">
    </div>
    <script src="${dir_name}_elems.js"></script>
    <script src="${dir_name}_render.js"></script>
    <script src="${dir_name}_listen.js"></script>
</body>
</html>
EOF

echo "HTML file created successfully!"
