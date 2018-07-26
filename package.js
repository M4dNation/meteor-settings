Package.describe(
{
    name: "m4dnation:meteor-settings",
  
    version: "0.0.1",
  
    summary: "Autoloading for Meteor settings file.",
  
    git: "https://github.com/M4dNation/meteor-settings",
});
  
Package.onUse(function(api)
{
    api.versionsFrom("1.7.0.3");
  
    api.use(["ecmascript", "underscore", "meteorblackbelt:underscore-deep@0.0.3", "udondan:yml@3.2.2_1"], "server");
  
    api.mainModule("src/meteor-settings.js", "server");
});
  
Package.onTest(function(api)
{
    api.versionsFrom("1.7.0.3");
  
    api.use(["ecmascript", "practicalmeteor:mocha"]);
  
    api.use("m4dnation:meteor-settings");
  
    api.mainModule("tests/meteor-settings-tests.js");
});
  