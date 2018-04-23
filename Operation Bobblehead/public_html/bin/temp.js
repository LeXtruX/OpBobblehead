/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fps = 30;
var interval = (1/fps)*1000;
var animations = new Array();
function play()
{
    animations = $('#player').children();
    console.log(animations);
    var i = 0;
    setInterval(function()
    {
        if (i > 0)
        {
            $(animations[i-1]).remove();
        }
        $(animations[i]).show();
        i++;
        if (i == animations.length)
        {
            i = 0;
        }
    },interval);
}

function createJSON()
{
    var animation = $('#animation').children();
    var o = new Array();
    for (i = 0; i < animation.length; i++)
    {
        o.push($(animation[i]).attr('src'));
    }
    console.log(JSON.stringify(o));
}

function loadAnimation()
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
}
function add(string)
{
    console.log(animations);
    var kids = $('#'+string).children().clone();
    console.log('kids:');
    console.log(kids);
    $(kids).appendTo("#player");    
    animations = $.merge(animations, kids);
    console.log(animations);
}
var player = new Player("#player",30);
loadAnimation();
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