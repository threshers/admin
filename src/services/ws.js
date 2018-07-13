export function wssend(ws, message) {
    this.waitForExecute = function(callback) {
        if (ws && ws.readyState && ws.readyState === 1) {
            callback();
        } else {
            var that = this;
            setTimeout(function() {
                that.waitForExecute(callback);
            }, 1000);
        }
    }

    this.waitForExecute(function() {
        console.log("send:", message)
        ws.send(message);
    });
};