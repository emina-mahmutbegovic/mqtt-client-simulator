import { Field, InputType } from "type-graphql";

@InputType()
export class MqttClientInput {
    @Field(() => String, {nullable: true})
    clientId?: string;
}