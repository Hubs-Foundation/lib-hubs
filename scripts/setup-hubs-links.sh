echo "OK! Attempting to set up links to lib-hubs in hubs for you..."
echo ""
echo "Before running this script, install dependencies the usual way:"
echo "    in hubs:        npm ci"
echo "    in lib-hubs:    lerna bootstrap"
echo "And open this script in a text editor to change dir_hubs and dir_lib_hubs to the correct paths for your system."
echo ""

dir_hubs=""
dir_lib_hubs=""
#dir_hubs="/home/jomb/src/hubs"
#dir_lib_hubs="/home/jomb/src/lib-hubs"

if [ -z "$dir_hubs" ]; then
   echo "Error: You must edit this script and set dir_hubs to the directory where hubs is installed.";
   exit 0;
elif [ -z "$dir_lib_hubs" ]; then
   echo "Error: You must edit this script and set dir_lib_hubs to the directory where lib-hubs is installed.";
   exit 0;
fi


echo "Removing lib-hubs from hubs/node_modules."
# Remove symbolic links first, so we don't accidentally blow away linked files
rm "${dir_hubs}/node_modules/lib-hubs"
# If it isn't a sym link, we DO actually want to remove the files in this directory
rm -rf "${dir_hubs}/node_modules/lib-hubs"

echo "Removing three from lib-hubs/node_modules."
# Remove symbolic links first, so we don't accidentally blow away linked files
rm "${dir_lib_hubs}/node_modules/three"
# If it isn't a sym link, we DO actually want to remove the files in this directory
rm -rf "${dir_lib_hubs}/node_modules/three"

echo "Linking hubs/node_modules/three into lib-hubs/node_modules."
ln -s "${dir_hubs}/node_modules/three" "${dir_lib_hubs}/node_modules/"

echo "Linking lib-hubs into hubs/node_modules."
ln -s "${dir_lib_hubs}" "${dir_hubs}/node_modules/"

echo ""
echo "Done. Here are all your linked modules:"
ls -la $(find "${dir_hubs}/node_modules/" "${dir_lib_hubs}/node_modules" -maxdepth 1 -type l)

echo ""
echo "Now if you run \"yarn watch\" in lib-hubs, hubs should recompile on changes too."
