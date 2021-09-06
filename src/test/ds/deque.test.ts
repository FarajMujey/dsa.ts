import { palindromeChecker } from './../alg/deque_palindrome-checker';
import Deque from '../../ds/deque'


const deque = new Deque<number>()

deque.addTail(301)
deque.addHead(10)
deque.addHead(190)
// deque.addHead(12)
console.log(deque.toString())
console.log(palindromeChecker('Step on no pets'))
console.log(palindromeChecker('a'))
console.log(palindromeChecker('aaa2'))
