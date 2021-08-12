var app = new Vue({
    el: '#app',
    data: {
      time_remaining: 1500,
      timer_state: 'work', 
      timer_running: false,
      timer_paused: false,
      timer_id: null
    },
    methods: {
      timer: function (action) {
        switch(action) {
          case 'start':
            if(!this.timer_running) {
              this.timer_id = setInterval(this.tick, 1000)
              this.timer_running = true
            }
            
            break;
          case 'pause':
            if(this.timer_running) this.timer_paused = !this.timer_paused
            break;
          case 'reset':
            clearInterval(this.timer_id)
            this.timer_id = null
            this.time_remaining = 1500
            this.timer_running = false
            this.timer_paused = false
            this.timer_state = 'work'
            break;
          case 'skip':
            if(this.timer_running && !this.timer_paused) {
              this.skip()
            }
            break;
          default:
            break;
        }
      },
      tick: function() {
        if(this.timer_running && !this.timer_paused) {
          if(this.time_remaining > 0) {
            this.time_remaining--;
          } else {
            
            this.skip()
            
          }
        }
      },
      skip: function() {
        this.time_remaining = (this.timer_state == 'work') ? 300 : 1500
        this.timer_state = (this.timer_state == 'work') ? 'rest' : 'work'
  
        spawnNotification((this.timer_state == 'work') ? 'TIME TO WORK' : 'BREAK for FIVE MINUTES OF ZEN')
      }
    }
  })
  
  Notification.requestPermission().then(function(result) {
    console.log(result);
  });
  
  function spawnNotification(body, icon, title) {
    var options = {
        body: body,
        icon: icon
    }
    
  }