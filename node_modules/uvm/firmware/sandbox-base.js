module.exports = `
<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta charset="UTF-8"><script type="text/javascript">
(function (win) {
    var init = function (e) {
        win.removeEventListener('message', init);
        // eslint-disable-next-line no-eval
        (e && e.data && (typeof e.data.__init_uvm === 'string')) && eval(e.data.__init_uvm);
    };
    win.addEventListener('message', init);
}(window));
</script>
</head></html>`;
