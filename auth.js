const { cookie_value } = require("./config.json");
const jwt = require("jsonwebtoken");

const fs = require("fs");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (request, response, next) => {
    if (request.path.includes(".")) {
        return;
    }
    
    var ip = String(request.ip).replace("::ffff:", "");
    fs.appendFileSync("logs/usage.txt", `${request.path} | ${ip} | ${request.protocol} | ${new Date().toUTCString()}\n`);
    
    const user = await prisma.user.findUnique({
        where: { ip, }
    });
    if (user === null) {
        if (! ["/verify", "/authorize"].includes(request.path)) {
            response.redirect("/verify");
            return;
        } else {
            next();
            return;
        }
    }
    
    
    
    if (["/protocols", "/reset"].includes(request.path)) {
        try {
            jwt.verify(request.cookies["_fiojoweonfwouinwiunfuiw"] || "", "aoihfisoduhgoiahusSECRET_KEY");
            next();
        } catch (err) {
            response.redirect("/403");
        }
    } else if (user.admin === true) {
        next();
    } else if ([
        "/", 
        "/ec2",
        "/login", 
        "/logs/network",
        "/logs/processes", 
        "/processes/dashboard", 
        "/processes/jesterbot", 
        "/processes/stealthybot", 
        "/statistics",
        "/storage", 
        "/verify",
        "/403",
        "/404"
    ].includes(request.path)) {
        next();
    } else if (request.path.includes("/edit/")) {
        var routes = request.path.split("/");
        if (user.name === routes[routes.length - 1]) {
            next();
        } else {
            response.redirect("/403");
        }
    } else {
        try {
            jwt.verify(request.cookies[cookie_value] || "", "aoihfisoduhgoiahusSECRET_KEY");
            next();
        } catch (err) {
            response.redirect("/403");
        }
    }
}

