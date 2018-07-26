Package.describe(
{
    name: "m4dnation:meteor-settings",
  
    version: "1.0.1",
  
    summary: "Autoloading for Meteor settings file.",
  
    git: "https://github.com/M4dNation/meteor-settings",
});

Npm.depends(
{
    "jstoolbox": "1.0.1"
});
    
  
Package.onUse(function(api)
{
    api.versionsFrom("1.7.0.3");
  
    api.use(["ecmascript", "udondan:yml@3.2.2_1"], "server");
  
    api.mainModule("src/meteor-settings.js", "server");
});