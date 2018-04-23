/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fps = 30;
var interval = (1/fps)*1000;
var animations = new Array();

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