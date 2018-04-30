/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fps = 30;
var interval = (1/fps)*1000;
var animations = new Array();

/*function loadAnimation()
{
    $.getJSON('testanimation.json', function(data)
    {
        console.log(data);
        var animation = $('<div id="'+data.name+'"></div>');
        var files = data.files;
        for (i = 0; i < files.length; i++)
        {
            var img = $('<img src="'+files[i]+'" alt=""/>')
            $(img).hide();
            $(animation).append($(img));
        }
        $('#animations').append(animation);
    });
    
    $.getJSON('testanimation2.json', function(data)
    {
        console.log(data);
        var animation = $('<div id="'+data.name+'"></div>');
        var files = data.files;
        for (i = 0; i < files.length; i++)
        {
            var img = $('<img src="'+files[i]+'" alt=""/>')
            $(img).hide();
            $(animation).append($(img));
        }
        $('#animations').append(animation);
    });
}*/

var player = new Player("#player",30);
//loadAnimation();

function addAnim(string)
{
    var kids = $('#'+string).children().clone();
    player.add(kids);
}
function addIdle(string)
{
    var kids = $('#'+string).children().clone();
    player.addIdle(kids);
}

function loadCompanion(name)
{
    var deferred = $.Deferred();
    var companion;
    var loaders = [];
    
    player.hide();
    
    $.getJSON("./"+name+"/companion.json", function(data)
    {
        companion = data;
        deferred.resolve();
    });
    
    $.when(deferred).then(function()
    {
        console.log(companion);
        loaders.push(loadIdles(companion.Idles));
        loaders.push(loadInteractions(companion.Interactions));
        
        $.when.apply(null, loaders).done(function() 
        {
            player.hide();
            player.play();
            setTimeout(function()
            {
                player.show();
            }, 5000);
        });
    });
}

function loadIdles(obj)
{
    var loaders = [];
    var url;
    var deferred = $.Deferred();
    
    //Create element in #Animations
    $("#Animations").append('<div id="Idles"></div>');
    var element = "#Idles";
    
    loaders = loadInteraction(obj, 0, loaders, element);
    $.when.apply(null, loaders).done(function() 
    {
        var kids = $(element).children();
        for (i = 0; i < kids.length; i++)
        {
            var child = $(kids[i]).children().clone();
            console.log(child);
            for (j = 0; j < child.length; j++);
            {
                $(child[i]).hide();
            }
            
            console.log(child);
            player.addIdle(child);
        }
        //player.addIdle(kids);
        deferred.resolve();
    });
}

function loadInteractions(obj)
{
    var loaders = [];
    var url;
    var deferred = $.Deferred();
    
    //Create element in #Animations
    $("#Animations").append('<div id="Interactions"></div>');
    var element = "#Interactions";
    
    loaders = loadInteraction(obj, 0, loaders, element);
    $.when.apply(null, loaders).done(function() 
    {
        deferred.resolve();
    });
}

function loadInteraction(obj, i, loaders, element)
{
    if (i < obj.Animations.length)
    {
        animation = obj.Animations[i];
        url = obj.Folder+"/"+obj.Animations[i].Name+"/";
        loaders.push(loadAnimation(animation, url, element));
        loaders = loadInteraction(obj, i+1, loaders, element);
    }
    else
    {
        return loaders;
    }
}

function loadAnimation(animation, folder, parent)
{
    var loaders = [];
    var deferred = $.Deferred();
    //Create Element in parent
    $(parent).append('<div id="'+animation.Name+'"></div>');
    for (i = 0; i < animation.Frames.length; i++)
    {
        loaders.push(loadFrame(folder+animation.Frames[i],'#'+animation.Name));
    }
    $.when.apply(null, loaders).done(function(data) 
    {
        deferred.resolve();
    });
    return deferred.promise();
}
function loadFrame(url, parent)
{
    var deferred = $.Deferred();
    var img = new Image();
    img.onload = function()
    {
        deferred.resolve();
        $(img).hide();
    };
    img.src = url;
    $(parent).append(img);
    return deferred.promise();
}