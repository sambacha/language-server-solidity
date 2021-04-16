# solidity-language-server

## explainSolidity

TL:DR; explainshell for assembly

Example explainshell:
[example shell function that tells you where the commit came from](https://explainshell.com/explain?cmd=function+where%28%29%7B+COUNT%3D0%3B+while+%5B+%60where_arg+%241%7E%24COUNT+%7C+wc+-w%60+%3D%3D+0+%5D%3B+do+let+COUNT%3DCOUNT%2B1%3B+done%3B+echo+%22%241+is+ahead+of+%22%3B+where_arg+%241%7E%24COUNT%3B+echo+%22by+%24COUNT+commits%22%3B%7D%3Bfunction+where_arg%28%29%7B+git+log+%24%40+--decorate+-1+%7C+head+-n1+%7C+cut+-d+%27+%27+-f3-+%3B%7D)

> actually should be `explainAssembly`

<pre>
// Ethereum ASM
// The functional version of an Assembly code is simply the reverse notation of the non-functional version.

mstore(0x80, add(mload(0x80), 3))          // Functional style
3 0x80 mload add 0x80 mstore               // Non-Functional style

// Layout of the stack after each instructions
 empty    PUSH 3   PUSH 0x80   MLOAD      ADD    PUSH 0x80   MSTORE
                    |_0x80| > |__5__|             |_0x80|
|_____| > |__3__| > |__3__| > |__3__| > |__8__| > |__8__| > |_____|
</pre>

## License

GPL-2.0-Only
