import fs from "fs";
import path from "path";

const serverDir = path.resolve(__meteor_bootstrap__.serverDir);
const assetBundlePath = path.join(serverDir, "assets", "app");
const configPath = path.join(assetBundlePath, "config");

function locateFiles(p, recursive = true, match = /.+/, files = [])
{
    let isDirectory = false;
    let list = null;

    try
    {
        isDirectory = fs.statSync(p).isDirectory();
    }
    catch (error)
    {
        throw new Meteor.Error("Unable to list files in directory. Directory doesn't exist.");
    }

    if (isDirectory)
    {
        list = fs.readdirSync(p);
        let entry = "";

        for (let i in list)
        {
            entry = path.join(p, list[i]);
            if (fs.statSync(entry).isDirectory())
            {
                if (recursive) locateFiles(entry, recursive, match, files);
            }
            else
            {
                if (entry && entry.match(match))
                    files.push(entry);
            }
        }
    }

    return files;

};

function loadConfigFiles(filenames, config = {})
{
    let content = null, result = null;

    _.each(filenames, function(filename)
    {
        content = loadConfigFile(filename);

        if (content !== false)
        {
            result = parseConfig(content, filename);
            _.deepExtend(config, result, true);
        }
    });
};

function loadConfigFile(filename)
{
    let res = null;

    try
    {
        res = fs.readFileSync(filename);
        if (!res)
            throw new Meteor.Error("File " + assetPath(filename) + " does not exist!");

        return res;
    }
    catch (e)
    {
        throw new Meteor.Error('The content of file ' + assetPath(filename) + ' is not valid!' );
    }
};

function parseConfig(content, filename)
{
    try
    {
        return YAML.safeLoad(content);
    }
    catch (error)
    {
        throw new Meteor.Error('The content of file ' + assetPath(filename) + ' is not valid!' );
    }
};

function assetPath(p)
{
    return p.replace(assetBundlePath, "").substring(1);
}

export class Settings
{
    static autoconfig()
    {
        var config = {};

        loadConfigFiles(locateFiles(configPath, false, new RegExp("(auto)\.(json|yml|yaml)$")), config);
        loadConfigFiles(locateFiles(path.join(configPath, process.env.NODE_ENV), false, new RegExp("(auto)\.(json|yml|yaml)$")), config);

        _.deepExtend(Meteor.settings.public, config.public, true);
        
        Meteor.settings.private = Meteor.settings.private ? _.deepExtend(Meteor.settings.private, config.private, true) : config.private;
    }

    static getPublicConfig()
    {
        var config = {};

        loadConfigFiles(locateFiles(path.join(configPath, process.env.NODE_ENV), false, new RegExp("(public)\.(json|yml|yaml)$")), config);

        _.deepExtend(Meteor.settings.public, config, true);
    }

    static getPrivateConfig()
    {
        var config = {};

        loadConfigFiles(locateFiles(path.join(configPath, process.env.NODE_ENV), false, new RegExp("(private)\.(json|yml|yaml)$")), config);

        Meteor.settings.private = Meteor.settings.private ? _.deepExtend(Meteor.settings.private, config, true) : config;
    }

    static getFullConfig()
    {
        Settings.getPublicConfig();
        Settings.getPrivateConfig();
    }
};

Meteor.startup(function ()
{
    Settings.autoconfig();
});
