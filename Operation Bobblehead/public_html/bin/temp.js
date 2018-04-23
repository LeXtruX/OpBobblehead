/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fps = 30;
var interval = (1/fps)*1000;

function play()
{
    var animation = $('#animation').children();
    console.log(animation);
    var i = 0;
    setInterval(function()
    {
        if (i > 0)
        {
            $(animation[i-1]).hide();
        }
        else if (i == 0)
        {
            {
            $(animation[animation.length-1]).hide();
        }
        }
        $(animation[i]).show();
        i++;
        if (i == animation.length)
        {
            i = 0;
        }
    },interval);
}
