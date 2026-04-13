module.exports = function promisfy(fn) {
    return function (args) {
        return new Promise((resolve, reject) => {
            fn(args, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    };
};