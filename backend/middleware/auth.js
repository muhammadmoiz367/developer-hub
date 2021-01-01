const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req, res, next){
    //get token
    const token=req.header('x-auth-token');

    //check if not token
    if(!token){
        res.status(401).json({msg: 'No token, authorization denied'})
    }

    //verify token
    try {
        const decodedToken=jwt.verify(token, config.get('jwtScretKey'));
        req.user=decodedToken.user;
        next();

    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}