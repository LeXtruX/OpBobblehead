/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Player
{
    constructor(e, fps)
    {
        this.queue = new Array();
        this.idleQueue = new Array();
        this.element = e;
        this.fps = fps;
        this.interval = (1/fps)*1000;
        
        console.log($(this.element).html());
    }
    
    add(arr)
    {
        this.queue = $.merge(this.queue, arr);
        $(arr).appendTo($(this.element));
    }    
    
    addIdle(arr)
    {
        this.idleQueue.push(arr);
    }
    
    set FPS(i)
    {
        this.fps = i;
        this.interval = (1/fps)*1000;
    }
    
    play()
    {
        var i = 0;
        var eventQueue = this.queue;
        var idleQueue = this.idleQueue;
        var queue = new Array();
        var id = 0;
        var element = this.element;
        var self = this;
        console.log(queue);
        var interval = setInterval(function()
        {
            console.log('i: ' + i + ' | length: ' + queue.length);
           
            if (i > 0)
            {
                $(queue[i-1]).hide();
                $(queue[i-1]).remove();
                queue.shift();
                i = 0;                
            }
            $(queue[i]).show();
            i++; 
            if (i => queue.length || queue.length === 0)
            {
                if (eventQueue.length > 0)
                {
                    console.log("Event Queue:");
                    console.log(eventQueue);
                    queue = $.merge(queue, eventQueue);
                    console.log(queue);
                    $(element).append($(eventQueue));
                    eventQueue.length = 0;
                }
                else
                {
                    id = Math.floor(Math.random()*(idleQueue.length - 1));
                    queue = $.merge(queue, idleQueue[id]);
                    $(element).append($(idleQueue[id]))
                }
            }
        },this.interval);
    }
}

