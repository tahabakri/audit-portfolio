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

/**
 * LESSON: Learned to wrap legacy callback-based providers for modern async handling.
 * AUDITOR USE: Allows building clean, readable audit scripts using async/await for sequential vulnerability testing.
 */