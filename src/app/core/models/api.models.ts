
/**
 * Status code for the request
 */
export enum RegStatusCode {
  SUCCESS = '0',
  ERROR = '1',
  WARNING = '2'
}

/**
 * Common payload data for all requests/responses
 */
export interface PayloadInterface {
  regStatusCode: RegStatusCode;
  regStatusMsg: string;
  uuid: string;

  /** Part of input params. Never consumed by Angular app */
  processDate?: string;

  /** Never used by Angular app, but will be in responses */
  clientName?: string;
}

/**
 * Request messages for front-end validation
 */
export interface MessageInterface {
  msgCode: string;  // SRQ #
  msgText: string;  // Text for message
  msgType: string;  // Type of message: Success (0), Error (1), Warning(2)
  appLayer?: string; // Code identifying layer message relates to
}

/**
 * Hard coded so that is can be displayed whenever system has encounters an issue or user tries to access page after
 * data has been cleared
 * @type {{msgCode: string; msgText: string; msgType: RegStatusCode}}
 */
export const SRQ_Msgs = [
  {
    msgCode: 'SRQ_058',
    msgText: 'Your session has timed out due to inactivity.  Any data you may have entered has been cleared.  ' +
             'Please close this browser window and try again.',
    msgType: RegStatusCode.ERROR
  },
  {
    msgCode: 'SRQ_099',
    msgText: 'This error occurred because the system encountered an unanticipated situation which forced it to stop',
    msgType: RegStatusCode.ERROR
  }
];

export interface MessagePayloadInterface extends PayloadInterface {
  appLayer?: string; // Code identifying layer message relates to
  messages?: MessageInterface[];
}

export class ServerPayload implements PayloadInterface {
  regStatusCode: RegStatusCode;
  regStatusMsg: string;
  uuid: string;
  private _message: string;

  constructor(payload: PayloadInterface) {
    this.regStatusCode = payload.regStatusCode;
    this.regStatusMsg = payload.regStatusMsg;
    this.uuid = payload.uuid;
    this._message = this.processMessage(payload.regStatusMsg);
  }

  get success(): boolean {
    return this.regStatusCode === RegStatusCode.SUCCESS;
  }

  get error(): boolean {
    return this.regStatusCode === RegStatusCode.ERROR;
  }

  get warning(): boolean {
    return this.regStatusCode === RegStatusCode.WARNING;
  }

  /**
   * The human readable message to display to the user. It can be either an
   * message or success message.
   */
  get message(): string {
    return this._message;
  }

  private processMessage(msg: string): string {

    // Note: using `href` here isn't ideal as it triggers a complete reload
    // of the Angular app. I tried using routerLink``, but angular stripped
    // it out.
    return (msg ? msg.replace('<link to Registration Page>',
        '<a href="registration/requirements">Registration Page') : msg );
  }
}

/**
 * Message cache payload
 */
export class MessagePayload extends ServerPayload {
  messages: MessageInterface[];

  constructor( payload: MessagePayloadInterface ) {
    super(payload);
    this.messages = payload.messages;
  }
}
