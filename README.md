#Installation

    npm install core-error-predicates

#Introduction

Error predicate functions for operational errors thrown by node core.

Predicate functions take an error object as argument and return true if the error object matches. This useful for instance when using [bluebird catch filters](https://github.com/petkaantonov/bluebird/blob/master/API.md#catchfunction-errorclassfunction-predicate-function-handler---promise) or in the future when the JavaScript `catch` clauses will be able to take filter/predicate function parameters.

Example using [bluebird](https://github.com/petkaantonov/bluebird/):

```js
require("core-error-predicates").globalize();
fs.readFileAsync("test.txt", "utf8").then(function(contents) {
    console.log("file contents:", contents);
})
.catch(FileNotFoundError, function(e) {
    console.log("file test.txt does not exist");
})
.catch(FileAccessError, function(e) {
    console.log("no permissions to access test.txt");
});
```

#API

The module exports various error predicates and the `.globalize()` method.

The `.globalize()` method makes all the predicate functions available in global scope for convenience. If the name is already taken for a predicate in global scope, it will not be overwritten.

##Error predicates

 - [`FileNotFoundError`](#filenotfounderror)
 - [`FileAccessError`](#fileaccesserror)
 - [`EOFError`](#eoferror)
 - [`UnknownHostError`](#unknownhosterror)
 - [`SocketError`](#socketerror)
 - [`ProtocolError`](#protocolerror)
 - [`FileSystemError`](#filesystemerror)
 - [`NetworkError`](#networkerror)
 - [`SSLError`](#sslerror)

#####`FileNotFoundError`

When the error's code matches one of:

 - `ENOENT`

#####`FileAccessError`

When the error's code matches one of:

 - `EACCESS`
 - `EPERM`

#####`EOFError`

When the error's code matches one of:

 - `EOF`

#####`UnknownHostError`

When the error's code matches one of:

 - `EADDRINFO`

#####`SocketError`

When the error's code matches one of:

 - `EISCONN`
 - `ENOTCONN`
 - `ENOTSOCK`
 - `ENOTSUP`
 - `EPROTOTYPE`
 - `EAIFAMNOSUPPORT`
 - `EAISERVICE`

#####`ProtocolError`

When the error's code matches one of:

- `EPROTO`
- `EPROTONOSUPPORT`
- `EPROTOTYPE`

#####`FileSystemError`

When the error's code matches one of:

 - `EBUSY`
 - `ENOENT`
 - `EOF`
 - `EACCESS`
 - `EAGAIN`
 - `EBADF`
 - `EMFILE`
 - `ENOTDIR`
 - `EISDIR`
 - `EEXIST`
 - `ENAMETOOLONG`
 - `EPERM`
 - `ELOOP`
 - `ENOTEMPTY`
 - `ENOSPC`
 - `EIO`
 - `EROFS`
 - `ENODEV`
 - `ESPIPE`
 - `ECANCELED`
 - `ENFILE`
 - `EXDEV`

#####`NetworkError`

When the error's code matches one of:

 - `EADDRINFO`
 - `EADDRNOTAVAIL`
 - `EAFNOSUPPORT`
 - `EALREADY`
 - `ECONNABORTED`
 - `ECONNREFUSED`
 - `ECONNRESET`
 - `EDESTADDRREQ`
 - `EHOSTUNREACH`
 - `EISCONN`
 - `EMSGSIZE`
 - `ENETDOWN`
 - `ENETUNREACH`
 - `ENONET`
 - `ENOTCONN`
 - `ENOTSOCK`
 - `ENOTSUP`
 - `EPIPE`
 - `EPROTO`
 - `EPROTONOSUPPORT`
 - `EPROTOTYPE`
 - `ETIMEDOUT`
 - `EAIFAMNOSUPPORT`
 - `EAISERVICE`
 - `EAISOCKTYPE`
 - `ESHUTDOWN`

#####`SSLError`

When the error's message begins with ` - `SSL Error:`

