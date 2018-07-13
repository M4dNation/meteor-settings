// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-settings.js.
import { name as packageName } from "meteor/meteor-settings";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-settings - example', function (test) {
  test.equal(packageName, "meteor-settings");
});
