export const getElementDimensions = (el: HTMLDivElement) => {
  if (typeof window !== undefined) {
    var styles = window.getComputedStyle(el);
    var margin =
      parseFloat(styles['marginLeft']) + parseFloat(styles['marginRight']);

    return {
      height: el.offsetHeight,
      width: el.offsetWidth,
      size: Math.ceil(el.offsetHeight + margin),
    };
  }
};
