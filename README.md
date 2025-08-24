# colormap

Create your own maps by selecting features (counties, states, etc) to color them in according to your own legend. Whether you're looking to graph political data or just visualize all those places you've roadtripped, you can get started in seconds. 100% free and open-source, no signups, no ads, no tracking, just a simple tool that runs right in your browser.

Check it out at [colormap.app](https://colormap.app)

**Pre-Release Disclaimer:** This app is currently under active development and changing rapidly. Things may break or suddenly be different than before. Additionally, there will be many more features to come.

## The Basics

There are really only a few parts:
 - **Map:** pretty much the entire map entity, it is used on many pages
 - **Interactive Layer:** the layer you will be opening, such as US Counties. Each has its own page, Legend, and lives within a Map on the page and has many Features. 
 - **Feature:** one of the interactive elements within the Interactive Layer, such as a specific County or State. Clicking can interact with these based on the Legend Item selected. 
 - **Settings:** the global configuration for how Maps and Interactive Layers should look. 
 - **Legend:** the index for all the Legend Items you've added to that Interactive Layer. 
 - **Legend Item:** an entry in the Legend, you can add/remove as needed. Has a color and a name that you can set. When selected, any Features you click be colored based on the selected Legend Item. 

### Finding a Map/Interactive Layer

To get started you will want to open of our Interactive Layers, each has its own dedicated URL/page. Currently we have US Counties and US States, but are working to add more in the future! You can find these linked on (our homepage)[https://colormap.app], or under Maps in the navigation bar. We've also direct linked them below, to make things easy. 

[US Counties](https://colormap.app/map/us_counties)

[US States](https://colormap.app/map/us_states)

### Interacting with a map

Once you've opened the layer you'd like to play with (e.g. US Counties), you should see a standard map background similar to Google Maps (provided by (OpenStreetMaps)[https://www.openstreetmap.org/]). On top of that you should see the Interactive Layer, which has many features, outlining States, Counties, etc.

You should see a Legend in the Control Panel with a default red "Visited" Legend Item. Click the text or color to edit as needed, or add/remove more Legend Items as needed. 

Once you've created a few Legend Items, e.g. Republicans, Democrats or Visited, Lived in, Drove through, click one to select it. Then click any Feature on the map (e.g. specific State or County) and watch its color change to match your selected Legend Item! 

Deleting a Legend Item will deselect all of the Features associated with it. The Clear button will reset all Legend Items and Features. Changing a Legend Item color will update the color for all associated Features. Legends are Layer/Map specific and will not be shared across other maps or layers.

### Settings

Maybe after selecting a few counties from your recent roadtrip you'd dediced you'd like to change the look a little bit. You can click the Settings button, just above the Legend in the Control Panel. Click it to open the Settings Menu.

Once opened you will see there are many settings you can customize. And more to come! Such as changing the map background, the opacity of the selected features, the borders, etc. Click save and they should take effect immediately. These settings are global and will still be there if you go to another layer. 

### Saving

There is currently no way to guarantee a save, but this is coming! The app has no backend, no database, no server, so it only stores your data right in your browser. As a result, if your browser loses this data, maybe after a major update or your Clearing your Browser Cache and cookies, you will lose any progress. 

Everything is stored in localStorage so if you know how, you are able to copy the data from there and manually update it were anything to happen. 

## Open Source and Self Hosting

The entire app is 100% free and open source under a GPL license. Basically, you can share and modify it however you like, so long you don't charge money for it. If you wanted to host this in your own way somewhere, like your website, I encourage it. Or if you just want to run it locally and not even need the internet, that is cool too. 

If you have any ideas for ways to improve or use the project, feel free to open an Issue in Github! Of course you can always fork and do it yourself, but official support is best where possible. 