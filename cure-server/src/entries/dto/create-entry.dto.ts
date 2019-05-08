export class CreateEntryDto {
    readonly activityID: String;
    readonly creatorID: String;
    readonly siteID: String;
    readonly dateEntered: Date;
    readonly dateCreated: Date;
    readonly hours: Number;
    readonly members: Number;
    readonly description: String;
}