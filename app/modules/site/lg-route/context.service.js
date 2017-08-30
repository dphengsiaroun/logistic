export function Context() {
    'ngInject';
    this.stack = [];
    this.push = function(n) {
        this.stack.push(n);
    };
    this.pop = function() {
        return this.stack.pop();
    };
}