function Animation(fps)
{
    var parent;
    var token;
    var frames = [];
    var interval = (1/fps)*1000;
    //var interval = 250;
    var elist = EventList.getInstance();
    
    function load(obj)
    {

        var deferred = $.Deferred();
        var loaders = [];

        for (i = 0; i < obj.Frames.length; i++)
        {
            loaders.push(function(src)
            {
                var deferred = $.Deferred();
                var img = new Image();
                img.onload = function()
                {
                    deferred.resolve();
                };
                img.src = src;
                $(img).attr("style", "display: none");
                frames.push(img);
                return deferred.promise();
            }(obj.Frames[i]));
        }


        $.when.apply(null, loaders).done(function() 
        {
            deferred.resolve();
        });

        return deferred.promise();
    }
    
    function play(parent)
    {
        
        token = new Date().getTime();
        console.log("Start: " + token);
        var i = 0;
        intervals.push(setInterval(function()
        {
            if (i < frames.length)
            {
                if (i > 0)
                {
                    $(frames[i-1]).hide();
                    $(frames[i]).show();
                    $(frames[i-1]).remove();
                }
                else
                {
                    $(parent).find(frames[i]).show();
                }
                i++;
                if (i == frames.length-2)
                {
                    elist.loadNext();
                }
                if (i == frames.length-1)
                {
                    elist.next();
                }
            }
            else
            {
                stop();
            }
        },interval));
    }
    
    function preLoad(parent)
    {
        /*if (mod == 2)
        {
            mod = 0;
            //$(parent).find('div').eq(mod).remove();
            //$(parent).find('div').eq(mod).find(frames[last]).hide();
        }*/
        $(parent).append(frames);
        
        //mod++;
        
    }
    
    function stop()
    {
        console.log("Stop: " +token)
        last = frames.length-1;
        $(frames[last]).hide();
        clearInterval(intervals[0]);
        intervals.shift();
        
        $(frames[last]).remove();
        //$(parent).find('div').eq(modifier).remove();
         //elist.next();
    }
    
    return {
        load: load,
        preLoad: preLoad,
        play: play
    };
}
