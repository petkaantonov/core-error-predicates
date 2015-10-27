var errors = [];

function addError(name, code) {
    var codes = [].slice.call(arguments, 1);
    var re = new RegExp("^(" + codes.join("|") + ")$");
    errors.push({
        name: name,
        class: createClass(name, code, function(e) {
            if (!e) return false;
            if ("cause" in e && typeof e.cause.code === "string") {
                return re.test(e.cause.code);
            } else if (typeof e.code === "string") {
                return re.test(e.code);
            } else {
                return false;
            }
        })
    });
}

function createClass(name, defaultCode, predicate) {
    var CustomError = (new Function('name', 'defaultCode', 'predicate', [
            '"use strict";',
            'return function ' + name + '(message, code) {',
            '  if (this === undefined) return message instanceof ' + name + ' ? true : predicate(message);',
            '  Error.captureStackTrace(this, "' + name + '");',
            '  Error.call(this);',
            '  this.name = name;',
            '  this.message = message;',
            '  this.code = code === undefined ? defaultCode : code;',
            '}'
        ].join('\n')))(name, defaultCode, predicate);

    CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
            value: CustomError,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    Object.setPrototypeOf(CustomError, Error);

    return CustomError;
}

addError("FileNotFoundError", "ENOENT");
addError("FileAccessError", "EACCES", "EPERM");
addError("EOFError", "EOF");
addError("UnknownHostError", "EADDRINFO");
addError("SocketError", "EISCONN", "ENOTCONN", "ENOTSOCK",
                        "ENOTSUP", "EPROTOTYPE", "EAIFAMNOSUPPORT",
                        "EAISERVICE");
addError("ProtocolError", "EPROTO", "EPROTONOSUPPORT", "EPROTOTYPE");
addError("FileSystemError", "EBUSY", "ENOENT", "EOF", "EACCES", "EAGAIN",
                            "EBADF", "EMFILE", "ENOTDIR", "EISDIR", "EEXIST",
                            "ENAMETOOLONG", "EPERM", "ELOOP", "ENOTEMPTY",
                            "ENOSPC", "EIO", "EROFS", "ENODEV", "ESPIPE",
                            "ECANCELED", "ENFILE", "EXDEV");
addError("ConnectError", "ECONNABORTED", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT");
addError("BindError", "EADDRNOTAVAIL");
addError("AddressNotFoundError", "ENOTFOUND");
addError("NetworkError", "EADDRINFO", "EADDRNOTAVAIL", "EAFNOSUPPORT",
                        "EALREADY", "ECONNABORTED", "ECONNREFUSED",
                        "ECONNRESET", "EDESTADDRREQ", "EHOSTUNREACH",
                        "EISCONN", "EMSGSIZE", "ENETDOWN", "ENETUNREACH",
                        "ENONET", "ENOTCONN", "ENOTSOCK", "ENOTSUP", "EPIPE",
                        "EPROTO",  "EPROTONOSUPPORT", "EPROTOTYPE",
                        "ETIMEDOUT", "EAIFAMNOSUPPORT", "EAISERVICE",
                        "EAISOCKTYPE", "ESHUTDOWN", "ENOTFOUND");

errors.push({
    name: "SSLError",
    class: createClass("SSLError", ["SSLERROR"], function(e) {
        var re = /^SSL Error:/;
        if (!e) return false;
        if ("cause" in e && typeof e.cause.message === "string") {
            return re.test(e.cause.message);
        } else if (typeof e.message === "string") {
            return re.test(e.message);
        } else {
            return false;
        }
    })
});


errors.forEach(function(error) {
    module.exports[error.name] = error.class;
});

module.exports.globalize = function() {
    errors.forEach(function(error) {
        if (global[error.name] === undefined) {
            global[error.name] = error.class;
        }
    });
    return this;
};


