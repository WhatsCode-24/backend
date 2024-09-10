const { verify } = require("jsonwebtoken");

const JwtMiddleware = async (req, res, next) => {
  try {
    const secreat = String(process.env.JWT_SECRET);

    if (!req.headers.authorization || req.headers.authorization == "") {
      return res.status(401).send({
        status: 401,
        message: "Informe o token.",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decode = verify(token, secreat);

    req.user = decode;

    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      return res.status(401).send({
        status: 401,
        message: "Token inválido.",
      });
    }

    if (error.name == "TokenExpiredError") {
      return res.status(401).send({
        status: 401,
        message: "Token expirado.",
      });
    }

    return res.status(401).send({
      status: 401,
      message: "Falha na autenticação.",
    });
  }
};

module.exports = JwtMiddleware;
