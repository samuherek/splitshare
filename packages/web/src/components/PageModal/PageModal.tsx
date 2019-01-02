import * as React from 'react';
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

class PageModal extends React.Component {
  private el: HTMLElement = document.createElement('div');

  public componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.el);
    }
  }

  public componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default PageModal;
