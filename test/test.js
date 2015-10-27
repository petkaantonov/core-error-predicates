require("../index.js").globalize();
var assert = require("assert");

function errorWithCode(code) {
    var ret = new Error();
    ret.code = code;
    return ret;
}

function errorWithCause(code) {
    var ret = new Error();
    ret.cause = new Error();
    ret.cause.code = code;
    return ret;
}


function testType(type, codes) {
    codes = [].slice.call(arguments, 1);
    var predicate = global[type];
    describe(type, function() {
        codes.forEach(function(code) {
            describe("returns true when the direct error has code", function() {
                specify(code, function() {
                    assert.strictEqual(predicate(errorWithCode(code)), true);
                });
            });
            describe("returns true when the error cause has code", function() {
                specify(code, function() {
                    assert.strictEqual(predicate(errorWithCause(code)), true);
                });
            });

            describe("creates new instance, without arguments", function () {
                specify(code, function () {
                    var instance = new predicate();
                    assert.strictEqual(instance instanceof Error, true);
                    assert.strictEqual(instance instanceof predicate, true);
                    assert.strictEqual(instance.code, codes[0]);
                });
            });

            describe("creates a new instance, with message argument", function () {
                specify(code, function () {
                    var instance = new predicate("Something went wrong");
                    assert.strictEqual(instance.code, codes[0]);
                    assert.strictEqual(instance.message, "Something went wrong");
                });
            });

            describe("creates a new instance, with message and code arguments", function () {
                specify(code, function () {
                    var instance = new predicate("Something went wrong", code);
                    assert.strictEqual(instance.code, code);
                    assert.strictEqual(instance.message, "Something went wrong");
                });
            });

            describe("predicate matches instance with default code", function () {
                specify(code, function () {
                    var instance = new predicate();
                    assert.strictEqual(predicate(instance), true);
                });
            });

            describe("predicate matches instance with specific code", function () {
                specify(code, function () {
                    var instance = new predicate("Error", code);
                    assert.strictEqual(predicate(instance), true);
                });
            });

        });

        it("doesn't cause errors with weird objects", function() {
            assert.strictEqual(predicate(false), false);
            assert.strictEqual(predicate(Object.create(null)), false);
        });

        it("matches instance with specific code, even if the code is not recognized", function () {
            var instance = new predicate("Error", "nonsense");
            assert.strictEqual(predicate(instance), true);
        });

        it('is throwable', function () {
            try {
                throw new predicate("Error");
            }
            catch (e) {
                assert.strictEqual(predicate(e), true);
            }
        });
    });
}

testType("FileNotFoundError", "ENOENT");
testType("FileAccessError", "EACCES", "EPERM");
testType("EOFError", "EOF");
testType("UnknownHostError", "EADDRINFO");
testType("SocketError", "EISCONN", "ENOTCONN", "ENOTSOCK",
                        "ENOTSUP", "EPROTOTYPE", "EAIFAMNOSUPPORT",
                        "EAISERVICE");
testType("ProtocolError", "EPROTO", "EPROTONOSUPPORT", "EPROTOTYPE");
testType("FileSystemError", "EBUSY", "ENOENT", "EOF", "EACCES", "EAGAIN",
                            "EBADF", "EMFILE", "ENOTDIR", "EISDIR", "EEXIST",
                            "ENAMETOOLONG", "EPERM", "ELOOP", "ENOTEMPTY",
                            "ENOSPC", "EIO", "EROFS", "ENODEV", "ESPIPE",
                            "ECANCELED", "ENFILE", "EXDEV");
testType("ConnectError", "ECONNABORTED", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT");
testType("BindError", "EADDRNOTAVAIL");
testType("AddressNotFoundError", "ENOTFOUND");
testType("NetworkError", "EADDRINFO", "EADDRNOTAVAIL", "EAFNOSUPPORT",
                        "EALREADY", "ECONNABORTED", "ECONNREFUSED",
                        "ECONNRESET", "EDESTADDRREQ", "EHOSTUNREACH",
                        "EISCONN", "EMSGSIZE", "ENETDOWN", "ENETUNREACH",
                        "ENONET", "ENOTCONN", "ENOTSOCK", "ENOTSUP", "EPIPE",
                        "EPROTO",  "EPROTONOSUPPORT", "EPROTOTYPE",
                        "ETIMEDOUT", "EAIFAMNOSUPPORT", "EAISERVICE",
                        "EAISOCKTYPE", "ESHUTDOWN", "ENOTFOUND");

describe("SSLError", function() {
    specify("returns true when the direct error begins with the SSL error message", function() {
        var error = new Error("SSL Error:");
        assert.strictEqual(SSLError(error), true);
    });
    specify("returns true when the error cause begins with the SSL error message", function() {
        var error = new Error();
        error.cause = new Error("SSL Error:");
        assert.strictEqual(SSLError(error), true);
    });

    specify("doesn't cause errors with weird objects", function() {
        assert.strictEqual(SSLError(false), false);
        assert.strictEqual(SSLError(Object.create(null)), false);
    });

    it("matches instance with specific code, even if the code is not recognized", function () {
        var instance = new SSLError("Error", "nonsense");
        assert.strictEqual(SSLError(instance), true);
    });

    it('is throwable', function () {
        try {
            throw new SSLError("Error");
        }
        catch (e) {
            assert.strictEqual(SSLError(e), true);
        }
    });
});
