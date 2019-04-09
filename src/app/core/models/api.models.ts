// import { PayloadInterface, ServerPayload } from './api-base.model';

// export interface RegRequestInterface {
//     eventUUID: string;
//     clientName: string;
//     processDate: string;
// }

// /**
//  *
//  */
// export interface UserAttrInterface extends PayloadInterface {
//   userIDMatch?: SearchResult;
//   pdidMatch?: SearchResult;
//   emailMatch: SearchResult;
//   mobileMatch: SearchResult;
// }

// export class UserAttrPayload extends ServerPayload {
//   userIDMatch: SearchResult;
//   pdidMatch: SearchResult;
//   emailMatch: SearchResult;
//   mobileMatch: SearchResult;

//   constructor( payload: UserAttrInterface ) {
//     super( payload );
//     this.userIDMatch = payload.userIDMatch ? payload.userIDMatch : undefined;
//     this.pdidMatch = payload.pdidMatch ? payload.pdidMatch : undefined;
//     this.emailMatch = payload.emailMatch;
//     this.mobileMatch = payload.mobileMatch;
//   }
// }

// /**
//  * Return structure for searches return from back-end
//  */
// export interface SearchResult {
//     matchFound: boolean;
//     msgID: string;
//     msgText: string;
//   }

// export interface SecurityQuestionsAnswers {
//   name: string;
//   value: string;
// }

// export interface AddressInterface {
//   street: string;
//   city: string;
//   province: string;
//   postalCode: string;
//   country: string;
// }

// export interface CheckUserAttr extends RegRequestInterface {
//   providerCode: string;
//   userId?: string;
//   pdid?: string;
//   email: string;
//   mobile: string;
// }

// export interface RegisterUser extends RegRequestInterface {
//   providerCode: string;             // BCSC (MoH is on-hold until further notice)
//   assuranceLevel: string;           // BCSC assurance level = 3
//   pdid?: string;
//   userId?: string;                  // Currently unused (MoH is on-hold until further notice)
//   email: string;
//   mobile: string;
//   securityQuestions: SecurityQuestionsAnswers[];
//   firstname: string;
//   lastname: string;
//   givennames: string;                // Concatenation of First and middle names
//   dateOfBirth: string;               // DOB format 'YYYYMMDD'
//   preffirstname: string;             // Field must be present in message, but data can be null
//   preflastname: string;              // Field must be present in message, but data can be null
//   prefmiddlename: string;            // Field must be present in message, but data can be null
//   address: AddressInterface;
//   mailingAddress: AddressInterface; // Field must be present in message, but data can be null
// }

// /**
//  * Status code for the request
//  */
// export enum RegStatusCode {
//     SUCCESS = '0',
//     ERROR = '1',
//     WARNING = '2',
// }

// /**
//  * Common payload data for all requests/responses
//  */
// export interface PayloadInterface {
//     regStatusCode: RegStatusCode;
//     regStatusMsg: string;
//     uuid: string;

//     /** Part of input params. Never consumed by Angular app */
//     processDate?: string;

//     /** Never used by Angular app, but will be in responses */
//     clientName?: string;
// }

// /**
//  * Request messages for front-end validation
//  */
// export interface MessageInterface {
//     msgCode: string; // SRQ #
//     msgText: string; // Text for message
//     msgType: string; // Type of message: Success (0), Error (1), Warning(2)
//     appLayer?: string; // Code identifying layer message relates to
// }

// /**
//  * Hard coded so that is can be displayed whenever system has encounters an issue or user tries to access page after
//  * data has been cleared
//  * @type {{msgCode: string; msgText: string; msgType: RegStatusCode}}
//  */
// export const SRQ_Msgs = [
//     {
//         msgCode: 'SRQ_058',
//         msgText:
//             'Your session has timed out due to inactivity.  Any data you may have entered has been cleared.  ' +
//             'Please close this browser window and try again.',
//         msgType: RegStatusCode.ERROR,
//     },
//     {
//         msgCode: 'SRQ_099',
//         msgText:
//             'This error occurred because the system encountered an unanticipated situation which forced it to stop',
//         msgType: RegStatusCode.ERROR,
//     },
// ];

// export interface MessagePayloadInterface extends PayloadInterface {
//     appLayer?: string; // Code identifying layer message relates to
//     messages?: MessageInterface[];
// }

// export class ServerPayload implements PayloadInterface {
//     regStatusCode: RegStatusCode;
//     regStatusMsg: string;
//     uuid: string;
//     private _message: string;

//     constructor(payload: PayloadInterface) {
//         this.regStatusCode = payload.regStatusCode;
//         this.regStatusMsg = payload.regStatusMsg;
//         this.uuid = payload.uuid;
//         this._message = this.processMessage(payload.regStatusMsg);
//     }

//     get success(): boolean {
//         return this.regStatusCode === RegStatusCode.SUCCESS;
//     }

//     get error(): boolean {
//         return this.regStatusCode === RegStatusCode.ERROR;
//     }

//     get warning(): boolean {
//         return this.regStatusCode === RegStatusCode.WARNING;
//     }

//     /**
//      * The human readable message to display to the user. It can be either an
//      * message or success message.
//      */
//     get message(): string {
//         return this._message;
//     }

//     private processMessage(msg: string): string {
//         // Note: using `href` here isn't ideal as it triggers a complete reload
//         // of the Angular app. I tried using routerLink``, but angular stripped
//         // it out.
//         return msg
//             ? msg.replace(
//                   '<link to Registration Page>',
//                   '<a href="registration/requirements">Registration Page'
//               )
//             : msg;
//     }
// }

// /**
//  * Message cache payload
//  */
// export class MessagePayload extends ServerPayload {
//     messages: MessageInterface[];

//     constructor(payload: MessagePayloadInterface) {
//         super(payload);
//         this.messages = payload.messages;
//     }
// }
