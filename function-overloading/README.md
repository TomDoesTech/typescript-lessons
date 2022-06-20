Have you ever been looking through the type definitions of a library and seen a function declared multiple times, all taking slightly different arguments and wondered what was going on?

This is called function overloading, or method overloading and it allows you to define a function that may have several different parameter types.

In plain JavaScript, we can do this by testing a parameter to determine what it is. Without method overloading, or destroying your functions parameter types, this wouldn't be possible in TypeScript.