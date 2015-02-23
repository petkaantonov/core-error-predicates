var errors = [];

function addError(name, code) {
    var codes = [].slice.call(arguments, 1);
    var re = new RegExp("^(" + codes.join("|") + ")$");
    errors.push({
        name: name,
        predicate: function(e) {
            if (!e) return false;
            if ("cause" in e && typeof e.cause.code === "string") {
                return re.test(e.cause.code);
            } else if (typeof e.code === "string") {
                return re.test(e.code);
            } else {
                return false;
            }
        }
    });
}

addError("FileNotFoundError", "ENOENT");
addError("FileAccessError", "EACCESS", "EPERM");
addError("EOFError", "EOF");
addError("UnknownHostError", "EADDRINFO");
addError("SocketError", "EISCONN", "ENOTCONN", "ENOTSOCK",
                        "ENOTSUP", "EPROTOTYPE", "EAIFAMNOSUPPORT",
                        "EAISERVICE");
addError("ProtocolError", "EPROTO", "EPROTONOSUPPORT", "EPROTOTYPE");
addError("FileSystemError", "EBUSY", "ENOENT", "EOF", "EACCESS", "EAGAIN",
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
    predicate: function(e) {
        var re = /^SSL Error:/;
        if (!e) return false;
        if ("cause" in e && typeof e.cause.message === "string") {
            return re.test(e.cause.message);
        } else if (typeof e.message === "string") {
            return re.test(e.message);
        } else {
            return false;
        }
    }
});


errors.forEach(function(error) {
    module.exports[error.name] = error.predicate;
});

module.exports.globalize = function() {
    errors.forEach(function(error) {
        if (global[error.name] === undefined) {
            global[error.name] = error.predicate;
        }
    });
    return this;
};


