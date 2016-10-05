function Response (success, data, err, message){
    this.success = success;
    this.data = data;
    this.err = err;
    this.message = message;

}

module.exports = Response;