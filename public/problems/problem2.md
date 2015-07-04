# Problem - 557E - Codeforces

E. Ann and Half-Palindrome

time limit per test

1.5 seconds

memory limit per test

512 megabytes

Tomorrow Ann takes the hardest exam of programming where she should get an excellent mark.

On the last theoretical class the teacher introduced the notion of a half-palindrome.

String _t_ is a half-palindrome, if for all the odd positions _i_ (![][1]) the following condition is held: _t__i_ = _t_|_t_| - _i_ + 1, where |_t_| is the length of string _t_ if positions are indexed from 1. For example, strings "abaa", "a", "bb", "abbbaa" are half-palindromes and strings "ab", "bba" and "aaabaa" are not.

Ann knows that on the exam she will get string _s_, consisting only of letters a and b, and number _k_. To get an excellent mark she has to find the _k_-th in the lexicographical order string among all substrings of _s_ that are half-palyndromes. Note that each substring in this order is considered as many times as many times it occurs in _s_.

The teachers guarantees that the given number _k_ doesn't exceed the number of substrings of the given string that are half-palindromes.

Can you cope with this problem?

Input

The first line of the input contains string _s_ (1 ≤ |_s_| ≤ 5000), consisting only of characters 'a' and 'b', where |_s_| is the length of string _s_.

The second line contains a positive integer _k_ —  the lexicographical number of the requested string among all the half-palindrome substrings of the given string _s_. The strings are numbered starting from one.

It is guaranteed that number _k_ doesn't exceed the number of substrings of the given string that are half-palindromes.

Output

Print a substring of the given string that is the _k_-th in the lexicographical order of all substrings of the given string that are half-palindromes.

Note

By definition, string _a_ = _a_1_a_2... _a__n_ is lexicographically less than string _b_ = _b_1_b_2... _b__m_, if either _a_ is a prefix of _b_ and doesn't coincide with _b_, or there exists such _i_, that _a_1 = _b_1, _a_2 = _b_2, ... _a__i_ - 1 = _b__i_ - 1, _a__i_ < _b__i_.

In the first sample half-palindrome substrings are the following strings — a, a, a, a, aa, aba, abaa, abba, abbabaa, b, b, b, b, baab, bab, bb, bbab, bbabaab (the list is given in the lexicographical order).

[1]: http://codeforces.com/predownloaded/7c/52/7c52c6056c1b8847a68ddef96088309f4de373c4.png
  
