module.exports = `
(function (self) {
    var init = function (e) {
        self.removeEventListener('message', init);
        // eslint-disable-next-line no-eval
        (e && e.data && (typeof e.data.__init_uvm === 'string')) && eval(e.data.__init_uvm);
    };
    self.addEventListener('message', init);
}(self));
`;
