import {VoteType} from "./vote-type";

export class VotePayload {
  voteType: VoteType | any;
  postId: number | any;
  userEmail : string = "";
}
