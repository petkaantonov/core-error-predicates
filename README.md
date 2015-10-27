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

Predicates can be turned into instances of their error types by using the `new` operator:

```js
try {
  throw new FileNotFoundError("A file was not found!");
}
catch (e) {
  assert(FileNotFoundError(e) === true);
}
```

##Error predicates

 - [`FileNotFoundError`](#filenotfounderror)
 - [`FileAccessError`](#fileaccesserror)
 - [`EOFError`](#eoferror)
 - [`UnknownHostError`](#unknownhosterror)
 - [`SocketError`](#socketerror)
 - [`ProtocolError`](#protocolerror)
 - [`FileSystemError`](#filesystemerror)
 - [`ConnectError`](#connecterror)
 - [`BindError`](#binderror)
 - [`AddressNotFoundError`](#addressnotfounderror)
 - [`NetworkError`](#networkerror)
 - [`SSLError`](#sslerror)

#####`FileNotFoundError`

When the error's code matches one of:

 - `ENOENT`

#####`FileAccessError`

When the error's code matches one of:

 - `EACCES`
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
 - `EACCES`
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

#####`ConnectError`

When the error's code matches one of:

 - `ECONNABORTED`
 - `ECONNREFUSED`
 - `ECONNRESET`
 - `ETIMEDOUT`

#####`BindError`

When the error's code matches one of:

 - `EADDRNOTAVAIL`

#####`AddressNotFoundError`

When the error's code matches one of:

 - `ENOTFOUND`

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
 - `ENOTFOUND`

#####`SSLError`

When the error's message begins with `"SSL Error:"`.

#License

The MIT License (MIT)

Copyright (c) 2015 Petka Antonov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
