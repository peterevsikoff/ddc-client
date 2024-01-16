export function getOffsetRect(elem: HTMLDivElement) {
    const docElem = document.documentElement;
    const top  = elem.getBoundingClientRect().top + (docElem.scrollTop || document.body.scrollTop) - (docElem.clientTop || document.body.clientTop || 0);
    const left = elem.getBoundingClientRect().left + (docElem.scrollLeft || document.body.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0);
    return { top: Math.round(top), left: Math.round(left) };
}