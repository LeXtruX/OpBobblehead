var EventList = (function()
{
    var instance;
    var idles = IdleList.getInstance();
    var mod = 0;
    var players = [];
    players.push("#player1");
    players.push("#player2");
    function createInstance()
    {
        var object = list();
        return object;
    }
    
    function list()
    {
        
        var queue = [];
        var i = 0;
        function next()
        {
            
             console.log(players[mod]);
            if (queue.length > 0)
            {
                if (i == 1)
                {
                    i = 0;
                }
                    queue[i].play(players[mod]);
                    queue.shift();
                    i++;
            }
            else
            {
                console.log(players[mod]);
                idles.next(players[mod]);
            }
            mod++;
            mod = mod%2;
        }
        
        function loadNext()
        {
            if (queue.length > 0)
            {
                queue[0].preLoad(players[mod]);
            }
            else
            {
                idles.loadNext(players[mod]);
            }
        }

        function add(item)
        {
            console.log(queue);
            queue.push(item);
        }

        return {
            next: next,
            loadNext: loadNext,
            add: add
        };
    }
    
    return {
        getInstance: function()
        {
            if(!instance)
            {
                instance = createInstance();
            }
            return instance;
        }
    };
})();



