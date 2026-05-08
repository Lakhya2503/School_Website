
const asyncHandler = (requestHandler, timeout = 10000) => {
    return (req, res, next) => {
        const timer = setTimeout(() => {
            next({
                statusCode: 408,
                message: `Request Timeout - ${timeout/1000} seconds exceeded`
            });
        }, timeout);

        Promise.resolve(requestHandler(req, res, next))
            .then(() => clearTimeout(timer))
            .catch((err) => {
              console.log("errror",err);

                clearTimeout(timer);
                next(err);
            });
    };
};

export default asyncHandler;
