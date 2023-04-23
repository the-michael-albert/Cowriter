if [ $# -eq 0 ]; then
  echo "Please provide a parameter as a string"
  exit 1
fi

dir_name="$1"

mkdir "$dir_name"
cd "$dir_name"

touch "${dir_name}_elems.js" "${dir_name}_listen.js" "${dir_name}_render.js" "${dir_name}_style.css" "${dir_name}.html"

echo "Files created successfully!"
