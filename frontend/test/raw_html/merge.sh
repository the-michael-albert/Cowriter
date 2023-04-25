#!/bin/bash

# Parse command line arguments
while getopts "d:f:" opt; do
  case $opt in
    d) dir="$OPTARG";;
    f) html_file="$OPTARG";;
    \?) echo "Invalid option -$OPTARG" >&2
        exit 1;;
    :) echo "Option -$OPTARG requires an argument." >&2
       exit 1;;
  esac
done

# Load the HTML file
html_path="$dir/$html_file"
html=$(cat "$html_path")

# Parse the HTML file with sed
css_links=$(echo "$html" | sed -En 's/.*<link.*href="([^"]+)".*rel="stylesheet".*/\1/p')
js_links=$(echo "$html" | sed -En 's/.*<script.*src="([^"]+)".*<\/script>.*/\1/p')

# Download the linked files
for link in $css_links $js_links
do
    file_path="$dir/$(basename $link)"
    curl "$link" -o "$file_path"
done

# Replace the original links with the downloaded files
for link in $css_links $js_links
do
    file_name=$(basename "$link")
    new_link="./$file_name"
    html=$(echo "$html" | sed "s|$link|$new_link|g")
done

# Save the merged HTML file
merged_file_path="$dir/merged.html"
echo "$html" > "$merged_file_path"

# Download the merged HTML file
curl "file://$merged_file_path" -o "downloaded.html"
