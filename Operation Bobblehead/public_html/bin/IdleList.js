var IdleList = (function()
{
   var instance;
    
    function createInstance()
    {
        var object = list();
        return object;
    }
    
    function list()
    {
        var queue = [];
        var i = 0;
        function next(player)
        {
            if (i < queue.length -1)
            {
                queue[i].play(player);
                i++;
            }
            else if (i == queue.length -1)
            {                
                queue[i].play(player);
                queue = shuffle(queue);
                i = 0;
            }
        }
        
        function loadNext(player)
        {
                queue[i].preLoad(player);
        }

        function add(item)
        {
            queue.push(item);
            queue = shuffle(queue);
        }
        
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            }

            return array;
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



