import { Query, Mutation, Arg, Resolver, Field } from 'type-graphql';
import * as mqtt from "mqtt" ;
import { Service } from 'typedi';
import { MqttClientInput } from './types/mqtt-client.input';
import { MqttClient } from 'mqtt';

const clients: Map<string, MqttClient> = new Map<string, MqttClient>();

@Service()
@Resolver()
export default class MqttClientSimulatorResolver {
  
  @Query(() => String)
  healthcheck() {
    return 'App sucessfully running!';
  }

  @Mutation(() => String, { nullable: true })
  async connect(@Arg('mqttClientInput') mqttClientInput: MqttClientInput) {
    const client = await mqtt.connect('mqtt://localhost');
    clients.set(client.options.clientId!!, client);

    if(!!mqttClientInput.clientId) {
        client.options.clientId = mqttClientInput.clientId;
    }

    return client.options.clientId!!;
  }

  @Mutation(() => Boolean)
  async endConnection(@Arg('clientId') clientId: string): Promise<boolean> {
    const client = clients.get(clientId);

    if(!client) {
        throw Error('Client with id ' + clientId.toString + ' does not exist');
    }

    client.end();

    return client.connected;
  }
}
