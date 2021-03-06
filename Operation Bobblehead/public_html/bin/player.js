/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Player
{
    // Define player with elementID and FPS value
    constructor(e, fps)
    {
        this.queue = new Array();
        this.idleQueue = new Array();
        this.idleQueueNext = new Array();
        this.element = e;
        this.fps = fps;
        this.interval = (1/fps)*1000;
        this.player;
    }
    
    // Add PNG Sequence to the active queue
    add(arr)
    {
        this.queue = $.merge(this.queue, arr);
    }    
    
    // Add PNG Sequence to the idle queue
    addIdle(arr)
    {
        this.idleQueue.push(arr);
    }
    
    // Set the FPS value
    set FPS(i)
    {
        this.fps = i;
        this.interval = (1/this.fps)*1000;
    }
    
    // Play animations
    play()
    {
        // Set variables
        var i = 0;
        var id = 0;
        
        // Define player queue
        var queue = new Array();
        
        // Make class object accessible in subfunctions
        var self = this;
        
        // Timed subfunction
        this.player = setInterval(function()
        {
            // Check if we are on a next image, if so, remove the first one
            if (i > 0)
            {
               $(queue[0]).hide();
               $(queue[1]).show();               
               $(queue[0]).remove();
                queue.shift();
                i = 0;                
            }
            // Show current PNG and increase increment
            i++; 
            // Check if we still have items in the queue or if the animation has ended
            if (queue.length <= 10 || queue.length < 1)
            {
                i = 0;
                // There is an active event
                if (self.queue.length > 0)
                {
                    // Add an idle animation before the active event to prevent issues
                    if (id == 0)
                    {
                        self.idleQueueNext = self.idleQueue;
                        self.idleQueueNext = self.shuffle(self.idleQueue, self.idleQueue[self.idleQueue.length-1]);
                    }
                    else if (id == self.idleQueue.length)
                    {
                        id = 0;
                        self.idleQueue = self.idleQueueNext;
                        
                    }
                    queue = $.merge(queue, self.idleQueue[id]);
                    $(self.element).append($(self.idleQueue[id]));
                    id++;
                    // Add active event PNG Sequence to the player
                    $(self.element).append($(self.queue));
                    
                    // Add active event PNG Sequence to the queue
                    queue = $.merge(queue, self.queue);
                             
                    // Clear Active Event Queue
                    self.queue.length = 0;
                // No active events left, switch to random idle animation
                }
                else
                {        
                    if (id == 0)
                    {
                        self.idleQueueNext = self.idleQueue;
                        self.idleQueueNext = self.shuffle(self.idleQueue, self.idleQueue[self.idleQueue.length-1]);
                    }
                    else if (id == self.idleQueue.length)
                    {
                        id = 0;
                        self.idleQueue = self.idleQueueNext;
                        
                    }
                    queue = $.merge(queue, self.idleQueue[id]);
                    $(self.element).append($(self.idleQueue[id]));
                               
                    id++;
                }
            }
        },this.interval);
    }
    
    
    
    shuffle(array, last) {
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
        if (array[0] == last)
        {
            var t = array[0];
            array.shift();
            array.push(t);
        }
        
        return array;
    }

    // Stop the player
    stop()
    {
        clearInterval(this.player);
        $(this.element).children().hide();
        $(this.element).empty();
    }
    
    hide()
    {
        $(this.element).hide();
    }
    
    show()
    {
        $(this.element).show();
    }
}

