import { PureComponent } from 'react';
import * as React from 'react';

export interface ModalProps {
  title: string,
  text: string,
  onAccept: () => void;
  onDecline: () => void;
}

export class Modal extends PureComponent<ModalProps>{
  public render() {
    const { text, title, onAccept, onDecline } = this.props;
    return <div className="modal fade in" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: "block"}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onDecline()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {text}
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" onClick={() => onAccept()}>Yes</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => onDecline()}>No</button>
          </div>
        </div>
      </div>
    </div>
  }
}